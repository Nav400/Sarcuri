"use client"

import React, { useState } from 'react';
import { Cinzel } from "next/font/google"

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "700"],
})

interface TimelineEvent {
    year: string;
    event: string;
    type: "real" | "changed";
}

interface Result {
    summary: string;
    timeline: TimelineEvent[];
}

const InputForm = () => {
    const [inputValue, setInputValue] = useState('');
    const [result, setResult] = useState<Result | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isReady, setIsReady] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        if (value.trim() == "") {
            setIsReady(false);
        } else {
            setIsReady(true);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);
        setError('');

        try {
            const response = await fetch('/api/what-if', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question: inputValue })
            });

            const data = await response.json();
            setResult(data.result);
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
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
                    disabled = {!isReady}
                    type="submit"
                    className={`${cinzel.className} ${!isReady ? "opacity-50 cursor-not-allowed" : ""} mt-2 sm:mt-0 px-4 py-2 bg-orange-300 text-black text-base sm:text-lg font-bold rounded-lg hover:bg-orange-800 focus:outline-none`}
                >
                    {loading ? "Exploring..." : "Explore"}
                </button>
            </form>

            {loading && (
                <p className={`${cinzel.className} mt-8 text-gray-400 animate-pulse`}>
                    Rewriting history...
                </p>
            )}

            {error && (
                <p className={`${cinzel.className} mt-8 text-red-400`}>
                    {error}
                </p>
            )}

            {result && (
                <div className="mt-8 w-full max-w-xl">

                    {/* Summary */}
                    <p className={`${cinzel.className} text-lg leading-relaxed mb-10 text-gray-300`}>
                        {result.summary}
                    </p>

                    {/* Timeline */}
                    <div className="relative border-l-2 border-orange-300 pl-6 space-y-8">
                        {result.timeline.map((item, index) => (
                            <div key={index} className="relative">

                                {/* Dot */}
                                <div className={`absolute -left-[1.45rem] w-4 h-4 rounded-full border-2 ${
                                    item.type === "changed"
                                        ? "bg-orange-300 border-orange-300"
                                        : "bg-gray-700 border-gray-500"
                                }`}/>

                                {/* Year */}
                                <p className={`${cinzel.className} text-orange-300 text-sm font-bold mb-1`}>
                                    {item.year}
                                </p>

                                {/* Event */}
                                <p className={`${cinzel.className} text-white text-base leading-relaxed`}>
                                    {item.event}
                                </p>

                                {/* Alternate history tag */}
                                {item.type === "changed" && (
                                    <span className={`${cinzel.className} text-xs text-orange-400 font-bold mt-1 block`}>
                                        ↳ alternate history
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default InputForm;