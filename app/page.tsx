import ImageBanner from "./components/ImageBanner";
import NavBar from "./components/NavBar";
import HomePageBody from "./components/home_page_body";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div>
      <main className = "pb-30 ml-2 mr-2">
        <NavBar />
        <ImageBanner />
        <HomePageBody />
      </main>
      <Footer />
    </div>
  );
}