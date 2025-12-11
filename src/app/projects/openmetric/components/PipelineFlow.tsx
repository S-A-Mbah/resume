"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../../context/ThemeContext";
import { useState, useCallback, useEffect } from "react";

interface PipelineNode {
  id: string;
  label: string;
  sublabel?: string;
  icon: React.ReactNode;
  layer: "source" | "bronze" | "silver" | "gold" | "viz";
  description: string;
  metrics: { label: string; value: string }[];
  status: "idle" | "running" | "success" | "error";
}

const createInitialNodes = (): PipelineNode[] => [
  {
    id: "coingecko", label: "CoinGecko", sublabel: "Crypto Data", layer: "source",
    description: "Fetches real-time cryptocurrency prices and market data via REST API.",
    metrics: [{ label: "API Status", value: "Checking..." }, { label: "Endpoint", value: "/api/v3" }, { label: "Rate Limit", value: "10-30/min" }],
    status: "idle",
    icon: <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>,
  },
  {
    id: "reddit", label: "Reddit", sublabel: "Sentiment", layer: "source",
    description: "Scrapes cryptocurrency subreddits for sentiment analysis.",
    metrics: [{ label: "Source", value: "r/crypto" }, { label: "Method", value: "API" }, { label: "Frequency", value: "Hourly" }],
    status: "idle",
    icon: <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><circle cx="9" cy="10" r="1" fill="currentColor" /><circle cx="15" cy="10" r="1" fill="currentColor" /></svg>,
  },
  {
    id: "airflow", label: "Airflow", sublabel: "Orchestration", layer: "bronze",
    description: "Manages DAG scheduling and task dependencies.",
    metrics: [{ label: "Scheduler", value: "Active" }, { label: "Workers", value: "Auto-scale" }, { label: "Schedule", value: "*/5 *" }],
    status: "idle",
    icon: <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>,
  },
  {
    id: "s3", label: "S3", sublabel: "Bronze", layer: "bronze",
    description: "Raw data lake storing JSON and Parquet files.",
    metrics: [{ label: "Format", value: "Parquet" }, { label: "Compression", value: "Snappy" }, { label: "Partitioned", value: "Yes" }],
    status: "idle",
    icon: <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16v16H4z" /><path d="M4 12h16" /><path d="M12 4v16" /></svg>,
  },
  {
    id: "dbt", label: "dbt", sublabel: "Transform", layer: "silver",
    description: "SQL-based transformations with testing and documentation.",
    metrics: [{ label: "Framework", value: "dbt-core" }, { label: "Tests", value: "Enabled" }, { label: "Docs", value: "Auto-gen" }],
    status: "idle",
    icon: <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6" /></svg>,
  },
  {
    id: "ge", label: "GE", sublabel: "Quality", layer: "silver",
    description: "Validates data quality with automated checkpoints.",
    metrics: [{ label: "Engine", value: "GX Core" }, { label: "Mode", value: "Automated" }, { label: "Alerts", value: "Slack" }],
    status: "idle",
    icon: <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" /></svg>,
  },
  {
    id: "warehouse", label: "BigQuery", sublabel: "Gold", layer: "gold",
    description: "Analytical data warehouse with pre-aggregated tables.",
    metrics: [{ label: "Engine", value: "BigQuery" }, { label: "Tier", value: "On-demand" }, { label: "Cache", value: "Enabled" }],
    status: "idle",
    icon: <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>,
  },
  {
    id: "streamlit", label: "Streamlit", sublabel: "Dashboard", layer: "viz",
    description: "Interactive dashboard with real-time charts.",
    metrics: [{ label: "Framework", value: "Streamlit" }, { label: "Hosting", value: "Cloud" }, { label: "Auth", value: "OAuth" }],
    status: "idle",
    icon: <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" /></svg>,
  },
];

const layerColors: Record<string, { bg: string; border: string; text: string }> = {
  source: { bg: "bg-purple-500/20", border: "border-purple-500", text: "text-purple-400" },
  bronze: { bg: "bg-amber-500/20", border: "border-amber-500", text: "text-amber-400" },
  silver: { bg: "bg-slate-400/20", border: "border-slate-400", text: "text-slate-300" },
  gold: { bg: "bg-yellow-500/20", border: "border-yellow-500", text: "text-yellow-400" },
  viz: { bg: "bg-emerald-500/20", border: "border-emerald-500", text: "text-emerald-400" },
};

interface PipelineFlowProps {
  onPipelineRun?: (logs: string[]) => void;
}

export default function PipelineFlow({ onPipelineRun }: PipelineFlowProps) {
  const { theme } = useTheme();
  const [nodes, setNodes] = useState<PipelineNode[]>(createInitialNodes);
  const [selectedNode, setSelectedNode] = useState<PipelineNode | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);


  // Check CoinGecko API status on mount
  const checkApiStatus = useCallback(async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/ping');
      if (response.ok) {
        // Update the CoinGecko node with live status
        setNodes(prev => prev.map(n => 
          n.id === "coingecko" 
            ? { ...n, metrics: [{ label: "API Status", value: "✓ Online" }, { label: "Endpoint", value: "/api/v3" }, { label: "Rate Limit", value: "10-30/min" }] }
            : n
        ));
      } else {
        setNodes(prev => prev.map(n => 
          n.id === "coingecko" 
            ? { ...n, metrics: [{ label: "API Status", value: "✗ Offline" }, { label: "Endpoint", value: "/api/v3" }, { label: "Rate Limit", value: "10-30/min" }] }
            : n
        ));
      }
    } catch {
      // API unreachable
    }
  }, []);

  // Check API status on component mount
  useEffect(() => {
    checkApiStatus();
  }, [checkApiStatus]);

  const runPipeline = useCallback(async () => {
    if (isRunning) return;
    setIsRunning(true);
    setLogs([]);
    setProgress(0);
    setSelectedNode(null);
    setNodes(createInitialNodes());
    
    const newLogs: string[] = [];
    const timestamp = () => new Date().toISOString().split('T')[1].slice(0, 8);

    // Stage 1: Fetch real data from CoinGecko
    setProgress(0);
    setNodes(prev => prev.map((n, idx) => ({ ...n, status: idx === 0 ? "running" : "idle" })));
    newLogs.push(`${timestamp()} [INFO] Connecting to CoinGecko API...`);
    setLogs([...newLogs]);
    
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_vol=true');
      if (response.ok) {
        const data = await response.json();
        const btcPrice = data.bitcoin?.usd?.toLocaleString() || 'N/A';
        const ethPrice = data.ethereum?.usd?.toLocaleString() || 'N/A';
        newLogs.push(`${timestamp()} [SUCCESS] BTC: $${btcPrice} | ETH: $${ethPrice}`);
      } else {
        newLogs.push(`${timestamp()} [WARNING] API returned status ${response.status}`);
      }
    } catch {
      newLogs.push(`${timestamp()} [ERROR] API connection failed`);
    }
    setLogs([...newLogs]);
    setNodes(prev => prev.map((n, idx) => ({ ...n, status: idx === 0 ? "success" : "idle" })));
    setProgress(12.5);
    await new Promise(r => setTimeout(r, 300));

    // Stages 2-8: Simulate remaining pipeline steps with realistic messages
    const pipelineSteps = [
      { nodeIdx: 1, messages: ["[INFO] Processing sentiment data...", "[SUCCESS] Sentiment analysis complete"] },
      { nodeIdx: 2, messages: ["[INFO] Triggering Airflow DAG...", "[SUCCESS] DAG execution started"] },
      { nodeIdx: 3, messages: ["[INFO] Writing to S3 data lake...", "[SUCCESS] Data persisted to bronze layer"] },
      { nodeIdx: 4, messages: ["[INFO] Running dbt transformations...", "[SUCCESS] Silver layer models refreshed"] },
      { nodeIdx: 5, messages: ["[INFO] Executing quality checks...", "[SUCCESS] All validation gates passed"] },
      { nodeIdx: 6, messages: ["[INFO] Loading to BigQuery...", "[SUCCESS] Gold layer tables updated"] },
      { nodeIdx: 7, messages: ["[INFO] Refreshing dashboard...", "[SUCCESS] Visualizations updated"] },
    ];

    for (let i = 0; i < pipelineSteps.length; i++) {
      const step = pipelineSteps[i];
      setNodes(prev => prev.map((n, idx) => ({ 
        ...n, 
        status: idx === step.nodeIdx ? "running" : idx < step.nodeIdx ? "success" : "idle" 
      })));

      for (const msg of step.messages) {
        newLogs.push(`${timestamp()} ${msg}`);
        setLogs([...newLogs]);
        await new Promise(r => setTimeout(r, 250));
      }

      setNodes(prev => prev.map((n, idx) => ({ ...n, status: idx <= step.nodeIdx ? "success" : "idle" })));
      setProgress(((i + 2) / 8) * 100);
      await new Promise(r => setTimeout(r, 100));
    }

    newLogs.push(`${timestamp()} [SUCCESS] ✅ Pipeline completed successfully!`);
    setLogs([...newLogs]);
    if (onPipelineRun) onPipelineRun(newLogs);
    setIsRunning(false);
    
    // Reset after 8 seconds
    setTimeout(() => { setNodes(createInitialNodes()); setProgress(0); checkApiStatus(); }, 8000);
  }, [isRunning, onPipelineRun, checkApiStatus]);

  const getStatusIndicator = (status: string) => {
    if (status === "running") return <motion.div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded-full" animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 0.8 }} />;
    if (status === "success") return <motion.div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full flex items-center justify-center" initial={{ scale: 0 }} animate={{ scale: 1 }}><svg className="w-2 h-2 sm:w-3 sm:h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M5 13l4 4L19 7" /></svg></motion.div>;
    return null;
  };

  return (
    <div className={`p-4 sm:p-6 rounded-xl ${theme === "dark" ? "bg-[#0a192f]/50" : "bg-gray-50"}`}>
      {/* Header - Stack on mobile */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
        <h3 className={`text-lg sm:text-xl font-semibold ${theme === "dark" ? "text-[#ccd6f6]" : "text-gray-900"}`}>
          Data Pipeline Architecture
        </h3>
        
        <motion.button
          onClick={runPipeline}
          disabled={isRunning}
          className={`w-full sm:w-auto px-4 py-2.5 sm:py-2 rounded-lg font-medium flex items-center justify-center gap-2 text-sm sm:text-base ${
            isRunning
              ? theme === "dark" ? "bg-[#64ffda]/20 text-[#64ffda]" : "bg-blue-100 text-blue-400"
              : theme === "dark" ? "bg-[#64ffda] text-[#0a192f]" : "bg-blue-600 text-white"
          }`}
          whileHover={!isRunning ? { scale: 1.02 } : {}}
          whileTap={!isRunning ? { scale: 0.98 } : {}}
        >
          {isRunning ? (
            <>
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
              </motion.div>
              Running...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              Run Pipeline Demo
            </>
          )}
        </motion.button>
      </div>

      {/* Progress Bar */}
      {progress > 0 && (
        <motion.div className={`mb-4 sm:mb-6 rounded-full h-1.5 sm:h-2 ${theme === "dark" ? "bg-[#112240]" : "bg-gray-200"}`}>
          <motion.div className={`h-full rounded-full ${theme === "dark" ? "bg-[#64ffda]" : "bg-blue-500"}`} animate={{ width: `${progress}%` }} />
        </motion.div>
      )}

      {/* Pipeline Nodes - Horizontal scroll on mobile, wrap on tablet+ */}
      <div className="relative">
        {/* Mobile: Horizontal scroll */}
        <div className="flex gap-2 sm:gap-3 py-4 sm:py-6 overflow-x-auto pb-6 sm:pb-8 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center lg:justify-between">
          {/* Connecting line - hidden on mobile */}
          <div className={`hidden sm:block absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 ${theme === "dark" ? "bg-[#64ffda]/20" : "bg-blue-200"}`} />
          <motion.div className={`hidden sm:block absolute top-1/2 h-1 rounded-full -translate-y-1/2 ${theme === "dark" ? "bg-[#64ffda]" : "bg-blue-500"}`} style={{ left: 0 }} animate={{ width: `${progress}%` }} />

          {nodes.map((node, index) => {
            const colors = layerColors[node.layer];
            return (
              <motion.div key={node.id} className="relative z-10 flex-shrink-0">
                <motion.div
                  className={`relative flex flex-col items-center p-2 sm:p-3 rounded-lg border-2 ${colors.bg} ${colors.border} ${theme === "dark" ? "bg-[#112240]" : "bg-white"} cursor-pointer min-w-[70px] sm:min-w-[90px]`}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedNode(selectedNode?.id === node.id ? null : node)}
                  animate={{ boxShadow: node.status === "running" ? "0 0 15px rgba(100, 255, 218, 0.5)" : node.status === "success" ? "0 0 10px rgba(34, 197, 94, 0.3)" : "none" }}
                >
                  {getStatusIndicator(node.status)}
                  <div className={colors.text}>{node.icon}</div>
                  <span className={`mt-1.5 sm:mt-2 text-[10px] sm:text-xs font-medium text-center leading-tight ${theme === "dark" ? "text-[#ccd6f6]" : "text-gray-900"}`}>{node.label}</span>
                  <span className={`text-[8px] sm:text-[10px] ${theme === "dark" ? "text-[#8892b0]" : "text-gray-500"}`}>{node.sublabel}</span>
                </motion.div>
                {/* Arrow - hidden on mobile */}
                {index < nodes.length - 1 && (
                  <div className={`hidden sm:block absolute -right-2 top-1/2 -translate-y-1/2 ${node.status === "success" ? "text-green-400" : theme === "dark" ? "text-[#64ffda]/30" : "text-blue-300"}`}>
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z" /></svg>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
        
        {/* Mobile scroll indicator */}
        <div className="sm:hidden flex justify-center gap-1 mt-2">
          <span className={`text-[10px] ${theme === "dark" ? "text-[#8892b0]" : "text-gray-500"}`}>← Scroll →</span>
        </div>
      </div>

      {/* Node Details - Full width on mobile */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`mt-3 sm:mt-4 p-3 sm:p-4 rounded-lg border ${theme === "dark" ? "bg-[#112240] border-[#64ffda]/20" : "bg-white border-gray-200"}`}
          >
            <div className="flex justify-between items-start">
              <h4 className={`font-semibold text-sm sm:text-base ${theme === "dark" ? "text-[#ccd6f6]" : "text-gray-900"}`}>{selectedNode.label}</h4>
              <button onClick={() => setSelectedNode(null)} className="text-gray-400 hover:text-gray-600 p-1">✕</button>
            </div>
            <p className={`text-xs sm:text-sm mt-2 ${theme === "dark" ? "text-[#8892b0]" : "text-gray-600"}`}>{selectedNode.description}</p>
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-3 sm:mt-4">
              {selectedNode.metrics.map((m) => (
                <div key={m.label} className={`text-center p-1.5 sm:p-2 rounded ${theme === "dark" ? "bg-[#0a192f]" : "bg-gray-50"}`}>
                  <p className={`text-[10px] sm:text-xs ${theme === "dark" ? "text-[#8892b0]" : "text-gray-500"}`}>{m.label}</p>
                  <p className={`font-semibold text-xs sm:text-sm ${theme === "dark" ? "text-[#64ffda]" : "text-blue-600"}`}>{m.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logs - Compact on mobile */}
      {logs.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`mt-3 sm:mt-4 p-3 sm:p-4 rounded-lg font-mono text-[10px] sm:text-xs ${theme === "dark" ? "bg-[#0a0f18]" : "bg-gray-900"}`}>
          <div className="flex justify-between mb-2">
            <span className="text-gray-400 text-xs">Logs</span>
            <div className="flex gap-1"><div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500" /><div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500" /><div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500" /></div>
          </div>
          <div className="max-h-24 sm:max-h-32 overflow-y-auto space-y-0.5 sm:space-y-1">
            {logs.map((log, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className={log.includes("[SUCCESS]") ? "text-green-400" : "text-gray-300"}>{log}</motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Legend - Scrollable on mobile */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-4 sm:mt-6">
        {Object.entries(layerColors).map(([layer, colors]) => (
          <div key={layer} className="flex items-center gap-1 sm:gap-2">
            <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${colors.bg} border ${colors.border}`} />
            <span className={`text-[10px] sm:text-xs capitalize ${theme === "dark" ? "text-[#8892b0]" : "text-gray-600"}`}>{layer}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
