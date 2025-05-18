"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useTheme } from "../context/ThemeContext"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Modal from "./Modal"
import CaseStudy from "./CaseStudy"

interface Project {
  title: string;
  description: string;
  image: string;
  imageAttribution?: string;
  technologies: string[];
  githubLink: string;
  liveLink?: string;
  isInternal?: boolean;
  isModal?: boolean;
}

export default function Projects() {
  const router = useRouter()
  const { theme } = useTheme()
  const shouldReduceMotion = useReducedMotion()
  const [isLoading, setIsLoading] = useState(false)
  const [loadingProject, setLoadingProject] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Prefetch the weather app route
  useEffect(() => {
    // Check if router.prefetch exists before calling it
    if (typeof router.prefetch === 'function') {
      router.prefetch('/projects/weather');
      router.prefetch('/projects/calculator');
    }
  }, [router])

  const projects: Project[] = [
    {
      title: "Weather App",
      description: "Real-time weather forecasting application with location search functionality, displaying current conditions and forecasts.",
      image: "/weather.png",
      imageAttribution: "Icon by iconixar",
      technologies: ["Next.js", "React", "TailwindCSS", "OpenWeather API"],
      githubLink: "https://github.com/S-A-Mbah/resume",
      liveLink: "/projects/weather",
      isInternal: true
    },
    {
      title: "Calculator App",
      description: "Interactive iPhone-inspired calculator with basic arithmetic operations and calculation history.",
      image: "/calculator-preview.jpg",
      technologies: ["React", "Next.js", "CSS", "TypeScript"],
      githubLink: "https://github.com/S-A-Mbah/Calculator-app",
      liveLink: "/projects/calculator",
      isInternal: true
    },
    {
      title: "Bellabeat Case Study",
      description: "Data analysis of Fitbit fitness trackers to identify trends and inform marketing strategies for a health-focused tech company.",
      image: "/visualization-activity.png",
      technologies: ["Python", "Data Analysis", "Pandas", "Matplotlib"],
      githubLink: "https://www.kaggle.com/code/sambah29/bellabeat-case-study-using-python",
      isModal: true
    },
    // Add more projects as needed
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        duration: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.2
      }
    }
  }

  const handleProjectNavigation = (url: string, projectTitle: string) => {
    setIsLoading(true)
    setLoadingProject(projectTitle)
    // Use direct navigation instead of router.push for more reliable page transitions
    setTimeout(() => {
      window.location.href = url
    }, 100) // Small delay to allow for the loading state to show
  }

  const openProjectModal = () => {
    setIsModalOpen(true)
  }

  return (
    <div id="projects" className="w-full flex items-center justify-center min-h-screen">
      <motion.div className="w-full max-w-[95%] mx-auto py-10">
        <motion.h2
          className={`text-4xl font-bold mb-10 text-center ${
            theme === 'dark' ? 'text-[#ccd6f6]' : 'text-gray-900'
          }`}
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.3 }}
        >
          Projects
        </motion.h2>
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative group rounded-lg border overflow-hidden h-fit ${
                theme === 'dark'
                  ? 'bg-[#112240] border-[#64ffda]/20'
                  : 'bg-white border-blue-500/20'
              }`}
              whileHover={{
                scale: shouldReduceMotion ? 1 : 1.01,
                borderColor: theme === 'dark' 
                  ? 'rgba(100, 255, 218, 0.3)'
                  : 'rgba(59, 130, 246, 0.3)',
                transition: { duration: 0.2 },
              }}
              data-framer-animation
            >
              <div className="relative p-4 space-y-2">
                <div className="relative h-52 w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-[#0a192f]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="rounded-lg object-contain"
                    priority={index < 2}
                  />
                  {project.imageAttribution && (
                    <div className={`absolute bottom-1 right-1 text-xs px-1 rounded bg-black/50 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-200'
                    }`}>
                      {project.imageAttribution}
                    </div>
                  )}
                </div>
                
                <h3 className={`text-2xl font-semibold ${
                  theme === 'dark' ? 'text-[#ccd6f6]' : 'text-gray-900'
                }`}>
                  {project.title}
                </h3>
                
                <p className={
                  theme === 'dark' ? 'text-[#8892b0]' : 'text-gray-600'
                }>
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className={`px-3 py-1 rounded-full text-sm ${
                        theme === 'dark'
                          ? 'bg-[#64ffda]/10 text-[#64ffda]'
                          : 'bg-blue-100 text-blue-600'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-4 pt-1">
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center px-4 py-2 rounded-lg border transition-colors ${
                      theme === 'dark'
                        ? 'border-[#64ffda] text-[#64ffda] hover:bg-[#64ffda]/10'
                        : 'border-blue-500 text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    {project.isModal ? 'View on Kaggle' : 'GitHub'}
                  </a>
                  {project.isInternal ? (
                    <button
                      onClick={() => project.liveLink && handleProjectNavigation(project.liveLink, project.title)}
                      className={`inline-flex items-center px-4 py-2 rounded-lg border transition-colors ${
                        theme === 'dark'
                          ? 'border-[#64ffda] text-[#64ffda] hover:bg-[#64ffda]/10'
                          : 'border-blue-500 text-blue-600 hover:bg-blue-50'
                      } relative`}
                    >
                      {isLoading && loadingProject === project.title ? (
                        <>
                          <span className="opacity-0">View Project</span>
                          <span className="absolute inset-0 flex items-center justify-center">
                            <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          </span>
                        </>
                      ) : (
                        "View Project"
                      )}
                    </button>
                  ) : project.isModal ? (
                    <button
                      onClick={() => openProjectModal()}
                      className={`inline-flex items-center px-4 py-2 rounded-lg border transition-colors ${
                        theme === 'dark'
                          ? 'border-[#64ffda] text-[#64ffda] hover:bg-[#64ffda]/10'
                          : 'border-blue-500 text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      View Case Study
                    </button>
                  ) : (
                    <a
                      href={project.liveLink}
                      className={`inline-flex items-center px-4 py-2 rounded-lg border transition-colors ${
                        theme === 'dark'
                          ? 'border-[#64ffda] text-[#64ffda] hover:bg-[#64ffda]/10'
                          : 'border-blue-500 text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Case Study Modal */}
      <Modal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Bellabeat Case Study: Fitness Data Analysis"
      >
        <CaseStudy />
      </Modal>
    </div>
  )
}