import NavBar from "../components/NavBar";
import { Cinzel } from "next/font/google"

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "700"],
})

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
        </main>
    );
}