import React from 'react';

function FileInput({ label, onChange }) {
    return (
        <div>
            <label className="block text-gray-700 font-semibold mb-2">{label}</label>
            <input
                type="file"
                accept=".txt"
                className="w-full text-gray-600 file:border-0 file:bg-[#aadbe3] file:text-black-600 file:rounded-md file:px-3 file:py-2 cursor-pointer"
onChange={onChange}
            />
        </div>
    );
}

export default FileInput;
