"use client";

import { motion, type Variants } from "framer-motion";
import { projects } from "@/data/portfolio";
import ProjectCard from "./ProjectCard";
import SectionHeader from "./SectionHeader";

const cardVariants: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function Projects() {
  return (
    <section id="projects" className="section">
      <SectionHeader
        label="// projects"
        title="Featured Projects"
        intro="Three systems taken from problem statement to something runnable."
      />

      <div
        style={{
          display:             "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))",
          gap:                 "24px",
          alignItems:          "stretch",
        }}
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: index * 0.08 }}
            style={{ display: "flex" }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
