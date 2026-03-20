import { Cinzel } from "next/font/google"

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "700"],
})

export default function Footer() {
    return (
        <footer className={`${cinzel.className} bg-gray-600 text-white text-xl text-left p-8`}>
            <a target = "_b;ank" href = "https://www.youtube.com/@sarcuri">
                Youtube: @sarcuri
            </a>
        </footer>
    )
}