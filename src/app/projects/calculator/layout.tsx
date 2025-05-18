import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculator | Resume",
  description: "Interactive calculator with BODMAS rule support and calculation history",
};

// This is now a nested layout that will operate within the projects layout
export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
} 