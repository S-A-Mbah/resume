"use client"

import { useTheme } from '../context/ThemeContext'

// Define React namespace for JSX types
namespace React {
  export interface DetailedHTMLProps<P, T> extends HTMLAttributes<T> {
    [key: string]: any;
  }
  export interface HTMLAttributes<T> {
    [key: string]: any;
  }
  export interface LiHTMLAttributes<T> extends HTMLAttributes<T> {
    [key: string]: any;
  }
  export interface AnchorHTMLAttributes<T> extends HTMLAttributes<T> {
    [key: string]: any;
  }
  export interface SVGProps<T> {
    [key: string]: any;
  }
}

// Add JSX namespace to fix "JSX element implicitly has type 'any'" errors
declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
      h3: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
      h4: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
      p: React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>
      span: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>
      ul: React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>
      li: React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>
      a: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>
      svg: React.SVGProps<SVGSVGElement>
      path: React.SVGProps<SVGPathElement>
    }
  }
}

export default function CaseStudy() {
  const { theme } = useTheme()
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h3 className={`text-2xl font-bold ${
          theme === 'dark' ? 'text-[#ccd6f6]' : 'text-gray-900'
        }`}>
          Bellabeat Case Study: Fitness Data Analysis
        </h3>
        <div className="flex flex-wrap gap-2">
          {['Python', 'Data Analysis', 'Pandas', 'Matplotlib', 'Seaborn'].map((tech, index) => (
            <span
              key={index}
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
      </div>
      
      {/* Content */}
      <div className={theme === 'dark' ? 'text-[#8892b0]' : 'text-gray-700'}>
        <div className="mb-6">
          <h4 className={`text-lg font-semibold mb-2 ${
            theme === 'dark' ? 'text-[#ccd6f6]' : 'text-gray-800'
          }`}>Summary</h4>
          <p className="mb-4">
            This case study analyzes Fitbit fitness tracker data to gain insights for Bellabeat, a health-focused tech company for women.
            The analysis explores smart device usage patterns to inform marketing strategy decisions.
          </p>
          <p className="mb-4">
            Using Python with libraries like Pandas, Matplotlib, and Seaborn, I analyzed various fitness metrics including
            activity levels, sleep patterns, and usage frequency to identify trends and opportunities.
          </p>
        </div>
        
        <div className="mb-6">
          <h4 className={`text-lg font-semibold mb-2 ${
            theme === 'dark' ? 'text-[#ccd6f6]' : 'text-gray-800'
          }`}>Key Findings</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li>Users are most active between 5PM and 7PM, suggesting optimal times for engagement</li>
            <li>Weekday activity levels are higher than on weekends</li>
            <li>Strong correlation between steps taken and calories burned</li>
            <li>Most users are lightly active throughout the day</li>
            <li>Average sleep duration is less than recommended health guidelines</li>
          </ul>
        </div>
        
        <div className="mb-6">
          <h4 className={`text-lg font-semibold mb-2 ${
            theme === 'dark' ? 'text-[#ccd6f6]' : 'text-gray-800'
          }`}>Data Visualizations</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className="relative w-full h-64 bg-gray-50 dark:bg-gray-800">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`text-center p-4 ${theme === 'dark' ? 'text-[#8892b0]' : 'text-gray-600'}`}>
                    <svg 
                      className={`w-12 h-12 mx-auto mb-3 ${theme === 'dark' ? 'text-[#64ffda]' : 'text-blue-500'}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <p className="font-medium">Activity data visualization</p>
                    <p className="text-sm mt-1">Shows that users are most active between 5-7PM on weekdays</p>
                  </div>
                </div>
              </div>
              <p className={`text-center py-2 border-t ${
                theme === 'dark' ? 'border-gray-700 bg-[#112240] text-[#8892b0]' : 'border-gray-200 bg-gray-50 text-gray-600'
              }`}>
                Activity Levels by Hour of Day
              </p>
            </div>
            
            <div className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className="relative w-full h-64 bg-gray-50 dark:bg-gray-800">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`text-center p-4 ${theme === 'dark' ? 'text-[#8892b0]' : 'text-gray-600'}`}>
                    <svg 
                      className={`w-12 h-12 mx-auto mb-3 ${theme === 'dark' ? 'text-[#64ffda]' : 'text-blue-500'}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    </svg>
                    <p className="font-medium">Sleep data visualization</p>
                    <p className="text-sm mt-1">Shows that average sleep duration is below recommended guidelines</p>
                  </div>
                </div>
              </div>
              <p className={`text-center py-2 border-t ${
                theme === 'dark' ? 'border-gray-700 bg-[#112240] text-[#8892b0]' : 'border-gray-200 bg-gray-50 text-gray-600'
              }`}>
                Sleep Duration Distribution
              </p>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className={`text-lg font-semibold mb-2 ${
            theme === 'dark' ? 'text-[#ccd6f6]' : 'text-gray-800'
          }`}>Recommendations</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li>Develop features encouraging activity during peak usage times (5-7PM)</li>
            <li>Implement sleep tracking features with guidance for better sleep hygiene</li>
            <li>Create weekend activity challenges to boost engagement during typically less active days</li>
            <li>Design notification systems optimized for times when users are most responsive</li>
          </ul>
        </div>
        
        <div>
          <h4 className={`text-lg font-semibold mb-2 ${
            theme === 'dark' ? 'text-[#ccd6f6]' : 'text-gray-800'
          }`}>Tools & Techniques</h4>
          <p>Python, Pandas for data manipulation, Matplotlib and Seaborn for data visualization, statistical analysis for correlation detection.</p>
          <div className="mt-4">
            <a 
              href="https://www.kaggle.com/code/sambah29/bellabeat-case-study-using-python" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`inline-flex items-center px-4 py-2 rounded-lg border transition-colors ${
                theme === 'dark'
                  ? 'border-[#64ffda] text-[#64ffda] hover:bg-[#64ffda]/10'
                  : 'border-blue-500 text-blue-600 hover:bg-blue-50'
              }`}
            >
              View Full Case Study on Kaggle
            </a>
          </div>
        </div>
      </div>
    </div>
  )
} 