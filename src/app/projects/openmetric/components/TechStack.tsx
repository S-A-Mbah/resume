"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../../context/ThemeContext";
import { useState } from "react";

interface TechItem {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: React.ReactNode;
}

const techStack: TechItem[] = [
  { id: "airflow", name: "Apache Airflow", category: "Orchestration", description: "DAG-based workflow scheduling", icon: <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg> },
  { id: "python", name: "Python", category: "Compute", description: "Pandas/Polars for data manipulation", icon: <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="9" cy="6" r="1" fill="currentColor" /><circle cx="15" cy="18" r="1" fill="currentColor" /><path d="M12 2c-1.7 0-3 .8-3 2.5v3c0 1.7-1.3 2.5-3 2.5H4v4c0 1.7 1.3 3 3 3h10c1.7 0 3-1.3 3-3v-2h-2c-1.7 0-3-.8-3-2.5v-5c0-1.7-1.3-2.5-3-2.5z" /></svg> },
  { id: "dbt", name: "dbt", category: "Transform", description: "SQL transformations with testing", icon: <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6" /><path d="M10 13l-2 2 2 2" /><path d="M14 13l2 2-2 2" /></svg> },
  { id: "s3", name: "AWS S3", category: "Storage", description: "Scalable object storage", icon: <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16v16H4z" rx="2" /><path d="M4 12h16" /><path d="M12 4v16" /></svg> },
  { id: "bigquery", name: "BigQuery", category: "Warehouse", description: "Serverless data warehouse", icon: <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg> },
  { id: "ge", name: "Great Expectations", category: "Quality", description: "Data validation framework", icon: <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" /></svg> },
  { id: "docker", name: "Docker", category: "Container", description: "Containerized deployments", icon: <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="10" width="4" height="4" /><rect x="7" y="10" width="4" height="4" /><rect x="12" y="10" width="4" height="4" /><rect x="7" y="5" width="4" height="4" /><rect x="12" y="5" width="4" height="4" /></svg> },
  { id: "terraform", name: "Terraform", category: "IaC", description: "Infrastructure as code", icon: <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 6l6 3v7l-6-3V6z" /><path d="M9 3l6 3v7l-6-3V3z" /><path d="M16 6l6 3v7l-6-3V6z" /><path d="M9 14l6 3v7l-6-3v-7z" /></svg> },
];

const categoryColors: Record<string, { bg: string; border: string; text: string }> = {
  Orchestration: { bg: "bg-orange-500/10", border: "border-orange-500/30", text: "text-orange-400" },
  Compute: { bg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-400" },
  Transform: { bg: "bg-purple-500/10", border: "border-purple-500/30", text: "text-purple-400" },
  Storage: { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-400" },
  Warehouse: { bg: "bg-yellow-500/10", border: "border-yellow-500/30", text: "text-yellow-400" },
  Quality: { bg: "bg-green-500/10", border: "border-green-500/30", text: "text-green-400" },
  Container: { bg: "bg-cyan-500/10", border: "border-cyan-500/30", text: "text-cyan-400" },
  IaC: { bg: "bg-pink-500/10", border: "border-pink-500/30", text: "text-pink-400" },
};

export default function TechStack() {
  const { theme } = useTheme();
  const [selectedTech, setSelectedTech] = useState<TechItem | null>(null);
  const [filterCategory, setFilterCategory] = useState("all");

  const categories = ["all", ...new Set(techStack.map(t => t.category))];
  const filteredTech = filterCategory === "all" ? techStack : techStack.filter(t => t.category === filterCategory);

  return (
    <div className={`p-4 sm:p-6 rounded-xl ${theme === "dark" ? "bg-[#0a192f]/50" : "bg-gray-50"}`}>
      {/* Header - Stack on mobile */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 mb-4 sm:mb-6">
        <h3 className={`text-lg sm:text-xl font-semibold ${theme === "dark" ? "text-[#ccd6f6]" : "text-gray-900"}`}>Technology Stack</h3>
        
        {/* Category filters - Scrollable on mobile */}
        <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`flex-shrink-0 px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs rounded-full capitalize transition-all whitespace-nowrap ${
                filterCategory === cat
                  ? theme === "dark" ? "bg-[#64ffda] text-[#0a192f]" : "bg-blue-600 text-white"
                  : theme === "dark" ? "bg-[#112240] text-[#8892b0] border border-[#64ffda]/10" : "bg-white text-gray-600 border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid - 2 columns on mobile, 4 on desktop */}
      <motion.div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4" layout>
        <AnimatePresence mode="popLayout">
          {filteredTech.map((tech) => {
            const colors = categoryColors[tech.category];
            return (
              <motion.div
                key={tech.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`p-3 sm:p-4 rounded-lg border cursor-pointer ${colors.border} ${theme === "dark" ? "bg-[#112240]" : "bg-white"} ${selectedTech?.id === tech.id ? "ring-2 " + (theme === "dark" ? "ring-[#64ffda]" : "ring-blue-500") : ""}`}
                onClick={() => setSelectedTech(selectedTech?.id === tech.id ? null : tech)}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className={`p-1.5 sm:p-2 rounded-lg ${colors.bg} ${colors.text} flex-shrink-0`}>{tech.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-medium text-xs sm:text-sm truncate ${theme === "dark" ? "text-[#ccd6f6]" : "text-gray-900"}`}>{tech.name}</h4>
                    <span className={`text-[10px] sm:text-xs ${colors.text}`}>{tech.category}</span>
                  </div>
                </div>
                <p className={`mt-2 text-[10px] sm:text-xs line-clamp-2 ${theme === "dark" ? "text-[#8892b0]" : "text-gray-600"}`}>{tech.description}</p>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
