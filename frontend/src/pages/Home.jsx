import Hero from "../sections/Hero";
import About from "../sections/About";
import Skills from "../sections/Skills";
import Portfolio from "../sections/Portfolio";
import Contact from "../sections/Contact";
import "../styles/portfolio.css"

function Home() {
  return (
    <>
      <div className="portfolio-root">

        <main>
          <Hero />
          <About />
          <Skills />
          <Portfolio />
          <Contact />
        </main>

      </div>
    </>
  );
}

export default Home;
