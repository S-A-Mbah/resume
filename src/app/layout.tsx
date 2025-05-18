import "./globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from './context/ThemeContext'
import { UserProfileProvider } from './context/UserContext'
import SidebarWrapper from './components/SidebarWrapper'

export const metadata: Metadata = {
  title: "Your Name - Professional Portfolio",
  description: "Professional portfolio and resume of Your Name",
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
            <SidebarWrapper>
              {children}
            </SidebarWrapper>
          </ThemeProvider>
        </UserProfileProvider>
      </body>
    </html>
  )
}

