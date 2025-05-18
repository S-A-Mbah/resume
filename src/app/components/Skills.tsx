"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useTheme } from "../context/ThemeContext"

export default function Skills() {
  const { theme } = useTheme()
  const shouldReduceMotion = useReducedMotion()

  const skillCategories = [
    {
      category: "Programming Languages",
      skills: [
        { name: "Python", icon: "🐍" },
        { name: "JavaScript", icon: "💻" },
        { name: "Java", icon: "☕" },
        { name: "SQL", icon: "🗃️" },
        { name: "HTML", icon: "🌐" },
        { name: "CSS", icon: "🎨" },
      ]
    },
    {
      category: "Frameworks & Libraries",
      skills: [
        { name: "React", icon: "⚛️" },
        { name: "Next.js", icon: "▲" },
        { name: "Vue.js", icon: "🟩" },
        { name: "Nuxt.js", icon: "💚" },
        { name: "Pandas", icon: "🐼" },
      ]
    },
    {
      category: "Development & Integration",
      skills: [
        { name: "RESTful APIs", icon: "🔌" },
        { name: "API Development", icon: "⚡" },
        { name: "Automation", icon: "⚙️" },
        { name: "Cloud Computing", icon: "☁️" },
        { name: "Google Tag Manager", icon: "🏷️" },
      ]
    },
    {
      category: "AI & Analytics",
      skills: [
        { name: "Prompt Engineering", icon: "🤖" },
        { name: "Power BI", icon: "📊" },
        { name: "Data Analysis", icon: "📈" },
      ]
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.05,
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

