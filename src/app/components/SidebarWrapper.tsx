"use client";

import Sidebar from "./Sidebar";
import { usePathname } from "next/navigation";

export default function SidebarWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Only show sidebar on the root path (resume page)
  const showSidebar = pathname === '/';
  
  return (
    <div className="flex min-h-screen w-full">
      {showSidebar && <Sidebar />}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
} 