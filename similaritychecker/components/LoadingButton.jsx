import React from 'react';

function LoadingButton({ loading }) {
    return (
        <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-black font-semibold rounded-lg shadow-md transition duration-200 ${loading
                    ? 'bg-[#aadbe3] cursor-not-allowed'
                    : 'bg-[#aadbe3] hover:bg-[#88c1d9] active:bg-[#70a9bc]'
                }`}
              
               
        >
            {loading ? (
                <div className="flex items-center justify-center space-x-2">
                    <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                    </svg>
                    <span>Comparing...</span>
                </div>
            ) : (
                'Compare'
            )}
        </button>
    );
}

export default LoadingButton;
