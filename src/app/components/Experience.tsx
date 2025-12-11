"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useTheme } from "../context/ThemeContext"

export default function Experience() {
  const { theme } = useTheme()
  const shouldReduceMotion = useReducedMotion()
  
  const experiences = [
    {
      title: "Full Stack Developer & Senior Data Engineer",
      company: "RK Publishing",
      period: "Jun 2021 – Present",
      responsibilities: [
        <>
          <strong>Custom CRM Engineering</strong>
          {": Architected a scalable Python CRM, implementing Redis caching to slash query latency by 20% and drive a 35% increase in sales team operational throughput."}
        </>,
        <>
          <strong>Data Migration & Architecture</strong>
          {": Containerized Apache Spark (PySpark) ETL pipelines using Docker and orchestrated CI/CD workflows via GitHub Actions and Airflow to migrate TB-scale datasets into AWS Redshift, ensuring GDPR compliance and 98% data integrity."}
        </>,
        <>
          <strong>Strategic Technical Leadership</strong>
          {": Directed technical strategy for system enhancements, serving as the subject matter expert on software architecture; drove a 40% improvement in user adoption and a 25% reduction in reported bugs through proactive root-cause analysis."}
        </>,
        <>
          <strong>Performance Optimization</strong>
          {": Established a robust CI/CD pipeline using GitHub Actions to trigger automated PyTest and Jest suites, replacing manual QA and reducing production issues by 30% while adhering to GDPR data privacy standards."}
        </>,
        <>
          <strong>Client Solutions</strong>
          {": Partnered with key accounts to resolve complex technical challenges, resulting in a 15% increase in client satisfaction scores."}
        </>
      ]
    },
    {
      title: "Lead Real-time Data Analyst",
      company: "24-7 Intouch",
      period: "Jan 2019 – Apr 2021",
      responsibilities: [
        <>
          <strong>Analytics Operations</strong>
          {": Directed real-time data analytics operations, leveraging Power BI and SQL to optimize resource allocation, driving a 20% surge in team productivity and 5% reduction in operational downtime."}
        </>,
        <>
          <strong>Process Automation</strong>
          {": Engineered automated ETL ingestion workflows to deprecate manual reporting, increasing data accuracy by 25% and ensuring 99.9% uptime for C-suite executive dashboards."}
        </>,
        <>
          <strong>Predictive Modeling</strong>
          {": Optimized workforce planning by strategically analyzing historical data trends, resulting in a 30% increase in Service Level Objective (SLO) attainment."}
        </>,
        <>
          <strong>Team Leadership</strong>
          {": Led technical training and onboarding initiatives, reducing time-to-productivity for new analysts by 40%."}
        </>
      ]
    }
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
