"use client"

import React, { useState } from 'react';
import { Cinzel } from "next/font/google"

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "700"],
})

const InputForm = () => {
    const [inputValue, setInputValue] = useState('');
    const [result, setResult] = useState('');
    const[loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setResult('');

        const response = await fetch('/api/what-if', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({question: inputValue})
        });

        const data = await response.json();
        setResult(data.result);
        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center mt-20 px-4">
            <form 
                onSubmit={handleSubmit} 
                className="flex flex-col sm:flex-row sm:space-x-4 p-4 w-full max-w-lg rounded-lg shadow-md"
            >
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    placeholder="What if..."
                    className={`${cinzel.className} w-full sm:flex-1 px-3 py-2 sm:py-2 border-b-2 border-gray-300 text-base sm:text-xl focus:outline-none focus:border-blue-500 placeholder-gray-400`}
                />
                <button
                    type="submit"
                    className={`${cinzel.className} mt-2 sm:mt-0 px-4 py-2 sm:px-4 sm:py-2 bg-orange-300 text-black text-base sm:text-lg font-bold rounded-lg hover:bg-orange-800 focus:outline-none`}
                >
                    {loading ? "Exploring..." : "Explore"}
                </button>
            </form>

            {loading && (
                <p className={`${cinzel.className} mt-8 text-gray-400`}>
                    Rewriting history...
                </p>
            )}

            {result && (
                <div className={`${cinzel.className} mt-8 w-3/4 leading-relaxed text-lg leading-relaxed whitespace-pre-wrap`}>
                    {result}
                </div>
            )}
        </div>
    );
};

export default InputForm;