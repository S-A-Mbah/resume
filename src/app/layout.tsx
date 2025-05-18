import "./globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from './context/ThemeContext'
import { UserProfileProvider } from './context/UserContext'
import SidebarWrapper from './components/SidebarWrapper'
import MetadataUpdater from './components/MetadataUpdater'

export const metadata: Metadata = {
  title: "Professional Portfolio",
  description: "Professional portfolio and resume",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <UserProfileProvider>
          <ThemeProvider>
            <MetadataUpdater />
            <SidebarWrapper>
              {children}
            </SidebarWrapper>
          </ThemeProvider>
        </UserProfileProvider>
      </body>
    </html>
  )
}

