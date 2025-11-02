import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function App() {
  // -----------------------------
  // THEME (in-memory)
  // -----------------------------
  const [dark, setDark] = useState(() => {
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    return prefersDark;
  });

  const toggleTheme = () => setDark((d) => !d);

  // -----------------------------
  // NAV (hamburger + scroll spy)
  // -----------------------------
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");

  const sectionIds = useMemo(
    () => ["home", "about", "vision", "projects", "skills", "timeline", "papers", "contact"],
    []
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { root: null, rootMargin: "0px 0px -60% 0px", threshold: [0.2, 0.4, 0.6, 0.8] }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  // -----------------------------
  // Background parallax glow
  // -----------------------------
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function onMove(e) {
      setMouse({ x: e.clientX, y: e.clientY });
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const parallax1 = {
    transform: `translate(${(mouse.x - window.innerWidth / 2) * 0.015}px, ${
      (mouse.y - window.innerHeight / 2) * 0.015
    }px)`,
  };
  const parallax2 = {
    transform: `translate(${(window.innerWidth / 2 - mouse.x) * 0.012}px, ${
      (window.innerHeight / 2 - mouse.y) * 0.012
    }px)`,
  };

  // -----------------------------
  // Motion helper
  // -----------------------------
  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    viewport: { once: true, amount: 0.2 },
  };

  return (
    <div className={dark ? "dark" : ""}>
      <motion.div
        className="min-h-screen transition-colors duration-700 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-100"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Enhanced Background Effects */}
        <div className="fixed inset-0 -z-10 select-none pointer-events-none overflow-hidden">
          {/* Animated gradient orbs */}
          <div
            style={parallax1}
            className="absolute w-[70vw] h-[70vw] max-w-[1000px] max-h-[1000px] bg-gradient-to-br from-cyan-300/30 via-blue-400/20 to-indigo-500/25 dark:from-cyan-500/20 dark:via-blue-600/15 dark:to-indigo-700/20 blur-[120px] rounded-full -top-40 -left-40 transition-all duration-700 ease-out"
          />
          <div
            style={parallax2}
            className="absolute w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-gradient-to-tl from-purple-300/25 via-pink-400/20 to-rose-500/20 dark:from-purple-600/15 dark:via-fuchsia-700/12 dark:to-rose-800/15 blur-[130px] rounded-full -bottom-32 -right-32 transition-all duration-700 ease-out"
          />
          
          {/* Grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)]" />
        </div>

        {/* NAVBAR */}
        <header className="sticky top-0 z-50 backdrop-blur-2xl bg-white/70 dark:bg-slate-950/70 border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm dark:shadow-slate-950/50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="#home" className="font-bold tracking-tight text-xl md:text-2xl bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
              Khalil Braham
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
              {sectionIds.map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className={
                    active === id
                      ? "text-cyan-600 dark:text-cyan-400 relative after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-cyan-500 after:to-blue-500 transition-all"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
                  }
                >
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </a>
              ))}
            </nav>

            {/* Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMenuOpen((o) => !o)}
                className="md:hidden px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                aria-label="Open menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <button
                onClick={toggleTheme}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 font-medium text-sm"
                aria-label="Toggle theme"
              >
                {dark ? "☀️ Light" : "🌙 Dark"}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden flex flex-col bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl px-6 py-4 text-sm gap-3 border-t border-slate-200 dark:border-slate-800"
            >
              {sectionIds.map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setMenuOpen(false)}
                  className={active === id ? "text-cyan-600 dark:text-cyan-400 font-medium" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"}
                >
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </a>
              ))}
            </motion.div>
          )}
        </header>

        {/* HERO */}
        <section id="home" className="max-w-7xl mx-auto text-center pt-32 pb-20 md:pt-40 md:pb-28 px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-950/50 dark:to-blue-950/50 border border-cyan-200/50 dark:border-cyan-800/50">
              <span className="text-sm font-medium bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
                Research Scientist • AI & ML Systems
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-100 dark:to-white bg-clip-text text-transparent">
                Generative AI for
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Scientific Discovery
              </span>
            </h1>
            
            <p className="mt-6 text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Building foundation models and autonomous AI agents for drug discovery, molecular design, and scientific reasoning at scale
            </p>
            
            <div className="mt-10 flex justify-center gap-4 flex-wrap">
              <a
                href="#vision"
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-medium shadow-lg hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Research Vision
              </a>
              <a
                href="#projects"
                className="px-8 py-3 rounded-xl border-2 border-slate-300 dark:border-slate-700 hover:border-cyan-500 dark:hover:border-cyan-500 font-medium hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all duration-300"
              >
                View Projects
              </a>
              <a
                href="/cv.pdf"
                className="px-8 py-3 rounded-xl border-2 border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 font-medium hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all duration-300"
              >
                Download CV
              </a>
            </div>
          </motion.div>
        </section>

        {/* ABOUT */}
        <section id="about" className="max-w-5xl mx-auto py-20 px-6">
          <motion.h2 {...fadeUp} className="text-4xl font-bold mb-8 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            About
          </motion.h2>
          <motion.div {...fadeUp} className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-200/50 dark:border-slate-800/50 shadow-xl">
            <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
              PhD researcher specializing in <span className="font-semibold text-cyan-600 dark:text-cyan-400">generative AI systems</span> and <span className="font-semibold text-blue-600 dark:text-blue-400">large language models</span> for scientific applications. Currently collaborating with <span className="font-semibold">Sanofi</span> on LLM alignment for pharmacology and conducting research at <span className="font-semibold">École Polytechnique</span> and <span className="font-semibold">Inria Saclay</span>.
            </p>
            <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
              My work bridges cutting-edge ML research with real-world impact in drug discovery, focusing on discrete generative modeling, flow matching, reinforcement learning from human feedback (RLHF), and agentic AI systems that can autonomously propose and validate scientific hypotheses.
            </p>
          </motion.div>
        </section>

        {/* VISION */}
        <section id="vision" className="max-w-5xl mx-auto py-20 px-6">
          <motion.h2 {...fadeUp} className="text-4xl font-bold mb-8 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            Research Vision
          </motion.h2>
          <motion.div {...fadeUp} className="space-y-6">
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30 rounded-2xl p-8 border border-cyan-200/50 dark:border-cyan-800/30 shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Autonomous Scientific Agents</h3>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                Developing AI systems capable of end-to-end scientific reasoning: from hypothesis generation and experimental design to data analysis and iterative refinement. These agents leverage tool-use, retrieval-augmented generation, and multi-step planning to accelerate discovery.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-2xl p-8 border border-indigo-200/50 dark:border-indigo-800/30 shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Foundation Models for Molecules</h3>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                Building scalable generative models (diffusion, flow matching) for molecular graphs with explicit structural constraints, property optimization, and integration with computational chemistry workflows like docking and quantum simulations.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-2xl p-8 border border-blue-200/50 dark:border-blue-800/30 shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Human-Aligned AI for Science</h3>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                Applying RLHF and preference learning to align LLMs with domain expertise in pharmacology, ensuring models generate scientifically accurate, safe, and actionable insights while respecting regulatory and ethical constraints.
              </p>
            </div>
          </motion.div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="max-w-7xl mx-auto py-20 px-6">
          <motion.h2 {...fadeUp} className="text-4xl font-bold mb-12 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            Research Projects
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Flow Matching for Molecular Generation",
                desc: "Graph-conditional continuous normalizations flows with validity guarantees, controllable sampling, and multi-objective optimization for lead discovery.",
                gradient: "from-cyan-500 to-blue-500",
                icon: "🧬"
              },
              {
                title: "Autonomous AI Lab Assistant",
                desc: "LLM agent orchestrating tools for literature review, experiment proposal, simulation, and result interpretation in closed-loop scientific workflows.",
                gradient: "from-blue-500 to-indigo-500",
                icon: "🤖"
              },
              {
                title: "Graph Diffusion for Drug Candidates",
                desc: "Property-conditioned discrete diffusion on molecular graphs with docking-in-the-loop refinement for target-specific molecule optimization.",
                gradient: "from-indigo-500 to-purple-500",
                icon: "💊"
              },
              {
                title: "RLHF for Pharmacology LLMs",
                desc: "Preference learning from expert feedback to align language models with pharmaceutical knowledge, safety protocols, and regulatory standards.",
                gradient: "from-purple-500 to-fuchsia-500",
                icon: "⚕️"
              },
              {
                title: "Retrieval-Augmented Scientific Reasoning",
                desc: "Combining dense retrieval, re-ranking, and attribution mechanisms to ground LLM outputs in scientific literature and databases.",
                gradient: "from-fuchsia-500 to-pink-500",
                icon: "📚"
              },
              {
                title: "Scalable Training Infrastructure",
                desc: "Distributed training pipelines, CUDA kernels, and MLOps systems for large-scale generative model development on HPC clusters.",
                gradient: "from-pink-500 to-rose-500",
                icon: "⚡"
              },
            ].map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group relative bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800/50 hover:border-transparent shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                <div className="text-4xl mb-4">{p.icon}</div>
                <h3 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">{p.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="max-w-6xl mx-auto py-20 px-6">
          <motion.h2 {...fadeUp} className="text-4xl font-bold mb-12 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            Technical Expertise
          </motion.h2>
          <motion.div {...fadeUp} className="space-y-6">
            {[
              {
                category: "ML Frameworks & Tools",
                skills: ["PyTorch", "JAX", "Hugging Face", "Weights & Biases", "Ray", "DeepSpeed"],
                color: "from-cyan-500 to-blue-500"
              },
              {
                category: "Generative Models",
                skills: ["Diffusion Models", "Flow Matching", "VAEs", "GANs", "Normalizing Flows", "Energy-Based Models"],
                color: "from-blue-500 to-indigo-500"
              },
              {
                category: "LLM & NLP",
                skills: ["Transformers", "RLHF", "RAG", "Instruction Tuning", "Prompt Engineering", "Tool-Use"],
                color: "from-indigo-500 to-purple-500"
              },
              {
                category: "Scientific Computing",
                skills: ["Molecular Modeling", "Graph Neural Networks", "RDKit", "Docking", "Quantum Chemistry"],
                color: "from-purple-500 to-fuchsia-500"
              },
              {
                category: "Systems & Infrastructure",
                skills: ["CUDA", "C++", "Linux", "Docker", "Kubernetes", "Distributed Training", "MLOps"],
                color: "from-fuchsia-500 to-pink-500"
              },
            ].map((group, i) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800/50 shadow-lg"
              >
                <h3 className="font-bold text-lg mb-4 text-slate-900 dark:text-white">{group.category}</h3>
                <div className="flex flex-wrap gap-3">
                  {group.skills.map((s) => (
                    <span
                      key={s}
                      className={`px-4 py-2 rounded-lg bg-gradient-to-r ${group.color} text-white font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 text-sm`}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* TIMELINE */}
        <section id="timeline" className="max-w-5xl mx-auto py-20 px-6">
          <motion.h2 {...fadeUp} className="text-4xl font-bold mb-12 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            Experience & Milestones
          </motion.h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-indigo-500" />
            <div className="space-y-12 ml-4">
              {[
                {
                  date: "2025–Present",
                  title: "PhD Researcher",
                  org: "École Polytechnique & Inria Saclay",
                  desc: "Discrete generative modeling, flow matching, and LLM agents for scientific discovery",
                  color: "from-cyan-500 to-blue-500"
                },
                {
                  date: "2024–2025",
                  title: "ML Research Collaboration",
                  org: "Sanofi",
                  desc: "Developing RLHF pipelines for LLM alignment with pharmacological domain expertise",
                  color: "from-blue-500 to-indigo-500"
                },
                {
                  date: "2023–2024",
                  title: "ML Engineer",
                  org: "Retail Analytics Startup",
                  desc: "Time-series forecasting, demand prediction, and shape modeling for supply chain optimization",
                  color: "from-indigo-500 to-purple-500"
                },
                {
                  date: "2022–2023",
                  title: "Research Intern",
                  org: "Academic Lab",
                  desc: "Graph neural networks for molecular property prediction and synthesis planning",
                  color: "from-purple-500 to-fuchsia-500"
                },
              ].map((item, i) => (
                <motion.div
                  key={item.date}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative pl-12 group"
                >
                  <div className={`absolute left-6 top-2 w-5 h-5 rounded-full bg-gradient-to-br ${item.color} shadow-lg group-hover:scale-125 transition-transform duration-300`}>
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${item.color} animate-ping opacity-75`} />
                  </div>
                  <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl rounded-xl p-6 border border-slate-200/50 dark:border-slate-800/50 shadow-lg hover:shadow-xl transition-all duration-300">
                    <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 mb-1">{item.date}</p>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{item.title}</h3>
                    <p className="text-base font-medium text-slate-700 dark:text-slate-300 mb-3">{item.org}</p>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PAPERS */}
        <section id="papers" className="max-w-5xl mx-auto py-20 px-6">
          <motion.h2 {...fadeUp} className="text-4xl font-bold mb-8 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            Selected Publications
          </motion.h2>
          <motion.div {...fadeUp} className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-200/50 dark:border-slate-800/50 shadow-xl text-center">
            <div className="text-6xl mb-4">📄</div>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">Publications coming soon</p>
            <p className="text-sm text-slate-500 dark:text-slate-500">Working on papers for NeurIPS, ICML, and ICLR 2026</p>
          </motion.div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="max-w-5xl mx-auto py-20 px-6">
          <motion.h2 {...fadeUp} className="text-4xl font-bold mb-12 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent text-center">
            Let's Connect
          </motion.h2>
          <motion.div {...fadeUp} className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "📧", label: "Email", value: "khalil.braham@polytechnique.edu", href: "mailto:khalil.braham@polytechnique.edu" },
              { icon: "🔗", label: "LinkedIn", value: "Connect with me", href: "#" },
              { icon: "🐙", label: "GitHub", value: "View my code", href: "#" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800/50 hover:border-cyan-500 dark:hover:border-cyan-500 shadow-lg hover:shadow-xl transition-all duration-300 text-center group"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{item.label}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">{item.value}</p>
              </a>
            ))}
          </motion.div>
        </section>

        {/* FOOTER */}
        <footer className="py-16 text-center border-t border-slate-200/50 dark:border-slate-800/50 mt-20">
          <div className="max-w-5xl mx-auto px-6">
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              © {new Date().getFullYear()} Khalil Braham. Building the future of AI-driven science.
            </p>
            <div className="flex justify-center gap-6 text-sm text-slate-500 dark:text-slate-500">
              <a href="#home" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Home</a>
              <a href="#projects" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Projects</a>
              <a href="#contact" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Contact</a>
            </div>
          </div>
        </footer>
      </motion.div>
    </div>
  );
}

