import React from 'react';

function SimilarityResult({ similarity }) {
    return (
        <div className="mt-6 p-4 bg-indigo-50 text-indigo-900 rounded-md border border-indigo-300 shadow-sm font-semibold text-lg text-center">
            Similarity: <span className="font-extrabold">{similarity}</span>
        </div>
    );
}

export default SimilarityResult;
