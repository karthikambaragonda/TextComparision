import React from 'react';

function TextInput({ label, value, onChange, placeholder }) {
    return (
        <div>
            <label className="block text-gray-700 font-semibold mb-2">{label}</label>
            <textarea
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black-400 resize-none h-40 shadow-sm"
                value={value}
                placeholder={placeholder}
                onChange={onChange}
            />
        </div>
    );
}

export default TextInput;
