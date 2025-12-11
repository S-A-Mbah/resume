"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useTheme } from "../context/ThemeContext"

export default function Skills() {
  const { theme } = useTheme()
  const shouldReduceMotion = useReducedMotion()

  const skillCategories = [
    {
      category: "Data Engineering & Analytics",
      skills: [
        { name: "Python", icon: "🐍" },
        { name: "Pandas", icon: "🐼" },
        { name: "NumPy", icon: "🔢" },
        { name: "Airflow", icon: "🍃" },
        { name: "Kafka", icon: "📨" },
        { name: "PyTorch", icon: "🔥" },
        { name: "SQL (PostgreSQL)", icon: "🗃️" },
        { name: "NoSQL (MongoDB)", icon: "🍃" },
        { name: "ETL/ELT Pipelines", icon: "🔄" },
        { name: "Data Warehousing", icon: "🏢" },
        { name: "Data Modeling", icon: "📐" },
        { name: "Big Data (Spark, Hadoop)", icon: "🐘" },
        { name: "Power BI", icon: "📊" },
        { name: "Google Tag Manager", icon: "🏷️" },
      ]
    },
    {
      category: "Web Development",
      skills: [
        { name: "JavaScript", icon: "💻" },
        { name: "React", icon: "⚛️" },
        { name: "Next.js", icon: "▲" },
        { name: "Expo", icon: "📱" },
        { name: "PHP", icon: "🐘" },
        { name: "Vue.js", icon: "🟩" },
        { name: "Nuxt.js", icon: "💚" },
        { name: "D3.js", icon: "📊" },
        { name: "HTML5", icon: "🌐" },
        { name: "CSS3", icon: "🎨" },
        { name: "RESTful APIs", icon: "🔌" },
      ]
    },
    {
      category: "Cloud & DevOps",
      skills: [
        { name: "AWS (EC2, Redshift, Lambda)", icon: "☁️" },
        { name: "Docker", icon: "🐳" },
        { name: "Kubernetes", icon: "☸️" },
        { name: "IaC (Terraform)", icon: "🏗️" },
        { name: "CI/CD Pipelines (GitHub Actions)", icon: "🚀" },
        { name: "Git", icon: "🐙" },
        { name: "Automation", icon: "⚙️" },
      ]
    },
    {
      category: "Methodologies",
      skills: [
        { name: "Agile", icon: "🏃" },
        { name: "SDLC", icon: "📋" },
        { name: "TDD (Test Driven Development)", icon: "🔴" },
        { name: "Unit Testing (PyTest/Jest)", icon: "🧪" },
        { name: "Statistical Analysis", icon: "📉" },
        { name: "Prompt Engineering", icon: "🤖" },
      ]
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 0.8
      }
    }
  }

  return (
    <div id="skills" className="w-full flex items-center justify-center min-h-screen">
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
          Skills
        </motion.h2>
        
        <motion.div
          className="space-y-10 w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {skillCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-5">
              <motion.h3 
                className={`text-2xl font-semibold text-center ${
                  theme === 'dark' ? 'text-[#8892b0]' : 'text-gray-700'
                }`}
                variants={itemVariants}
              >
                {category.category}
              </motion.h3>
              
              <motion.div 
                className="flex flex-wrap justify-center gap-3"
                variants={containerVariants}
              >
                {category.skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    className="relative group"
                    variants={itemVariants}
                    data-framer-animation
                  >
                    <div className={`absolute -inset-0.5 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-300 ${
                      theme === 'dark'
                        ? 'bg-[#64ffda]'
                        : 'bg-blue-500'
                    }`} />
                    <div className={`relative px-5 py-2 rounded-lg font-medium 
                      flex items-center space-x-2 transition-colors duration-300 border cursor-default ${
                        theme === 'dark'
                          ? 'bg-[#112240] text-[#64ffda] border-[#64ffda]/20 hover:bg-[#64ffda]/10'
                          : 'bg-white text-blue-600 border-blue-500/20 hover:bg-blue-50'
                      }`}
                    >
                      <span className="text-xl">{skill.icon}</span>
                      <span>{skill.name}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
