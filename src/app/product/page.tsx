"use client";

import React from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import {
  ShieldCheck,
  Code2,
  Zap,
  Cpu,
  Lock,
  BarChart3,
  ChevronRight,
  Terminal,
  Activity,
  Database
} from "lucide-react";
import Link from "next/link";

const TekverProductPage = () => {
  return (
    <main className="bg-[#020E20] text-white font-['Inter'] antialiased selection:bg-[#22D3EE] selection:text-[#020E20]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-32 px-8 overflow-hidden">
        {/* Cinematic Background Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#22D3EE]/10 blur-[150px] rounded-full -mr-48 -mt-48 animate-pulse"></div>
        <div className="absolute top-1/4 left-0 w-1 h-64 bg-gradient-to-b from-transparent via-[#22D3EE]/20 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="z-10">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-md border border-[#22D3EE]/20 bg-[#22D3EE]/5 text-[11px] uppercase tracking-[0.2em] font-bold text-[#22D3EE] mb-8">
              <Database size={14} /> NVIDIA H100 Tensor Core Architecture
            </div>
            <h1 className="text-6xl md:text-[5.5rem] font-black leading-[0.85] mb-8 tracking-tighter uppercase">
              Verify with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22D3EE] via-blue-400 to-cyan-200">
                Infinite Depth.
              </span>
            </h1>

            <p className="text-slate-400 text-lg md:text-xl max-w-xl mb-12 leading-relaxed font-light">
              Precision-engineered AI for critical code analysis. Deploy faster with
              <span className="text-white font-semibold"> mathematically proven </span>
              software security and performance intelligence.
            </p>
            
            <div className="flex flex-wrap gap-6">
              <a href="https://app.tekverai.com/" target="_blank" className="bg-[#22D3EE] text-[#020E20] px-12 py-5 rounded-sm font-black uppercase tracking-widest text-sm hover:shadow-[0_0_40px_rgba(34,211,238,0.5)] transition-all flex items-center gap-3 group">
                Start Verification <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="/#live-review" className="bg-transparent border border-slate-700 text-white px-10 py-5 rounded-sm font-black uppercase tracking-widest text-sm hover:bg-white hover:text-[#020E20] transition-all">
                Platform Tour
              </a>
            </div>
          </div>

          {/* Hero Right Side: The "Core Visual" */}
          <div className="relative flex justify-center items-center">
            {/* Rotating Outer Ring */}
            <div className="absolute w-[120%] h-[120%] border border-[#22D3EE]/10 rounded-full animate-[spin_20s_linear_infinite]"></div>
            <div className="absolute w-[100%] h-[100%] border-t-2 border-[#22D3EE]/30 rounded-full animate-[spin_10s_linear_infinite]"></div>

            {/* Central AI Entity Visual */}
            <div className="relative z-10 w-full aspect-square max-w-[500px] bg-gradient-to-b from-slate-900 to-[#020E20] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
              <div className="p-4 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50"></div>
                </div>
                <span className="text-[10px] font-mono text-slate-500 tracking-widest uppercase">System_Verify_Active</span>
              </div>
              
              <div className="flex-1 p-8 font-mono text-sm relative">
                {/* Simulated AI Scan Lines */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#22D3EE]/5 to-transparent h-20 w-full animate-[scan_4s_ease-in-out_infinite] pointer-events-none"></div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[#22D3EE]">
                    <Terminal size={14} />
                    <span className="animate-pulse">Analyzing logic path v2.04...</span>
                  </div>
                  <div className="pl-6 border-l border-slate-800 space-y-2 text-slate-400 text-xs">
                    <p className="text-white">{"{ integrity: '99.98%', latency: '1.2ms' }"}</p>
                    <p>{">"} checking memory bounds...</p>
                    <p className="text-cyan-400">{">"} SUCCESS: No leak detected.</p>
                    <p>{">"} mapping data flow...</p>
                  </div>

                  <div className="bg-slate-950/80 p-4 border border-slate-800 rounded flex items-center gap-4">
                    <Activity size={24} className="text-[#22D3EE]" />
                    <div className="flex-1 h-1.5 bg-slate-900 rounded-full overflow-hidden">
                      <div className="h-full bg-[#22D3EE] w-[85%]"></div>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-600 uppercase text-center mt-8 tracking-[0.3em]">H100 Tensor Core Optimized Inference</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Infrastructure Section (Grid) */}
      <section className="py-24 px-8 border-y border-slate-900 bg-slate-950/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { label: "AI Engine", val: "NVIDIA NeMo" },
              { label: "Optimization", val: "TensorRT" },
              { label: "Compute", val: "AWS P5 (H100)" },
              { label: "Validation", val: "CUDA Parallel" },
            ].map((item, i) => (
              <div key={i} className="text-center group cursor-default">
                <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-2 group-hover:text-[#22D3EE] transition-colors">
                  {item.label}
                </p>
                <p className="text-xl font-black italic tracking-tighter">{item.val}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Features */}
      <section className="py-32 px-10 max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter">System Intelligence</h2>
          <div className="w-20 h-1 bg-[#22D3EE]"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-[1px] bg-slate-800 border border-slate-800">
          {features.map((f, i) => (
            <div key={i} className="bg-[#020E20] p-12 hover:bg-slate-900/50 transition-all">
              <div className="mb-8">{f.icon}</div>
              <h3 className="text-xl font-bold mb-4 tracking-tight uppercase">{f.title}</h3>
              <p className="text-slate-400 leading-relaxed font-light text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Justification / Tech Details Section */}
      <section className="py-32 px-8 bg-gradient-to-b from-transparent to-slate-950">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-[#22D3EE] font-bold text-xs uppercase tracking-[0.4em] mb-6">
            Mathematically Proven Security
          </h3>
          <p className="text-2xl md:text-3xl font-light text-slate-300 leading-relaxed italic">
            "By utilizing NVIDIA Triton Inference Server, we ensure{" "}
            <span className="text-white font-medium">ultra-low latency code analysis</span> and high throughput for
            enterprise-scale software environments."
          </p>
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        @keyframes scan {
          0%,
          100% {
            transform: translateY(0);
            opacity: 0;
          }
          50% {
            transform: translateY(200px);
            opacity: 1;
          }
        }
      `}</style>
    </main>
  );
};

const features = [
  {
    icon: <Code2 className="text-[#22D3EE]" size={28} />,
    title: "AI Code Analysis",
    desc: "NVIDIA NeMo powered transformer models that analyze developer inputs and system logic for structured insights.",
  },
  {
    icon: <Lock className="text-[#22D3EE]" size={28} />,
    title: "Secure Validation",
    desc: "Automated identification of security vulnerabilities and anomaly detection in application logic.",
  },
  {
    icon: <Zap className="text-[#22D3EE]" size={28} />,
    title: "Low Latency",
    desc: "Optimized inference using NVIDIA TensorRT ensuring real-time feedback during the development cycle.",
  },
  {
    icon: <BarChart3 className="text-[#22D3EE]" size={28} />,
    title: "Predictive Debugging",
    desc: "Accelerated parallel processing via CUDA for large-scale embedding generation and syntax modeling.",
  },
  {
    icon: <Cpu className="text-[#22D3EE]" size={28} />,
    title: "H100 Optimization",
    desc: "Mixed-precision training and optimized attention mechanisms for complex software datasets.",
  },
  {
    icon: <ShieldCheck className="text-[#22D3EE]" size={28} />,
    title: "System Diagnostics",
    desc: "Verifying system configurations and dependencies to ensure high-performance deployments.",
  },
];

export default TekverProductPage;
