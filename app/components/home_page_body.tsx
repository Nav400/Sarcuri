import { Cinzel } from "next/font/google"

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "700"],
})

export default function HomePageBody() {
    return (
        <div className = {`${cinzel.className} leading-relaxed text-base sm:text-small md:text-lg lg:text-2xl space-y-6 mt-20 text-center`} style={{ wordSpacing: "2px" }}>
            <p>
                History never had to happen the way it did.
            </p>
            <p>
                Sarcuri comes from the two parts "Sar" and "Curi". <em>Sar</em>, coming from the sanskrit word <em>Sarvaday</em>, meaning always. <em>Curi</em> comes from the english word "curious." Together, the name Sarcuri translates to <strong>always curious</strong>.
            </p>
            <p>
                Sarcuri is a space for the endlessly curious — those who read about the fall of an empire and immediately wonder what if it hadn't fallen, or who finish a chapter on a forgotten battle and want to be tested on every detail. Powered by AI, Sarcuri lets you explore the roads history never took through its What-If engine, and sharpen your knowledge through custom quizzes built around any topic, era, or civilization you choose. Whether you're a student, a history enthusiast, or just someone who can't stop asking questions — you're in the right place.
            </p>
      </div>
    );

}