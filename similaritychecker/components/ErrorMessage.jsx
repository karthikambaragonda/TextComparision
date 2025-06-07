import React from 'react';

function ErrorMessage({ message }) {
    return (
        <div className="mt-6 p-4 bg-red-100 text-red-800 rounded-md border border-red-300 shadow-sm">
            {message}
        </div>
    );
}

export default ErrorMessage;
