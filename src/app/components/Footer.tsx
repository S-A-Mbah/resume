"use client"

import { motion } from "framer-motion"
import { useTheme } from "../context/ThemeContext"
import { useUserProfile } from "../context/UserContext"
import { 
  GithubIcon, 
  LinkedinIcon, 
  TwitterIcon, 
  MailIcon 
} from "lucide-react"

export default function Footer() {
  const { theme } = useTheme()
  const { userProfile } = useUserProfile()
  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/S-A-Mbah",
      icon: GithubIcon
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/sa-mbah/",
      icon: LinkedinIcon
    },
    {
      name: "Email",
      url: "mailto:donaldmbah@gmail.com",
      icon: MailIcon
    }
  ]

  return (
    <footer className="w-full py-4">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center space-y-2">
          <div className="flex space-x-4">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-1.5 rounded-lg transition-colors ${
                  theme === 'dark'
                    ? 'text-[#8892b0] hover:text-[#64ffda]'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <link.icon size={18} />
              </motion.a>
            ))}
          </div>

          <p className={`text-xs ${
            theme === 'dark' ? 'text-[#8892b0]' : 'text-gray-500'
          }`}>
            © {new Date().getFullYear()} {userProfile.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

