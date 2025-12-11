"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { useEffect, useState, useRef } from "react";
import PipelineFlow from "./components/PipelineFlow";
import TechStack from "./components/TechStack";
import DashboardPreview from "./components/DashboardPreview";
import DataQuality from "./components/DataQuality";

export default function OpenMetricPage() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [lastPipelineRun, setLastPipelineRun] = useState<Date | undefined>();
  const [pipelineLogs, setPipelineLogs] = useState<string[]>([]);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const scrollContainerRef = useRef<HTMLElement | Window | null>(null);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      let scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
      let currentScrollContainer: HTMLElement | Window = window;

      // If the scroll event comes from a specific element (nested scroll), use its scrollTop
      const target = e.target as HTMLElement;
      // Check if target is a valid element with scrollTop (it could be Document which doesn't have scrollTop directly in some browsers)
      if (target && target instanceof HTMLElement && target.scrollTop !== undefined) {
        if (target.scrollTop > scrollTop) {
            scrollTop = target.scrollTop;
            currentScrollContainer = target;
        }
      }
      
      // Store the element that is actually scrolling
      if (scrollTop > 0) {
        scrollContainerRef.current = currentScrollContainer;
      }

      if (scrollTop > 100) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    
    // Use capture: true to catch scroll events from nested containers
    window.addEventListener("scroll", handleScroll, { capture: true });
    return () => window.removeEventListener("scroll", handleScroll, { capture: true });
  }, []);

  const scrollToTop = () => {
    if (scrollContainerRef.current && scrollContainerRef.current !== window && 'scrollTo' in scrollContainerRef.current) {
        (scrollContainerRef.current as HTMLElement).scrollTo({ top: 0, behavior: "smooth" });
    } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
        document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
        document.body.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePipelineRun = (logs: string[]) => {
    setPipelineLogs(logs);
    setLastPipelineRun(new Date());
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div
      className={`min-h-screen w-full relative ${
        theme === "dark"
          ? "bg-gradient-to-br from-[#0a192f] via-[#0a192f] to-[#112240]"
          : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
      }`}
    >
      {/* Back Navigation */}
      {/* Back Navigation */}
      <Link
        href="/#projects"
        className={`fixed top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm ${
          theme === "dark"
            ? "bg-[#112240] text-[#64ffda] border border-[#64ffda]/20 hover:border-[#64ffda]/70"
            : "bg-white text-blue-600 border border-blue-500/20 hover:bg-blue-50"
        } transition-all duration-300 shadow-md z-50`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 sm:w-5 sm:h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        <span className="hidden sm:inline">Back to Resume</span>
        <span className="sm:hidden">Back</span>
      </Link>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className={`fixed top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full transition-all duration-300 shadow-md z-50 ${
          theme === "dark"
            ? "bg-[#112240] text-yellow-400 border border-[#64ffda]/20 hover:border-[#64ffda]/70"
            : "bg-white text-gray-600 border border-blue-500/20 hover:bg-blue-50"
        }`}
      >
        {theme === 'dark' ? (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>

      {/* Loading State */}
      {!mounted && (
        <div className="flex justify-center items-center h-screen">
          <div className={`${theme === "dark" ? "text-[#64ffda]" : "text-blue-500"}`}>
            <svg
              className="animate-spin h-12 w-12"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        </div>
      )}

      {/* Main Content */}
      <motion.div
        className={`max-w-7xl mx-auto px-3 sm:px-4 pt-16 pb-8 sm:py-20 transition-opacity duration-500 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
        variants={containerVariants}
        initial="hidden"
        animate={mounted ? "visible" : "hidden"}
      >
        {/* Hero Section */}
        <motion.section className="text-center mb-8 sm:mb-16" variants={sectionVariants}>
          <motion.div
            className={`inline-block px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4 ${
              theme === "dark"
                ? "bg-[#64ffda]/10 text-[#64ffda] border border-[#64ffda]/20"
                : "bg-blue-100 text-blue-600"
            }`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Interactive Data Engineering Demo
          </motion.div>

          <h1
            className={`text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 ${
              theme === "dark" ? "text-[#ccd6f6]" : "text-gray-900"
            }`}
          >
            OpenMetric{" "}
            <span className={theme === "dark" ? "text-[#64ffda]" : "text-blue-600"}>
              ETL Platform
            </span>
          </h1>

          <p
            className={`text-sm sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed px-2 sm:px-0 ${
              theme === "dark" ? "text-[#8892b0]" : "text-gray-600"
            }`}
          >
            A fully automated, end-to-end data pipeline that extracts cryptocurrency
            and sentiment data, performs transformations with quality validation, and
            serves insights through an interactive dashboard.
          </p>

          {/* Interactive Hint */}
          <motion.div
            className={`mt-4 sm:mt-6 inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm ${
              theme === "dark" ? "bg-[#112240] text-[#8892b0]" : "bg-gray-100 text-gray-600"
            }`}
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
            </svg>
            <span>Tap buttons below to interact</span>
          </motion.div>

          {/* Key Features Pills */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-6 sm:mt-8 px-2">
            {[
              { label: "Pipeline Demo", icon: "▶", targetId: "pipeline-section" },
              { label: "Auto-Refresh", icon: "🔄", targetId: "dashboard-section" },
              { label: "Simulate Fail", icon: "⚠️", targetId: "data-quality-section" },
              { label: "Charts", icon: "📊", targetId: "dashboard-section" },
            ].map((feature, i) => (
              <motion.button
                key={feature.label}
                onClick={() => {
                  document.getElementById(feature.targetId)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-sm ${
                  theme === "dark"
                    ? "bg-[#112240] text-[#ccd6f6] border border-[#64ffda]/20"
                    : "bg-white text-gray-700 border border-gray-200 shadow-sm"
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="mr-1 sm:mr-2">{feature.icon}</span>
                {feature.label}
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* Pipeline Architecture - Interactive */}
        <motion.section id="pipeline-section" className="mb-6 sm:mb-12" variants={sectionVariants}>
          <PipelineFlow onPipelineRun={handlePipelineRun} />
        </motion.section>

        {/* Tech Stack */}
        <motion.section className="mb-6 sm:mb-12" variants={sectionVariants}>
          <TechStack />
        </motion.section>

        {/* Dashboard Preview - With live data */}
        <motion.section id="dashboard-section" className="mb-6 sm:mb-12" variants={sectionVariants}>
          <DashboardPreview lastPipelineRun={lastPipelineRun} />
        </motion.section>

        {/* Data Quality - Interactive validation */}
        <motion.section id="data-quality-section" className="mb-6 sm:mb-12" variants={sectionVariants}>
          <DataQuality />
        </motion.section>

        {/* Project Highlights / Resume Hooks */}
        <motion.section
          className={`p-4 sm:p-6 rounded-xl ${theme === "dark" ? "bg-[#0a192f]/50" : "bg-gray-50"}`}
          variants={sectionVariants}
        >
          <h3
            className={`text-lg sm:text-xl font-semibold mb-4 sm:mb-6 ${
              theme === "dark" ? "text-[#ccd6f6]" : "text-gray-900"
            }`}
          >
            Engineering Highlights
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
            {[
              {
                question: "Why Airflow?",
                answer: "DAGs and complex dependencies with observability, retry logic, and dependency management.",
                icon: "🔄",
              },
              {
                question: "Why Great Expectations?",
                answer: "Data governance to prevent 'silent failures'. Circuit breaker halts bad data.",
                icon: "✅",
              },
              {
                question: "Why Docker?",
                answer: "Reproducible environments. Docker Compose spins up the entire stack.",
                icon: "🐳",
              },
              {
                question: "Why Terraform?",
                answer: "Infrastructure as code for rapid cloud resource management.",
                icon: "🏗️",
              },
            ].map((item, index) => (
              <motion.div
                key={item.question}
                className={`p-3 sm:p-4 rounded-lg border ${
                  theme === "dark"
                    ? "bg-[#112240] border-[#64ffda]/20"
                    : "bg-white border-gray-200"
                }`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-2 sm:gap-3">
                  <span className="text-xl sm:text-2xl flex-shrink-0">{item.icon}</span>
                  <div className="min-w-0">
                    <h4
                      className={`text-xs sm:text-sm font-medium mb-1 sm:mb-2 ${
                        theme === "dark" ? "text-[#64ffda]" : "text-blue-600"
                      }`}
                    >
                      {item.question}
                    </h4>
                    <p
                      className={`text-[10px] sm:text-sm leading-relaxed ${
                        theme === "dark" ? "text-[#8892b0]" : "text-gray-600"
                      }`}
                    >
                      {item.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Pipeline Logs (if any) */}
        {pipelineLogs.length > 0 && (
          <motion.section
            className={`mt-12 p-6 rounded-xl ${
              theme === "dark" ? "bg-[#0a0f18]" : "bg-gray-900"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Last Pipeline Run</h3>
              <span className="text-xs text-gray-400">
                {lastPipelineRun?.toLocaleString()}
              </span>
            </div>
            <div className="font-mono text-xs max-h-48 overflow-y-auto space-y-1">
              {pipelineLogs.map((log, i) => (
                <div
                  key={i}
                  className={
                    log.includes("[SUCCESS]")
                      ? "text-green-400"
                      : log.includes("[ERROR]")
                      ? "text-red-400"
                      : "text-gray-300"
                  }
                >
                  {log}
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* GitHub Link */}
        <motion.div className="mt-12 text-center" variants={sectionVariants}>
          <a
            href="https://github.com/S-A-Mbah/resume/tree/main/src/app/projects/openmetric"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              theme === "dark"
                ? "bg-[#64ffda] text-[#0a192f] hover:bg-[#64ffda]/90"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View on GitHub
          </a>
        </motion.div>
      </motion.div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 p-3 rounded-full shadow-lg z-[9999] transition-all duration-300 transform ${
          showBackToTop ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-90 pointer-events-none"
        } ${
          theme === "dark"
            ? "bg-[#64ffda] text-[#0a192f] hover:bg-[#64ffda]/90"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
        style={{ zIndex: 2147483647 }} 
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
}
