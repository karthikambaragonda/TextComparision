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
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000");
        console.log("API called on load:", response);
      } catch (error) {
        console.error("Error calling API on load:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get("https://karthik-portfolio.onrender.com/");
        console.log("API called on load:", response1);
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
    if (file1 && file2) {
      if (file1.size < 5 || file2.size < 5) {
        setError('Please upload files with more content.');
        setLoading(false);
        return;
      }
      formData.append('file1', file1);
      formData.append('file2', file2);
    } else if (text1.trim().length > 1 && text2.trim().length > 1) {
      formData.append('text1', text1);
      formData.append('text2', text2);
    } else {
      setError('Please input more characters or upload longer files.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/compare', formData);
      setSimilarity(response.data.similarity);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 bg-white rounded-xl  mt-12">
      <h1 className="text-4xl font-extrabold text-center text-black-600 mb-8">Text Similarity Checker</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-8">
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

        <LoadingButton loading={loading} />
      </form>

      {error && <ErrorMessage message={error} />}

      {similarity && <SimilarityResult similarity={similarity} />}
      <Footer />
    </div>
    
  );
}

export default App;
