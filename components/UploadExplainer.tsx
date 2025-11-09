// ...existing code...
import { CheckCircle, DollarSign, Zap } from "lucide-react";

const features = [
  {
    id: 1,
    icon: "zap",
    title: "60 Second Analysis",
    description: "Instant compliance checking",
  },
  {
    id: 2,
    icon: "dollar",
    title: "80% Cost Savings",
    description: "$499 vs $15,000 consultants",
  },
  {
    id: 3,
    icon: "check",
    title: "FDA Compliant",
    description: "Based on official guidance",
  },
];

export default function UploadExplainer() {
  return (
    <section className="max-w-7xl mx-auto  px-6 py-16">
      <div className="grid  lg:gap-12">
        <div className="lg:pr-8">
          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900 mb-6">
            Accelerate Your FDA Submission
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl">
            AI-powered compliance checking for 510(k) submissions. Get instant
            feedback in minutes, not weeks. Save thousands in consultant fees.
          </p>
        </div>

        <div className="mt-10 lg:mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-start">
            {features.map((f) => (
              <div
                key={f.id}
                className="group relative flex flex-col items-start w-full p-6 bg-linear-to-br from-white via-indigo-50 to-white rounded-2xl shadow-md border border-transparent hover:shadow-xl hover:-translate-y-2 transform transition-all duration-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-200 min-h-[200px]"
                role="article"
                aria-labelledby={`feature-${f.id}-title`}
              >
                <div className="mb-4 flex items-center justify-center">
                  {f.icon === "zap" && (
                    <Zap
                      size={48}
                      className="text-indigo-500"
                      aria-hidden="true"
                    />
                  )}
                  {f.icon === "dollar" && (
                    <DollarSign
                      size={48}
                      className="text-indigo-500"
                      aria-hidden="true"
                    />
                  )}
                  {f.icon === "check" && (
                    <div className="w-14 h-14 rounded-full bg-indigo-500 flex items-center justify-center">
                      <CheckCircle
                        size={28}
                        className="text-white"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                </div>

                <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-2">
                  {f.title}
                </h3>
                <p className="text-sm lg:text-base text-gray-500">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
