"use client"

import React, { useState } from 'react';
import { Cinzel } from "next/font/google"

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "700"],
})

const InputForm = () => {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Input Submitted: ", inputValue);
    };

    return (
        <div className = "flex justify-center items-center mt-20">
            <form onSubmit = {handleSubmit} className = "flex space-x-4 p-4 w-3/4 rounded-lg shadow-md">
                <input
                    type = "text"
                    value = {inputValue}
                    onChange = {handleChange}
                    placeholder = "What if..."
                    className = {`${cinzel.className} w-full px-0 py-2 border-b-2 border-gray-300 text-xl focus:outline-none focus:border-blue-500 placeholder-gray-400`}
                />

                <button type = "submit" className = {`${cinzel.className} px-6 py-2 bg-orange-300 text-black text-xl font-bold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400`}>
                    Explore
                </button>
            </form>
        </div>
    );
};

export default InputForm;