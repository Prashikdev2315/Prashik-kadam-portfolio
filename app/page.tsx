import Navbar         from "@/components/Navbar";
import Hero           from "@/components/Hero";
import About          from "@/components/About";
import Skills         from "@/components/Skills";
import Projects       from "@/components/Projects";
import Certifications from "@/components/Certifications";
import GitHubChart    from "@/components/GitHubChart";
import Contact        from "@/components/Contact";
import Footer         from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <GitHubChart />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
