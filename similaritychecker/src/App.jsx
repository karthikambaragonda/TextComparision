import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextInput from '../components/TextInput';
import FileInput from '../components/FileInput';
import LoadingButton from '../components/LoadingButton';
import ErrorMessage from '../components/ErrorMessage';
import SimilarityResult from '../components/SimilarityResult';
import Footer from '../components/footer';

function App() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [similarity, setSimilarity] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // New state for input mode toggle
  const [inputMode, setInputMode] = useState('text'); // 'text' or 'file'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://textcomparision.onrender.com");
        console.log("API called on load:", response);
      } catch (error) {
        console.error("Error calling API on load:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSimilarity('');
    setLoading(true);

    const formData = new FormData();

    if (inputMode === 'file') {
      if (file1 && file2) {
        if (file1.size < 5 || file2.size < 5) {
          setError('Please upload files with more content.');
          setLoading(false);
          return;
        }
        formData.append('file1', file1);
        formData.append('file2', file2);
      } else {
        setError('Please upload both files.');
        setLoading(false);
        return;
      }
    } else { // text mode
      if (text1.trim().length > 1 && text2.trim().length > 1) {
        formData.append('text1', text1);
        formData.append('text2', text2);
      } else {
        setError('Please input more characters in both text fields.');
        setLoading(false);
        return;
      }
    }

    try {
      const response = await axios.post('https://textcomparision.onrender.com/compare', formData);
      setSimilarity(response.data.similarity);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // Toggle handler that also clears the other inputs
  const handleToggle = (mode) => {
    setInputMode(mode);
    setError('');
    setSimilarity('');
    if (mode === 'text') {
      setFile1(null);
      setFile2(null);
    } else {
      setText1('');
      setText2('');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 bg-white rounded-xl mt-12">
      <h1 className="text-4xl font-extrabold text-center text-black-600 mb-8">
        Text Similarity Checker
      </h1>

      {/* Toggle Buttons */}
      <div className="flex justify-center mb-8 space-x-4">
        <button
          type="button"
          onClick={() => handleToggle('text')}
          className={`px-6 py-2 font-semibold rounded ${inputMode === 'text'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
        >
          Text Input
        </button>
        <button
          type="button"
          onClick={() => handleToggle('file')}
          className={`px-6 py-2 font-semibold rounded ${inputMode === 'file'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
        >
          File Upload
        </button>
      </div>

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-8">
        {inputMode === 'text' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TextInput
              label="Text Input 1"
              value={text1}
              onChange={(e) => {
                setText1(e.target.value);
                setFile1(null);
              }}
              placeholder="Enter first text here..."
            />
            <TextInput
              label="Text Input 2"
              value={text2}
              onChange={(e) => {
                setText2(e.target.value);
                setFile2(null);
              }}
              placeholder="Enter second text here..."
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FileInput
              label="Upload File 1 (.txt)"
              onChange={(e) => {
                setFile1(e.target.files[0]);
                setText1('');
              }}
            />
            <FileInput
              label="Upload File 2 (.txt)"
              onChange={(e) => {
                setFile2(e.target.files[0]);
                setText2('');
              }}
            />
          </div>
        )}

        <LoadingButton loading={loading} />
      </form>

      {error && <ErrorMessage message={error} />}

      {similarity && <SimilarityResult similarity={similarity} />}
      <Footer />
    </div>
  );
}

export default App;
