"use client"

import NavBar from "../components/NavBar";
import { Cinzel } from "next/font/google";
import { useState } from 'react';

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "700"],
})

let numCorrect = 0;
let numAnswered = 0;

interface Question { //interface is basically saying what QUestion should look like, like a blueprint
    question: string;
    options: string[];
    answer: string;
}

interface Result {
    questions: Question[];
}

const QuizQuestion = ({ item, index, cinzelClass }: { //the variables inside the {} means destructuring of the parameters, and the lines under state what variable type each variable should be. Instead of writing interface QuizQuestionProps with the info underneath, i put it in one line.
    //QuizQuestion must be outside QuizInputForm because each question is it's own useState, so if it was in the input form, the same useState would be shared for all questions.
    item: Question;
    index: number;
    cinzelClass: string;
}) => {
    const [selected, setSelected] = useState<string | null>(null);

    return (
        <div className = "border border-gray-700 rounded-lg p-6 space-y-4">
            <p className={`${cinzelClass} text-white text-lg font-bold`}> 
                {index + 1}. {item.question}
            </p>
            <div className="space-y-2">
                {item.options.map((option, i) => {
                    let style = "border border-gray-600 text-gray-300 hover:border-gray-400";

                    if (selected) {
                        if (option === item.answer) {
                            style = "border border-green-500 text-green-400 bg-green-900/20";
                            numCorrect = numCorrect + 1;
                        } else if (option === selected && option !== item.answer) {
                            style = "border border-red-500 text-red-400 bg-red-900/20";
                        } else {
                            style = "border border-gray-700 text-gray-500";
                        }
                        numAnswered = numAnswered + 1;
                    }
                    return (
                        <button 
                        key = {i}
                        disabled = {!!selected} //Use !! because it converts null to false (so the initial state of all button answers is false)
                        onClick = {() => setSelected(option)}
                        className = {`${cinzelClass} w-full text-left px-4 py-2 rounded-lg transition-colors ${style}`}>
                            {option}
                        </button>
                    );
                })}
            </div>
            {selected && (
                <p className={`${cinzelClass} text-sm mt-2 ${selected === item.answer ? "text-green-400" : "text-red-400"}`}>
                    {selected === item.answer ? "Correct!" : `Wrong — the answer was ${item.answer}`}
                    {selected === item.answer ? numCorrect + 1 : numCorrect + 0}
                </p>

            )}
        </div>
    )
}
//Sets all the states I will need to keep track of repsonse loading of the value inputted
const QuizInputForm = () => {
    const [inputValue, setInputValue] = useState('');
    const [result, setResult] = useState<Result | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isReady, setIsReady] = useState(false);

    //Handler function for when something is typed into the input field
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { //"e" is the parameter, "React.ChangeEven" is the type
        const value = e.target.value;
        setInputValue(value);
        if (value.trim() == "") {
            setIsReady(false);
        } else {
            setIsReady(true);
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => { //async means the code runs separately... the program doesn't wait for the API response to come back before executing other code
        e.preventDefault();
        setLoading(true);
        setResult(null);
        setError('');
        numCorrect = 0;
        numAnswered = 0;
        //API call
        try {
            const response = await fetch('/api/quiz', { //await is telling the program to wait for the response
                method: 'POST', //POST is an HTTP method that means we are sending data to the server 
                headers: { 'Content-type': 'application/json'}, //headers are like the label about what we're sending... telling the server we're sending a json
                body: JSON.stringify({question: inputValue}) //turns what we're sending into a JSON, and is formatting it such that we have "question: [whatever the question was]"
            });

            const data = await response.json()
            setResult(data.result) //the API result comes has a key called result, and we're fetching the data associated with that
        } catch (err) {
            setError('Something went wrong. Please try again.')
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className = "flex flex-col items-center mt-20 px-4">
            <form 
            className = "flex flex-col sm:flex-row sm:space-x-4 p-4 w-full max-w-lg rounded-lg shadow-md"
            onSubmit = {handleSubmit}>
                <input
                    type = "text"
                    value = {inputValue}
                    onChange = {handleChange}
                    placeholder = "Write me a quiz about..."
                    className={`${cinzel.className} w-full sm:flex-1 px-3 py-2 sm:py-2 border-b-2 border-gray-300 text-base sm:text-xl focus:outline-none focus:border-blue-500 placeholder-gray-400`}
                />
                <button
                    disabled = {!isReady} //Remember, JSX must be in {}
                    type = "submit"
                    className={`${cinzel.className} ${!isReady ? "opacity-50 cursor-not-allowed" : ""} mt-2 sm:mt-0 px-4 py-2 bg-orange-300 text-black text-base sm:text-lg font-bold rounded-lg hover:bg-orange-800 focus:outline-none`}
                >
                    {loading ? "Quizzing..." : "Quiz Me"} 
                </button>
            </form>

            {loading && ( //Only occurs when loading is true
                <p className = {`${cinzel.className} mt-8 text-gray-400 animate-pulse`}>
                    Generating Quiz...
                </p>
            )}
            
            {error && ( //Only runs if error is true (or has a value), meaning an error occurred
                <p className = {`${cinzel.className} mt-8 text-red-400`}>
                    {error}
                </p>
            )}

            {result && (
                <div className="mt-8 w-full max-w-xl space-y-6">
                    {result.questions.map((item, index) => (
                        <QuizQuestion
                            key={index}
                            index={index}
                            item={item}
                            cinzelClass={cinzel.className}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};



export default function Quiz() {
    return (
        <main>
            <NavBar/>
            <div className = {`${cinzel.className} leading-relaxed sm:leading-normal text-base sm:text-small md:text-lg lg:text-2xl space-y-6 mt-20 text-center`} style={{ wordSpacing: "2px" }}>
                <h1 className = {`${cinzel.className} text-center text-5xl text-orange-300`}>
                    Quiz Generator
                </h1>
                <h2>
                    <p className = "mt-15">
                        Test Your Knowledge with the Quiz Generator!
                    </p>
                    <p className = "mt-5">
                        Simply enter a topic and the AI will generate a set of tailored questions specifically for you. Whether you want to learn, review, or compete with friends, these quizzes are perfect for learners of all levels. Generate to see how much you know!
                    </p>
                </h2>
                
            </div>
            <QuizInputForm />
        </main>
    );
};
