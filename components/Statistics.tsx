"use client";
import { useFileUpload } from "@/lib/hooks/useUpload";
import {
  AlertCircle,
  AlertTriangle,
  ArrowDownToLine,
  BrushCleaning,
  Calendar,
  Clock,
  Flag,
  Heart,
  Lightbulb,
  ListChecks,
  Microscope,
  Percent,
  PrinterCheck,
  Scale,
  Search,
  Tag,
  Target,
  TestTube,
  TrendingUp,
} from "lucide-react";
import StatisticsSkelton from "./Skeltons";

const sections = [
  {
    title: "Device Description",
    icon: Heart,
    score: "85/100",
    level: "LOW",
    color: "green",
    text: "Section is well-documented with comprehensive device specifications. Minor improvements can enhance clarity on technical specifications.",
    recommendations: [
      "Add more detail on materials composition (specific polymers used)",
      "Include dimensional specifications with tolerances",
      "Reference applicable ISO standards for device classification",
    ],
  },
  {
    title: "Intended Use",
    icon: Target,
    score: "92/100",
    level: "LOW",
    color: "green",
    text: "Excellent description of intended use and indications. Clear patient population definition and usage scenarios provided.",
    recommendations: [
      "Consider adding contraindications section",
      "Specify age range for intended patient population",
    ],
  },
  {
    title: "Substantial Equivalence",
    icon: Scale,
    score: "MISSING",
    level: "CRITICAL",
    color: "red",
    text: "CRITICAL: Substantial Equivalence section is completely missing. This is required per 21 CFR 807.87.",
    recommendations: [
      "Identify predicate device: Find a legally marketed device with same intended use",
      "Comparison table: Create side-by-side comparison of technological characteristics",
      "Performance data: Demonstrate equivalent or better performance compared to predicate",
      "Cite predicate 510(k): Include predicate K-number and clearance date",
      'Review FDA guidance: "The 510(k) Program: Evaluating Substantial Equivalence"',
    ],
  },
  {
    title: "Performance Testing",
    icon: TestTube,
    score: "58/100",
    level: "MEDIUM",
    color: "amber",
    text: "Basic testing data provided but missing several critical test protocols. Bench testing results incomplete.",
    recommendations: [
      "Add shelf-life testing data (accelerated aging per ASTM F1980)",
      "Include sterilization validation protocol and results",
      "Add mechanical durability testing (fatigue, stress testing)",
      "Provide statistical analysis of test results (mean, SD, confidence intervals)",
      "Reference applicable consensus standards (ISO 10993, ISO 14971)",
    ],
  },
  {
    title: "Labeling",
    icon: Tag,
    score: "78/100",
    level: "LOW",
    color: "green",
    text: "Labeling section adequately addresses key requirements. Instructions for use and warnings are present.",
    recommendations: [
      "Ensure all warnings comply with 21 CFR 801 requirements",
      "Add storage conditions and expiration dating to label",
      "Include symbols explanation per ISO 15223-1",
    ],
  },
  {
    title: "Biocompatibility",
    icon: Microscope,
    score: "MISSING",
    level: "CRITICAL",
    color: "red",
    text: "CRITICAL: Biocompatibility section is missing. For devices with patient contact, this is required per ISO 10993-1.",
    recommendations: [
      "Risk assessment: Conduct biological evaluation per ISO 10993-1",
      "Testing required: Cytotoxicity, sensitization, irritation (minimum for limited contact)",
      "Extended contact: If 24 hours contact, add systemic toxicity, genotoxicity testing",
      "Material characterization: Provide chemical characterization of patient-contacting materials",
      'Review FDA guidance: "Use of ISO 10993-1 for Medical Devices"',
    ],
  },
];

export default function Statistics() {
  // simple SVG donut for the overall score (62)
  const score = 62;
  const circumference = 2 * Math.PI * 36;
  const offset = circumference - (score / 100) * circumference;

  const { isAnalyzing } = useFileUpload();

  if (isAnalyzing) return <StatisticsSkelton />;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-secondary rounded-[10px]">
      <div className="rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-8 bg-white">
          {/* Top statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="flex flex-col items-center bg-gray-50 rounded-xl p-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-sky-100 text-sky-600 mb-3">
                <ListChecks size={18} className="text-sky-600" />
              </div>
              <div className="text-2xl font-semibold text-slate-800">4/6</div>
              <div className="text-sm text-slate-500">Sections Found</div>
            </div>

            <div className="flex flex-col items-center bg-gray-50 rounded-xl p-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-3">
                <Percent size={18} className="text-emerald-600" />
              </div>
              <div className="text-2xl font-semibold text-slate-800">66.7%</div>
              <div className="text-sm text-slate-500">Completeness</div>
            </div>

            <div className="flex flex-col items-center bg-gray-50 rounded-xl p-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-100 text-red-600 mb-3">
                <AlertTriangle size={18} className="text-red-600" />
              </div>
              <div className="text-2xl font-semibold text-red-600">2</div>
              <div className="text-sm text-slate-500">Critical Issues</div>
            </div>

            <div className="flex flex-col items-center bg-gray-50 rounded-xl p-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 mb-3">
                <Clock size={18} className="text-gray-600" />
              </div>
              <div className="text-2xl font-semibold text-slate-800">47s</div>
              <div className="text-sm text-slate-500">Analysis Time</div>
            </div>
          </div>

          {/* Main report */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="col-span-1 flex flex-col items-center justify-center bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
              <div className="relative">
                <svg width="120" height="120" viewBox="0 0 120 120" aria-hidden>
                  <defs>
                    <linearGradient id="g1" x1="0" x2="1">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="60"
                    cy="60"
                    r="36"
                    stroke="#f1f5f9"
                    strokeWidth="10"
                    fill="none"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="36"
                    stroke="url(#g1)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    transform="rotate(-90 60 60)"
                    fill="none"
                  />
                  <text
                    x="60"
                    y="66"
                    textAnchor="middle"
                    fontSize="26"
                    fill="#0f172a"
                    fontWeight={700}
                  >
                    {score}
                  </text>
                </svg>
              </div>
              <div className="mt-4 text-slate-800 font-semibold text-center">
                Overall Compliance Score
              </div>
            </div>

            <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
              <h3 className="text-slate-800 text-xl font-bold mb-3 flex items-center gap-3">
                <TrendingUp size={18} className="text-sky-600" />
                Compliance Report
              </h3>
              <div className="text-slate-600 mb-3">
                Your submission needs improvements. Focus on the highlighted
                sections. Critical gaps identified in Substantial Equivalence
                and Biocompatibility sections.
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3">
                  <BrushCleaning size={16} className="text-slate-500" />
                  <div className="text-slate-700">
                    <div className="text-sm font-semibold">Estimated Work</div>
                    <div className="text-xs text-slate-500">4 hours</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3">
                  <Calendar size={16} className="text-slate-500" />
                  <div className="text-slate-700">
                    <div className="text-sm font-semibold">Target Date</div>
                    <div className="text-xs text-slate-500">Nov 24, 2024</div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="text-slate-800 font-semibold mb-2 flex items-center gap-2">
                  <Flag size={16} className="text-amber-500" />
                  Priority Actions
                </div>
                <ul className="list-disc list-inside text-slate-600 space-y-1">
                  <li>Complete Substantial Equivalence section</li>
                  <li>Add Biocompatibility testing data</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section-by-section */}
          <div className="space-y-4">
            {sections.map((s) => {
              const borderColor =
                s.color === "red"
                  ? "border-red-500"
                  : s.color === "amber"
                  ? "border-amber-400"
                  : "border-emerald-400";
              const badgeBg =
                s.color === "red"
                  ? "bg-red-600"
                  : s.color === "amber"
                  ? "bg-amber-500"
                  : "bg-emerald-600";
              const Icon = s.icon;

              return (
                <div
                  key={s.title}
                  className={`rounded-2xl bg-white border-l-4 ${borderColor} p-5 shadow-sm`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-slate-700 text-lg">
                        <Icon size={40} className="text-slate-700" />
                      </div>
                      <div>
                        <div className="text-slate-900 font-semibold text-lg">
                          {s.title}
                        </div>
                        <div className="text-slate-600 text-sm mt-1">
                          {s.text}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${badgeBg} text-white font-semibold`}
                      >
                        {s.score}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${badgeBg} text-white/95`}
                      >
                        {s.level}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="text-slate-800 font-semibold mb-2 flex items-center gap-2">
                      <Lightbulb size={16} className="text-yellow-400" />
                      Recommendations
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-slate-600">
                      {s.recommendations.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>

                  {s.level === "CRITICAL" && (
                    <div className="mt-4 bg-red-50 border border-red-100 rounded-lg p-3 text-red-700 flex items-center gap-3">
                      <AlertCircle size={18} className="text-red-700" />
                      <div className="text-sm">
                        <strong className="font-semibold">
                          FDA Requirement:
                        </strong>{" "}
                        {s.title === "Substantial Equivalence"
                          ? "You must demonstrate substantial equivalence to a legally marketed predicate device."
                          : "Biocompatibility evaluation required for devices with direct or indirect patient contact."}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <button className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white cursor-pointer border border-gray-200 text-slate-700 hover:shadow transition">
              <PrinterCheck size={16} /> Print Report
            </button>

            <button className="inline-flex cursor-pointer items-center gap-2 px-5 py-3 rounded-lg bg-white border border-gray-200 text-slate-700 hover:shadow transition">
              <ArrowDownToLine size={16} /> Download PDF
            </button>

            <button className="inline-flex cursor-pointer items-center gap-2 px-5 py-3 rounded-lg bg-sky-600 text-white font-semibold hover:bg-sky-700 transition">
              <Search size={16} /> Analyze Another Document
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
