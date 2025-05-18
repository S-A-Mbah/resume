"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useTheme } from "../context/ThemeContext"

export default function Education() {
  const { theme } = useTheme()
  const shouldReduceMotion = useReducedMotion()
  
  const education = [
    {
      degree: "Bachelor of Science in Computer Science",
      minor: "Minor in Statistics",
      school: "University of Manitoba",
      year: "2014 - 2018",
    },
    // Add more education entries as needed
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

  return (
    <div id="education" className="w-full flex items-center justify-center min-h-screen">
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
          Education
        </motion.h2>
        
        <motion.div
          className="w-full max-w-4xl mx-auto space-y-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {education.map((edu, index) => (
            <motion.div
              key={index}
              className={`relative group p-6 rounded-lg border ${
                theme === 'dark'
                  ? 'bg-[#112240] border-[#64ffda]/20'
                  : 'bg-white border-blue-500/20'
              }`}
              variants={itemVariants}
              data-framer-animation
              whileHover={{
                scale: shouldReduceMotion ? 1 : 1.01,
                borderColor: theme === 'dark' 
                  ? 'rgba(100, 255, 218, 0.3)'
                  : 'rgba(59, 130, 246, 0.3)',
                transition: { duration: 0.2 },
              }}
            >
              <div className={`absolute -inset-0.5 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-300 ${
                theme === 'dark'
                  ? 'bg-[#64ffda]'
                  : 'bg-blue-500'
              }`} />
              
              <div className="relative space-y-2">
                <h3 className={`text-2xl font-semibold ${
                  theme === 'dark' ? 'text-[#ccd6f6]' : 'text-gray-900'
                }`}>
                  {edu.degree}
                </h3>
                
                {edu.minor && (
                  <p className={theme === 'dark' ? 'text-[#64ffda]' : 'text-blue-600'}>
                    {edu.minor}
                  </p>
                )}
                
                <p className={`text-xl ${
                  theme === 'dark' ? 'text-[#8892b0]' : 'text-gray-700'
                }`}>
                  {edu.school}
                </p>
                
                <p className={`text-lg ${
                  theme === 'dark' ? 'text-[#8892b0]' : 'text-gray-600'
                }`}>
                  {edu.year}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

