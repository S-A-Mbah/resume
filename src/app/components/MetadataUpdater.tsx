"use client"

import { useEffect } from 'react'
import { useUserProfile } from '../context/UserContext'

export default function MetadataUpdater() {
  const { userProfile } = useUserProfile()

  useEffect(() => {
    // Update the document title with the user's actual name
    document.title = `${userProfile.name} - Professional Portfolio`
  }, [userProfile.name])

  // This component doesn't render anything
  return null
} 