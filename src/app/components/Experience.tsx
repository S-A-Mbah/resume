"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useTheme } from "../context/ThemeContext"

export default function Experience() {
  const { theme } = useTheme()
  const shouldReduceMotion = useReducedMotion()
  
  const experiences = [
    {
      title: "Developer & Senior Technical Systems Analyst",
      company: "RK Publishing",
      period: "Jun 2021 - Present",
      responsibilities: [
        <>
          <strong>Developed and maintained a custom CRM system</strong>
          {" that streamlined client data management, increasing operational efficiency by 35% and reducing customer query response time by 20%."}
        </>,
        <>
          <strong>Delivered actionable insights and guidance on software updates and system enhancements</strong>
          {" as a trusted subject matter expert, leading to a 40% improvement in user adoption rates and a 25% reduction in customer-reported issues."}
        </>,
        <>
          <strong>Spearheaded data migration and cleansing initiatives</strong>
          {" that resulted in a 98% improvement in data accuracy and a 50% decrease in data retrieval times, enhancing overall system reliability and performance."}
        </>,
        <>
          <strong>Ensured flawless website performance</strong>
          {" by performing rigorous quality assurance testing, reducing bugs and issues by 30% and improving site load times by 25%, which directly enhanced user experience and satisfaction."}
        </>,
        <>
          <strong>Partnered with clients to resolve technical challenges</strong>
          {", leading to a 15% improvement in client satisfaction scores and enhancing long-term relationships with key accounts."}
        </>
      ]
    },
    {
      title: "Lead Realtime Data Analyst",
      company: "24-7 Intouch",
      period: "Jan 2019 - Apr 2021",
      responsibilities: [
        "Managed daily operations of the real-time data team, overseeing staffing, scheduling, and performance monitoring, which led to a 20% improvement in team productivity and a 5% reduction in operational downtime.",
        "Optimized workforce planning by strategically analyzing trends and historical data, resulting in a 30% increase in the ability to meet service level objectives and improved resource allocation.",
        "Designed and automated daily reporting processes, enhancing data accuracy and reliability, which supported data-driven decision-making and decreased reporting errors by 25%.",
        "Led comprehensive interview processes and training sessions for new team members, ensuring a 40% faster onboarding time and a 20% increase in team efficiency.",
      ]
    }
    // Add more experience entries as needed
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
    <div id="experience" className="w-full flex items-center justify-center min-h-screen">
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
          Experience
        </motion.h2>
        
        <motion.div
          className="w-full max-w-4xl mx-auto space-y-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {experiences.map((exp, index) => (
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
              
              <div className="relative space-y-3">
                <h3 className={`text-2xl font-semibold ${
                  theme === 'dark' ? 'text-[#ccd6f6]' : 'text-gray-900'
                }`}>
                  {exp.title}
                </h3>
                <p className={theme === 'dark' ? 'text-[#64ffda]' : 'text-blue-600'}>
                  {exp.company}
                </p>
                <p className={`text-lg ${
                  theme === 'dark' ? 'text-[#8892b0]' : 'text-gray-600'
                }`}>
                  {exp.period}
                </p>
                <ul className="space-y-2 list-none mt-3">
                  {exp.responsibilities.map((responsibility, idx) => (
                    <motion.li 
                      key={idx}
                      className="flex items-start space-x-2"
                      variants={itemVariants}
                      data-framer-animation
                    >
                      <span className={theme === 'dark' ? 'text-[#64ffda]' : 'text-blue-500'}>
                        ▹
                      </span>
                      <span className={
                        theme === 'dark' ? 'text-slate-300' : 'text-gray-700'
                      }>
                        {responsibility}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

