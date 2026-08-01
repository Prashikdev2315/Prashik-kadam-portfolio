import Navbar         from "@/components/Navbar";
import Hero           from "@/components/Hero";
import About          from "@/components/About";
import Skills         from "@/components/Skills";
import Experience     from "@/components/Experience";
import Projects       from "@/components/Projects";
import Certifications from "@/components/Certifications";
import GitHubChart    from "@/components/GitHubChart";
import Contact        from "@/components/Contact";
import Footer         from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Certifications />
        <GitHubChart />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
