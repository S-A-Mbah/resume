"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { useTheme } from "../context/ThemeContext"
import { useUserProfile } from "../context/UserContext"

export default function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const { userProfile } = useUserProfile()

  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY && !isHovering) {
        setIsOpen(false)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY, isHovering])

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Skills", href: "#skills" },
    { name: "Education", href: "#education" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
  ]

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    const href = e.currentTarget.href
    const targetId = href.replace(/.*#/, "")
    const elem = document.getElementById(targetId)
    
    // Disable all animations before scrolling
    document.querySelectorAll('[data-framer-animation]').forEach((el) => {
      (el as HTMLElement).style.opacity = '1'
      el.removeAttribute('data-framer-animation')
    })
    
    elem?.scrollIntoView({
      behavior: "smooth",
    })
    setIsHovering(false)
    setIsOpen(false)
  }

  // Handle mouse enter for the sidebar and its hover area
  const handleMouseEnter = () => {
    setIsHovering(true)
    setIsOpen(true)
  }

  // Handle mouse leave
  const handleMouseLeave = () => {
    setIsHovering(false)
    setIsOpen(false)
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 h-full z-50"
        initial={false}
        animate={{ width: isOpen ? '16rem' : '1rem' }}
        transition={{ duration: 0.2 }}
      >
        {/* Visible indicator when collapsed */}
        {!isOpen && (
          <div 
            className={`h-full w-full ${
              theme === 'dark' 
                ? 'bg-gradient-to-r from-[#64ffda]/15 to-transparent cursor-pointer' 
                : 'bg-gradient-to-r from-blue-500/15 to-transparent cursor-pointer'
            }`}
            onMouseEnter={handleMouseEnter}
          />
        )}
        
        <motion.div
          className={`h-full w-64 bg-gradient-to-b ${
            theme === 'dark' 
              ? 'from-[#0a192f] to-[#112240]' 
              : 'from-white to-gray-100'
          } shadow-lg border-r ${
            theme === 'dark'
              ? 'border-[#64ffda]/10'
              : 'border-blue-200/50'
          } absolute top-0 left-0`}
          initial={false}
          animate={{ 
            x: isOpen ? 0 : -240,
            opacity: isOpen ? 1 : 0
          }}
          transition={{ duration: 0.2 }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="p-6">
            <h1 className={`text-2xl font-bold mb-8 ${
              theme === 'dark' ? 'text-[#ccd6f6]' : 'text-gray-900'
            }`}>
              {userProfile.name}
            </h1>
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={handleScroll}
                    className={`block py-2 px-4 rounded transition duration-200 ${
                      pathname === item.href 
                        ? theme === 'dark'
                          ? 'bg-[#64ffda]/10 text-[#64ffda]'
                          : 'bg-blue-600 text-white'
                        : theme === 'dark'
                          ? 'text-[#8892b0] hover:bg-[#64ffda]/10 hover:text-[#64ffda]'
                          : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <motion.button
            onClick={toggleTheme}
            className={`absolute bottom-8 left-6 right-6 p-3 rounded-lg flex items-center justify-center space-x-2 ${
              theme === 'dark'
                ? 'bg-[#64ffda]/10 text-[#64ffda] hover:bg-[#64ffda]/20'
                : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
            } transition-colors duration-300`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-xl">
              {theme === 'dark' ? '🌙' : '☀️'}
            </span>
            <span className="font-medium">
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Hover trigger area - wider area for easier hovering */}
      {!isOpen && (
        <div
          className="fixed top-0 left-0 w-8 h-full z-40 cursor-pointer"
          onMouseEnter={handleMouseEnter}
        />
      )}
    </>
  )
}

