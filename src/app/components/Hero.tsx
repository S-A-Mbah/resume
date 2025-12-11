"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "../context/ThemeContext"
import { useUserProfile } from "../context/UserContext"

// Add this interface at the top of your Hero component file
interface HeroProps {
  scrollTo: (page: number) => void;
}

// Update your Hero component declaration
const Hero = ({ scrollTo }: HeroProps) => {
  const { theme } = useTheme()
  const { userProfile } = useUserProfile()
  const [isFlipped, setIsFlipped] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  const navigationItems = [
    { name: "Explore Skills", section: 1 },
    { name: "View Education", section: 2 },
    { name: "See Experience", section: 3 },
    { name: "Check Projects", section: 4 },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDownloading, setIsDownloading] = useState(false)

  // Add a resize listener to detect mobile screens
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 700);
    };
    
    // Set initial value
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle resume download - Generate a proper ATS-friendly resume
  const handleDownloadResume = async () => {
    // Prevent multiple clicks
    if (isDownloading) return;
    
    // Set loading state
    setIsDownloading(true);
    
    // Create a timeout to ensure loading state resets even if the browser
    // download dialog is closed without completing the download
    const resetTimeout = setTimeout(() => {
      setIsDownloading(false);
    }, 10000); // 10-second safety timeout
    
    try {
      // Dynamically import jsPDF
      const { default: jsPDF } = await import('jspdf');
      
      // Use data from context instead of DOM
      const name = userProfile.name;
      const title = userProfile.title;
      
      // Create a new PDF document (text-based, not image-based)
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4'
      });
      
      // Set up document properties
      pdf.setProperties({
        title: `${name} Resume`,
        subject: 'Resume',
        author: name,
        keywords: 'resume, cv, job application',
        creator: 'Portfolio Resume Generator'
      });
      
      // Define page dimensions and margins
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 50;
      const contentWidth = pageWidth - (margin * 2);
      
      // Set up font sizes
      const fontSizes = {
        name: 18,
        section: 14,
        subsection: 12,
        normal: 10,
        small: 9
      };
      
      // Set up colors
      const colors = {
        primary: '#000000',
        secondary: '#444444',
        accent: '#666666'
      };
      
      // Set up initial Y position for content
      let yPos = margin;
      
      // Helper function to add text with proper wrapping
      const addWrappedText = (text: string, x: number, y: number, maxWidth: number, fontSize: number, fontStyle: string = 'normal'): number => {
        pdf.setFontSize(fontSize);
        pdf.setFont('helvetica', fontStyle);
        
        const lines = pdf.splitTextToSize(text, maxWidth);
        pdf.text(lines, x, y);
        
        return y + (lines.length * (fontSize * 1.15));
      };
      
      // Helper function to check and add a new page if needed
      const checkAndAddPage = (requiredSpace: number): boolean => {
        if (yPos + requiredSpace > pageHeight - margin) {
          pdf.addPage();
          yPos = margin;
          return true;
        }
        return false;
      };
      
      // Helper function to add a section heading
      const addSectionHeading = (title: string): void => {
        // Check if we need a new page for this section
        checkAndAddPage(fontSizes.section * 2);
        
        pdf.setFontSize(fontSizes.section);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(colors.primary);
        pdf.text(title.toUpperCase(), margin, yPos);
        
        yPos += fontSizes.section * 0.3;
        pdf.setDrawColor(0);
        pdf.line(margin, yPos, pageWidth - margin, yPos);
        
        yPos += fontSizes.section;
      };
      
      // HEADER SECTION
      // Add name
      pdf.setFontSize(fontSizes.name);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(colors.primary);
      pdf.text(name, margin, yPos);
      yPos += fontSizes.name + 4;
      
      // Add title
      pdf.setFontSize(fontSizes.subsection);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(colors.secondary);
      pdf.text(title, margin, yPos);
      yPos += fontSizes.subsection + 10;
      
      // Add contact info
      pdf.setFontSize(fontSizes.normal);
      pdf.setTextColor(colors.accent);
      const contactInfo = `Email: ${userProfile.email} | Phone: ${userProfile.phone} | Location: ${userProfile.location}`;
      const contactInfo2 = `LinkedIn: ${userProfile.linkedin} | GitHub: ${userProfile.github}`;
      
      pdf.text(contactInfo, margin, yPos);
      yPos += fontSizes.normal + 5;
      pdf.text(contactInfo2, margin, yPos);
      yPos += fontSizes.normal + 15;
      
      // PROFESSIONAL SUMMARY SECTION
      addSectionHeading('Professional Summary');
      
      // Add the professional summary with proper wrapping
      const summary = "Senior Data Engineer with 6+ years of expertise in Big Data Architecture and Full-Stack Development. Proven track record in designing scalable ETL/ELT pipelines using Apache Spark and Airflow, orchestrating containerized workloads with Kubernetes, and provisioning AWS Cloud Infrastructure (Redshift, EC2) via Terraform. Expert in Python, SQL, and React-based visualization to drive operational efficiency and business intelligence.";
      
      pdf.setFontSize(fontSizes.normal);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(colors.secondary);
      yPos = addWrappedText(summary, margin, yPos, contentWidth, fontSizes.normal);
      yPos += fontSizes.normal + 15;
      
      // SKILLS SECTION
      addSectionHeading('Skills');
      
      // Gather skills from the page
      interface SkillCategory {
        category: string;
        skills: string;
      }
      
      const skillsData: SkillCategory[] = [];
      const skillSections = document.querySelectorAll('#skills h3');
      
      if (skillSections && skillSections.length > 0) {
        for (const section of skillSections) {
          const category = section.textContent || '';
          const skillsList: string[] = [];
          
          const skillElements = section.parentElement?.querySelectorAll('div > div > div:nth-child(2) > span:nth-child(2)');
          if (skillElements && skillElements.length > 0) {
            for (const skill of skillElements) {
              if (skill.textContent) 
                skillsList.push(skill.textContent.trim());
            }
          }
          
          if (skillsList.length > 0) {
            skillsData.push({
              category,
              skills: skillsList.join(', ')
            });
          }
        }
      }
      
      // Use placeholder skills if none found
      if (skillsData.length === 0) {
        skillsData.push(
          { category: 'Programming Languages', skills: 'JavaScript, TypeScript, HTML, CSS, Python' },
          { category: 'Frameworks & Libraries', skills: 'React, Next.js, Vue.js, Node.js' },
          { category: 'Development & Integration', skills: 'RESTful APIs, Cloud Computing, Automation' },
          { category: 'AI & Analytics', skills: 'Data Analysis, Power BI, Prompt Engineering' }
        );
      }
      
      // Add skills to PDF
      for (const skill of skillsData) {
        checkAndAddPage(fontSizes.normal * 3);
        
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(fontSizes.normal);
        pdf.setTextColor(colors.primary);
        pdf.text(`${skill.category}: `, margin, yPos);
        
        const categoryWidth = pdf.getTextWidth(`${skill.category}: `);
        
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(colors.secondary);
        yPos = addWrappedText(
          skill.skills, 
          margin + categoryWidth, 
          yPos, 
          contentWidth - categoryWidth, 
          fontSizes.normal
        );
        yPos += 5;
      }
      
      yPos += 10;
      
      // EXPERIENCE SECTION
      addSectionHeading('Professional Experience');
      
      // Get experience data
      interface Experience {
        title: string;
        company: string;
        period: string;
        responsibilities: string[];
      }
      
      const experiences: Experience[] = [];
      
      // Get elements but ensure we don't include duplicates
      const experienceItems = document.querySelectorAll('#experience .relative.space-y-3, #experience .relative.group');
      const processedExperiences = new Set<string>(); // To track which experiences we've already processed
      
      if (experienceItems && experienceItems.length > 0) {
        for (const item of experienceItems) {
          const title = item.querySelector('h3')?.textContent?.trim() || '';
          const company = item.querySelector('p:nth-of-type(1)')?.textContent?.trim() || '';
          const period = item.querySelector('p:nth-of-type(2)')?.textContent?.trim() || '';
          
          // Create a unique identifier for this experience to avoid duplicates
          const experienceKey = `${title}-${company}-${period}`;
          
          // Skip if we've already processed this experience
          if (processedExperiences.has(experienceKey)) continue;
          processedExperiences.add(experienceKey);
          
          const responsibilities: string[] = [];
          const respElements = item.querySelectorAll('li span:last-child');
          
          if (respElements && respElements.length > 0) {
            for (const resp of respElements) {
              const respText = resp.textContent?.trim() || '';
              if (respText) {
                responsibilities.push(respText);
              }
            }
          }
          
          if (title && company) {
            experiences.push({
              title,
              company,
              period,
              responsibilities: responsibilities.length > 0 
                ? responsibilities 
                : ['Responsible for development and maintenance of web applications']
            });
          }
        }
      }
      
      // Use placeholder if no experience found
      if (experiences.length === 0) {
        experiences.push({
          title: 'Web Developer',
          company: 'Company Name',
          period: 'Jan 2021 - Present',
          responsibilities: [
            'Developed and maintained responsive web applications using React and Next.js',
            'Collaborated with team members to implement new features',
            'Optimized application performance and improved user experience'
          ]
        });
      }
      
      // Add experiences to PDF
      for (const exp of experiences) {
        // Check if we need a new page
        checkAndAddPage(fontSizes.subsection * 4 + (fontSizes.normal * 1.5 * exp.responsibilities.length));
        
        // Job title
        pdf.setFontSize(fontSizes.subsection);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(colors.primary);
        pdf.text(exp.title, margin, yPos);
        yPos += fontSizes.subsection + 5;
        
        // Company and period
        pdf.setFontSize(fontSizes.normal);
        pdf.setFont('helvetica', 'italic');
        pdf.setTextColor(colors.secondary);
        pdf.text(`${exp.company} | ${exp.period}`, margin, yPos);
        yPos += fontSizes.normal + 10;
        
        // Responsibilities
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(colors.secondary);
        
        for (const resp of exp.responsibilities) {
          // Check if we need a new page for each responsibility
          if (checkAndAddPage(fontSizes.normal * 3)) {
            // If we added a new page, add the job title and company again as a header
            pdf.setFontSize(fontSizes.small);
            pdf.setFont('helvetica', 'italic');
            pdf.text(`${exp.title} at ${exp.company} (continued)`, margin, yPos);
            yPos += fontSizes.small + 5;
            pdf.setFont('helvetica', 'normal');
          }
          
          // Add properly encoded bullet point
          pdf.text('\u2022', margin, yPos);
          
          // Add wrapped text for the responsibility
          yPos = addWrappedText(
            resp, 
            margin + 15, 
            yPos, 
            contentWidth - 15, 
            fontSizes.normal
          );
          yPos += 5;
        }
        
        yPos += 15;
      }
      // EDUCATION SECTION 
      addSectionHeading('Education');
      
      // Get education data
      interface Education {
        degree: string;
        minor: string;
        school: string;
        year: string;
      }
      
      const educations: Education[] = [];
      const educationItems = document.querySelectorAll('#education .relative.space-y-2, #education .relative.group');
      const processedEducations = new Set<string>();
      
      if (educationItems && educationItems.length > 0) {
        for (const item of educationItems) {
          const degree = item.querySelector('h3')?.textContent?.trim() || '';
          const school = item.querySelector('p:nth-of-type(2)')?.textContent?.trim() || '';
          
          // Create a unique identifier
          const educationKey = `${degree}-${school}`;
          
          // Skip if already processed
          if (processedEducations.has(educationKey)) continue;
          processedEducations.add(educationKey);
          
          const minor = item.querySelector('p:nth-of-type(1)')?.textContent?.trim() || '';
          const year = item.querySelector('p:nth-of-type(3)')?.textContent?.trim() || '';
          
          if (degree && school) {
            educations.push({ degree, minor, school, year });
          }
        }
      }
      
      // Use placeholder if no education found
      if (educations.length === 0) {
        educations.push({
          degree: 'B.Sc. Computer Science',
          minor: 'Minor in Statistics',
          school: 'University of Manitoba',
          year: '2014 - 2018'
        });
      }
      
      // Add education to PDF
      for (const edu of educations) {
        // Check if we need a new page
        checkAndAddPage(fontSizes.normal * 2);
        
        // Construct the single line string
        // Format: Degree, Minor | School | Year
        let educationLine = edu.degree;
        if (edu.minor) {
          educationLine += `, ${edu.minor}`;
        }
        educationLine += ` | ${edu.school}`;
        if (edu.year) {
          educationLine += ` | ${edu.year}`;
        }
        
        pdf.setFontSize(fontSizes.normal);
        pdf.setTextColor(colors.primary);
        
        // Use addWrappedText to handle potential wrapping on small screens/long text
        // Passing 'bold' to make it stand out as a header-like item, or 'normal' based on preference.
        // Given it's a list item, 'normal' or 'bold' works. Let's stick to 'normal' but maybe slightly larger or just regular?
        // The user didn't specify weight, but usually main info is bold. However, the request text "B.Sc. ... | ... | ..." looks like a standard line.
        // I will use 'bold' for the text to make it readable as a key item.
        yPos = addWrappedText(educationLine, margin, yPos, contentWidth, fontSizes.normal, 'bold');
        yPos += 10;
      }
      
      // PROJECTS SECTION 
      addSectionHeading('Projects');
      
      // Get projects data
      interface Project {
        title: string;
        description: string;
        technologies: string[];
        link?: string;
      }
      
      const projects: Project[] = [];
      const projectItems = document.querySelectorAll('#projects .relative.group');
      const processedProjects = new Set<string>();
      
      if (projectItems && projectItems.length > 0) {
        for (const item of projectItems) {
          const title = item.querySelector('h3')?.textContent?.trim() || '';
          
          // Skip duplicates
          if (processedProjects.has(title)) continue;
          processedProjects.add(title);
          
          const descriptionElement = item.querySelector('p');
          const description = descriptionElement?.textContent?.trim() || '';
          
          // Extract technologies
          const technologies: string[] = [];
          const techElements = item.querySelectorAll('.text-xs');
          if (techElements && techElements.length > 0) {
            for (const tech of techElements) {
              // Skip elements that contain image attribution text
              if (tech.textContent && !tech.textContent.includes('Icon by')) {
                technologies.push(tech.textContent.trim());
              }
            }
          }
          
          // Improved link extraction - find all links within the project card
          let link: string | undefined;
          const linkElements = item.querySelectorAll('a');
          if (linkElements && linkElements.length > 0) {
            // Try to get the first non-empty href
            for (const el of linkElements) {
              const href = el.getAttribute('href');
              // Skip GitHub links and use live project links instead
              if (href && href !== '#' && href !== '' && !href.includes('github.com')) {
                link = href;
                break;
              }
            }
          }
          
          // If no link found or link is just "#", create a default project link
          if (!link || link === '#') {
            // Convert project title to URL-friendly slug
            const slug = title.toLowerCase()
              .replace(/[^\w\s-]/g, '') // Remove special chars
              .replace(/\s+/g, '-')     // Replace spaces with hyphens
              .replace(/--+/g, '-')     // Replace multiple hyphens with single hyphen
              .replace(/-app$/, '')     // Remove "-app" suffix if present
              .replace(/-application$/, ''); // Remove "-application" suffix if present
            
            // Get the base name without any "-app" or "-application" suffix
            const baseName = slug
              .replace(/(weather|calculator|portfolio).*$/, '$1')
              .replace(/openmetric.*$/, 'openmetric');
            
            link = `/projects/${baseName}`;
          }
          
          if (title) {
            projects.push({
              title,
              description,
              technologies,
              link
            });
          }
        }
      }
      
      // Use placeholder if no projects found
      if (projects.length === 0) {
        projects.push(
          {
            title: 'Personal Portfolio Website',
            description: 'A responsive portfolio website built with React and Next.js',
            technologies: ['React', 'Next.js', 'TailwindCSS'],
            link: '/projects/personal-portfolio-website'
          },
          {
            title: 'Weather Application',
            description: 'A weather application that displays current weather conditions',
            technologies: ['JavaScript', 'APIs', 'CSS'],
            link: '/projects/weather'
          },
          {
            title: 'Calculator App',
            description: 'Interactive calculator with basic arithmetic operations and calculation history',
            technologies: ['JavaScript', 'HTML', 'CSS'],
            link: '/projects/calculator'
          }
        );
      }
      
      // Add projects to PDF
      for (const project of projects) {
        // Check if we need a new page
        checkAndAddPage(fontSizes.subsection * 3 + fontSizes.normal * 5);
        
        // Project title
        pdf.setFontSize(fontSizes.subsection);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(colors.primary);
        pdf.text(project.title, margin, yPos);
        yPos += fontSizes.subsection + 5;
        
        // Description
        if (project.description) {
          pdf.setFontSize(fontSizes.normal);
          pdf.setFont('helvetica', 'normal');
          pdf.setTextColor(colors.secondary);
          yPos = addWrappedText(project.description, margin, yPos, contentWidth, fontSizes.normal);
          yPos += fontSizes.normal;
        }
        
        // Technologies
        if (project.technologies.length > 0) {
          pdf.setFontSize(fontSizes.normal);
          pdf.setFont('helvetica', 'italic');
          pdf.setTextColor(colors.accent);
          pdf.text(`Technologies: ${project.technologies.join(', ')}`, margin, yPos);
          yPos += fontSizes.normal + 5;
        }
        
        // Link if available - now all projects should have a link
        if (project.link) {
          pdf.setFontSize(fontSizes.normal);
          pdf.setTextColor(colors.accent);
          
          // Check if this is an external link (starts with http:// or https://)
          const isExternalLink = project.link.startsWith('http://') || project.link.startsWith('https://');
          
          // Use the full URL as-is for external links, or prepend origin for relative links
          const fullLink = isExternalLink ? project.link : `${window.location.origin}${project.link}`;
          
          pdf.text(`Link: ${fullLink}`, margin, yPos);
          yPos += fontSizes.normal + 10;
        } else {
          yPos += 10; // Add some spacing even if no link
        }
      }
      
      // Save the PDF with a clean filename
      pdf.save(`${name.replace(/\s+/g, '_')}_Resume.pdf`);
      
      // Add a small delay to ensure the download dialog has appeared
      // before we reset the loading state
      setTimeout(() => {
        clearTimeout(resetTimeout);
        setIsDownloading(false);
      }, 500);
      
    } catch {
      alert('There was a problem generating your resume. Please try again.');
      clearTimeout(resetTimeout);
      setIsDownloading(false);
    }
  };

  // Handle phone number copy
  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(userProfile.phone)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error('Failed to copy phone number:', err)
    }
  }

  // Handle email click
  const handleEmailClick = () => {
    window.location.href = `mailto:${userProfile.email}`
  }

  // Get current visible items (3 at a time on desktop, 1 on mobile)
  const getVisibleItems = () => {
    const items = []
    if (isMobile) {
      // For mobile, only return the current item
      items.push(navigationItems[currentIndex])
    } else {
      // For desktop, keep the existing behavior (3 items)
      for (let i = 0; i < 3; i++) {
        const index = (currentIndex + i) % navigationItems.length
        items.push(navigationItems[index])
      }
    }
    return items
  }

  // Auto cycle through items
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % navigationItems.length)
    }, 10000)

    return () => clearInterval(timer)
  }, [navigationItems.length])

  // Animation variants for staggered children
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    },
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % navigationItems.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + navigationItems.length) % navigationItems.length)
  }

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen relative">
      <div className={`absolute inset-0 ${
        theme === 'dark'
          ? 'bg-gradient-to-b from-[#0a192f] to-[#112240]'
          : 'bg-gradient-to-b from-white to-gray-100'
      }`} />
      
      {/* Download Resume Button */}
      <motion.button
        className={`absolute z-20 transition-colors duration-300
          ${isMobile ? 'top-2 right-2 px-2 py-1 text-xs' : 'top-6 right-6 px-4 py-2'} 
          rounded-full flex items-center shadow-md ${
          theme === 'dark'
            ? 'bg-[#64ffda] text-[#0a192f] hover:bg-[#4fd1b2]'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
        onClick={handleDownloadResume}
        whileHover={{ scale: isDownloading ? 1 : 1.05 }}
        whileTap={{ scale: isDownloading ? 1 : 0.95 }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          backgroundColor: isDownloading 
            ? theme === 'dark' ? '#4fd1b2' : '#3b82f6' 
            : undefined
        }}
        transition={{ delay: 0.5 }}
        disabled={isDownloading}
        aria-busy={isDownloading}
      >
        <div className="relative flex items-center">
          {isDownloading ? (
            /* Loading Spinner with more reliable animation */
            <svg 
              className={`animate-spin ${isMobile ? 'h-3 w-3 mr-1' : 'h-5 w-5 mr-2'} text-current`}
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
              />
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : (
            /* Download Icon */
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`${isMobile ? 'h-3 w-3 mr-1' : 'h-5 w-5 mr-2'}`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
              />
            </svg>
          )}
          <span className={`${isMobile ? 'text-xs' : 'text-base'}`}>
            {isDownloading ? (isMobile ? 'Loading...' : 'Generating...') : 'Download Resume' }
          </span>
        </div>
      </motion.button>
      
      <motion.div
        className="text-center relative z-10 w-full max-w-4xl mx-auto"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div
          className="relative group mb-8 perspective-1000"
          variants={item}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <div className={`absolute -inset-0.5 rounded-full blur opacity-20 group-hover:opacity-30 transition ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-[#64ffda] to-[#64ffda]'
              : 'bg-gradient-to-r from-blue-500 to-blue-600'
          }`} />
          
          {/* Flip Card Container */}
          <div 
            className={`relative w-[200px] h-[200px] mx-auto transition-transform duration-500 transform-style-3d ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            {/* Front of Card */}
            <div className={`absolute w-full h-full backface-hidden rounded-full overflow-hidden ${
              isFlipped ? 'hidden' : 'block'
            }`}>
              <Image
                src="/profile-pic.jpeg"
                alt={userProfile.name}
                width={200}
                height={200}
                className={`relative rounded-full border-2 shadow-lg transition-transform duration-300 ${
                  theme === 'dark'
                    ? 'border-[#64ffda]/20'
                    : 'border-blue-500/20'
                } ${isHovered ? 'scale-105' : 'scale-100'}`}
                priority
              />
              {/* Hover Overlay */}
              <div 
                className={`absolute inset-0 rounded-full flex items-center justify-center transition-opacity duration-300 cursor-pointer ${
                  theme === 'dark' 
                    ? 'bg-[#0a192f]/80 text-[#64ffda]' 
                    : 'bg-white/80 text-blue-600'
                } ${isHovered ? 'opacity-100' : 'opacity-0'}`}
              >
                <div className="text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                    transition={{ duration: 0.2 }}
                    className="font-medium text-lg mb-1"
                  >
                    Get In Touch
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                    className={`text-sm ${
                      theme === 'dark' ? 'text-[#8892b0]' : 'text-gray-600'
                    }`}
                  >
                    Click to view contact info
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Back of Card */}
            <div className={`absolute w-full h-full backface-hidden rounded-full ${
              theme === 'dark' ? 'bg-[#112240]' : 'bg-white'
            } border-2 shadow-lg ${
              theme === 'dark'
                ? 'border-[#64ffda]/20'
                : 'border-blue-500/20'
            } ${isFlipped ? 'block' : 'hidden'} rotate-y-180 cursor-pointer`}>
              <div className="flex flex-col items-center justify-center h-full p-4 space-y-4">
                {/* Phone Number */}
                <div className="flex items-center space-x-2">
                  <svg 
                    className={`w-5 h-5 ${theme === 'dark' ? 'text-[#64ffda]' : 'text-blue-500'}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                    />
                  </svg>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleCopyPhone()
                    }}
                    className={`text-sm font-medium hover:underline ${
                      theme === 'dark' ? 'text-[#8892b0]' : 'text-gray-600'
                    }`}
                  >
                    {userProfile.phone}
                  </button>
                  {copySuccess && (
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`text-xs ${
                        theme === 'dark' ? 'text-[#64ffda]' : 'text-blue-500'
                      }`}
                    >
                      Copied!
                    </motion.span>
                  )}
                </div>

                {/* Email */}
                <div className="flex items-center space-x-2">
                  <svg 
                    className={`w-5 h-5 ${theme === 'dark' ? 'text-[#64ffda]' : 'text-blue-500'}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                    />
                  </svg>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleEmailClick()
                    }}
                    className={`text-sm font-medium hover:underline ${
                      theme === 'dark' ? 'text-[#8892b0]' : 'text-gray-600'
                    }`}
                  >
                    {userProfile.email}
                  </button>
                </div>

                {/* Flip Back Hint */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`text-xs ${
                    theme === 'dark' ? 'text-[#64ffda]/70' : 'text-blue-500/70'
                  }`}
                >
                  Click to flip back
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          variants={item}
          className="space-y-3 mb-10"
        >
          <motion.h1
            variants={item}
            className={`text-6xl font-bold ${
              theme === 'dark' ? 'text-[#ccd6f6]' : 'text-gray-900'
            }`}
          >
            {userProfile.name}
          </motion.h1>
          
          <motion.p
            variants={item}
            className={theme === 'dark' ? 'text-[#8892b0]' : 'text-gray-600'}
          >
            {userProfile.title}
          </motion.p>

          {/* Professional Summary */}
          <motion.div
            variants={item}
            className={`max-w-3xl mx-auto mt-6 px-4 ${
              theme === 'dark' ? 'text-[#8892b0]' : 'text-gray-600'
            }`}
          >
            <p className="text-lg leading-relaxed">
              Senior Data Engineer with 6+ years of expertise in Big Data Architecture and Full-Stack Development. Proven track record in designing scalable ETL/ELT pipelines using Apache Spark and Airflow, orchestrating containerized workloads with Kubernetes, and provisioning AWS Cloud Infrastructure (Redshift, EC2) via Terraform. Expert in Python, SQL, and React-based visualization to drive operational efficiency and business intelligence.
            </p>
          </motion.div>
        </motion.div>
        
        <motion.div
          variants={item}
          className="flex justify-center items-center space-x-3 max-w-2xl mx-auto px-4"
        >
          {/* Previous Button */}
          <motion.button
            onClick={handlePrev}
            className={`p-2 rounded-full ${
              theme === 'dark'
                ? 'text-[#64ffda] hover:bg-[#64ffda]/10'
                : 'text-blue-600 hover:bg-blue-50'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </motion.button>

          {/* Carousel Items - Responsive container */}
          <div className={`relative flex items-center justify-center overflow-hidden ${
            // Use a fixed width container in both mobile and desktop to prevent movement
            isMobile ? 'w-[180px]' : 'min-w-[600px]'
          }`}>
            <AnimatePresence mode="sync">
              {getVisibleItems().map((navItem) => (
                <motion.button
                  key={`${navItem.name}-${currentIndex}`}
                  initial={{ 
                    opacity: 0, 
                    x: isMobile ? 50 : 20
                  }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                  }}
                  exit={{ 
                    opacity: 0, 
                    x: isMobile ? -50 : -20,
                  }}
                  transition={{ 
                    duration: 0.4,
                    ease: "easeInOut"
                  }}
                  onClick={() => scrollTo(navItem.section)}
                  className={`relative mx-2 inline-flex items-center px-4 sm:px-6 py-2 text-sm sm:text-base font-medium rounded-full 
                    border transition-colors duration-300 whitespace-nowrap ${
                      theme === 'dark'
                        ? 'text-[#64ffda] border-[#64ffda] hover:bg-[#64ffda]/10'
                        : 'text-blue-600 border-blue-500 hover:bg-blue-50'
                    }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {navItem.name}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>

          {/* Next Button */}
          <motion.button
            onClick={handleNext}
            className={`p-2 rounded-full ${
              theme === 'dark'
                ? 'text-[#64ffda] hover:bg-[#64ffda]/10'
                : 'text-blue-600 hover:bg-blue-50'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Next"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.button>
        </motion.div>

        <motion.div 
          variants={item}
          className="flex justify-center space-x-2 mt-4"
        >
          {navigationItems.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors duration-120 ${
                index === currentIndex 
                  ? theme === 'dark' ? 'bg-[#64ffda]' : 'bg-blue-500'
                  : theme === 'dark' ? 'bg-[#64ffda]/30' : 'bg-blue-200'
              }`}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Hero;

