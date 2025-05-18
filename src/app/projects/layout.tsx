import type { Metadata } from "next";
import { ThemeProvider } from "../context/ThemeContext";

export const metadata: Metadata = {
  title: "Projects | Resume",
  description: "Interactive projects showcasing development skills",
};

// This layout will be used for all pages under /projects and will NOT include the sidebar
export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full">
      {children}
    </div>
  );
} 