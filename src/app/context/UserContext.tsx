"use client"

import { createContext, useContext, useState, ReactNode } from 'react'

// Define the shape of the user profile data
interface UserProfile {
  name: string
  title: string
  email: string
  phone: string
  location: string
  linkedin: string
  github: string
}

// Define the context type
interface UserContextType {
  userProfile: UserProfile
  updateUserProfile: (profile: Partial<UserProfile>) => void
}

// Create the context with undefined default value
const UserContext = createContext<UserContextType | undefined>(undefined)

// Create the provider component
export function UserProfileProvider({ children }: { children: ReactNode }) {
  // Default user profile data
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Somto A. Mbah',
    title: 'Senior Data Engineer & Developer',
    email: 'donaldmbah@gmail.com',
    phone: '(204) 995-6190',
    location: 'Canada',
    linkedin: 'https://www.linkedin.com/in/sa-mbah/',
    github: 'https://github.com/S-A-Mbah',
  })

  // Function to update user profile data
  const updateUserProfile = (profile: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...profile }))
    
    // Optional: save to localStorage for persistence
    const updatedProfile = { ...userProfile, ...profile }
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile))
  }

  // Load from localStorage on initialization (would be in useEffect in a real app)
  // This is simplified for brevity - normally would be in a useEffect

  return (
    <UserContext.Provider value={{ userProfile, updateUserProfile }}>
      {children}
    </UserContext.Provider>
  )
}

// Custom hook to use the user profile context
export function useUserProfile() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUserProfile must be used within a UserProfileProvider')
  }
  return context
} 