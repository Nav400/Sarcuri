"use client"

import { useState } from 'react'
import { Cinzel } from "next/font/google"
import Link from 'next/link'

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "700"],
})


export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className = "text-white">
            <div className = "max-w-7xl mx-auto px-4">
                <div className = "flex justify-between items-center h-16">
                    <div className = {`${cinzel.className} text-2xl tarcking-widest text-orange-300 font-bold`}>
                        SARCURI
                    </div>
                    
                    {/*Desktop Menu*/}
                    <div className = "hidden md:flex space-x-6">
                        <a href = "/" className = {`${cinzel.className} hover:text-gray-300 text-base tarcking-widest text-orange-300 font-bold`}>What-If</a>
                        <a href = "/quiz" className = {`${cinzel.className} hover:text-gray-300 text-base tarcking-widest text-orange-300 font-bold`}>Quiz</a>
                    </div>

                    {/*Mobile Menu*/}
                    <div className = "md:hidden">
                        <button onClick = {() => setIsOpen(!isOpen)}>
                            ☰
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden px-4 pb-4 space-y-2 flex flex-col">
                    <a href = "/" className = {`${cinzel.className} text-orange-300 hover:text-gray-300`}>What-If</a>
                    <a href = "/quiz" className = {`${cinzel.className} text-orange-300 hover:text-gray-300`}>Quiz</a>
                </div>
            )}
        </nav>
        
    );
}