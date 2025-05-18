"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import Hero from "./components/Hero"
import Skills from "./components/Skills"
import Education from "./components/Education"
import Experience from "./components/Experience"
import Projects from "./components/Projects"
import Footer from "./components/Footer"
import { useTheme } from './context/ThemeContext'

export default function Home() {
  const { theme } = useTheme()
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Create a simple, reliable back-to-top button
    const createBackToTopButton = () => {
      // Create button element
      const button = document.createElement('button');
      button.textContent = '↑';
      button.id = 'back-to-top-button';
      
      // Style the button
      Object.assign(button.style, {
        position: 'fixed',
        zIndex: '99999',
        bottom: '30px',
        right: '30px',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: theme === 'dark' ? '#64ffda' : '#3B82F6',
        color: 'white',
        fontSize: '24px',
        border: 'none',
        boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
        cursor: 'pointer',
        display: 'none'
      });
      
      // Append to document
      document.body.appendChild(button);
      
      return button;
    };
    
    // Detect the actual scrollable container
    const detectScrollContainer = () => {
      // Array of potential scroll containers
      const containers = [
        window,
        document.documentElement,
        document.body,
        document.getElementById('__next'),
        mainRef.current
      ].filter(Boolean);
      
      // Try different approaches
      for (const container of containers) {
        if (container === window) continue; // Skip window as we'll use it as a fallback
        
        // For HTML elements
        if (container instanceof HTMLElement) {
          const cs = window.getComputedStyle(container);
          if (['scroll', 'auto'].includes(cs.overflowY) && container.scrollHeight > container.clientHeight) {
            console.log("Found scrollable container:", container);
            return container;
          }
        }
      }
      
      // Default to window if no specific container found
      console.log("Using window as scroll container");
      return window;
    };
    
    // Create the button
    const backToTopButton = createBackToTopButton();
    
    // Detect the scroll container
    const scrollContainer = detectScrollContainer();
    
    // Handle scroll event
    const handleScroll = () => {
      let scrollY = 0;
      
      if (scrollContainer === window) {
        scrollY = window.scrollY;
      } else if (scrollContainer instanceof HTMLElement) {
        scrollY = scrollContainer.scrollTop;
      }
      
      // Show/hide button based on scroll position
      if (scrollY > 100) {
        backToTopButton.style.display = 'block';
      } else {
        backToTopButton.style.display = 'none';
      }
    };
    
    // Handle button click
    const scrollToTop = () => {
      if (scrollContainer === window) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (scrollContainer instanceof HTMLElement) {
        scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    
    // Attach events
    backToTopButton.addEventListener('click', scrollToTop);
    
    if (scrollContainer === window) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    } else if (scrollContainer instanceof HTMLElement) {
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    }
    
    // Initial check
    handleScroll();
    
    // Clean up
    return () => {
      backToTopButton.removeEventListener('click', scrollToTop);
      
      if (scrollContainer === window) {
        window.removeEventListener('scroll', handleScroll);
      } else if (scrollContainer instanceof HTMLElement) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
      
      if (document.body.contains(backToTopButton)) {
        document.body.removeChild(backToTopButton);
      }
    };
  }, [theme]);

  // Scroll to section function
  const scrollToSection = (section: number) => {
    // Disable animations before scrolling
    document.querySelectorAll('[data-framer-animation]').forEach((el) => {
      (el as HTMLElement).style.opacity = '1'
      el.removeAttribute('data-framer-animation')
    })
    
    // Map section number to actual section ID
    let sectionId;
    switch(section) {
      case 1: sectionId = "skills"; break;
      case 2: sectionId = "education"; break;
      case 3: sectionId = "experience"; break;
      case 4: sectionId = "projects"; break;
      default: sectionId = "home";
    }
    
    const sectionElement = document.getElementById(sectionId)
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="relative w-screen overflow-x-hidden">
      <main 
        ref={mainRef}
        className={`w-full ${theme === 'dark' ? 'bg-[#0a192f]' : 'bg-white'}`}
      >
        <section id="home" className="min-h-screen w-full">
          <Hero scrollTo={scrollToSection} />
        </section>

        <section id="skills" className="w-full py-6">
          <Skills />
        </section>

        <section id="education" className="w-full py-6">
          <Education />
        </section>

        <section id="experience" className="w-full py-6">
          <Experience />
        </section>

        <section id="projects" className="w-full py-6">
          <Projects />
        </section>

        <Footer />
      </main>
    </div>
  )
}

