"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/portfolio";
import ProjectCard from "./ProjectCard";

const headingVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Projects() {
  return (
    <section
      id="projects"
      style={{
        padding:     "96px 24px",
        maxWidth:    "1200px",
        margin:      "0 auto",
      }}
    >
      {/* Heading */}
      <motion.div
        variants={headingVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{ marginBottom: "48px" }}
      >
        <div className="section-label">// projects</div>
        <h2 className="section-heading">Featured Projects</h2>
        <div className="section-divider" />
      </motion.div>

      {/* Grid — equal height cards */}
      <div
        style={{
          display:             "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap:                 "24px",
          alignItems:          "stretch",
        }}
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
            style={{ display: "flex" }}
          >
            <ProjectCard project={project} index={index} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
