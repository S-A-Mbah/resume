import type { Metadata } from "next";
import "./globals.css";
import ClientNavbar from "./components/ClientNavbar";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Weather Dashboard | Resume",
  description: "Real-time weather information with location search and detailed forecasts",
};

// This is now a nested layout that will operate within the projects layout
export default function WeatherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Providers>
        <ClientNavbar />
        <div className="min-h-screen">
          {children}
        </div>
      </Providers>
    </div>
  );
}
