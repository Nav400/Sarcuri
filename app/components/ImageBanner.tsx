import React from "react"
import { Cinzel } from "next/font/google"

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "700"],
})

const ImageBanner = () => {
  return (
    <div className="w-full max-w-full mx-auto">
      <img
        src="/sarcuri_logo.png"
        alt="Sarcuri Logo"
        className="w-full h-auto object-cover rounded-lg"
      />
      <h2 className={`${cinzel.className} text-orange-300 text-4xl font-bold text-center p-4`}>
        A curious mind exploring history's what-ifs
      </h2>
    </div>
  );
};

export default ImageBanner;