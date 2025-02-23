"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const pricingPlans = [
  { name: "Basic", price: "$10/month", features: ["5 Interviews", "AI Feedback"] },
  { name: "Pro", price: "$30/month", features: ["Unlimited Interviews", "AI & HR Feedback"] },
  { name: "Enterprise", price: "$50/month", features: ["Custom Features", "Dedicated Support"] },
];

function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const router = useRouter();

  const handleUpgrade = (plan) => {
    setSelectedPlan(plan.name);
    router.push(`/pricing/upgrade?plan=${plan.name}`);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-white">
      {/* Background Visuals */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-500 opacity-30 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-purple-500 opacity-30 blur-3xl animate-pulse"></div>
      </div>

      <h2 className="text-5xl font-extrabold text-center bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent z-10">
        Choose Your Plan
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 px-5 z-10">
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={index}
            className={`relative border p-8 h-96 flex flex-col justify-between rounded-xl shadow-lg text-center transition-all duration-300 
              ${selectedPlan === plan.name ? "bg-blue-900/90 border-blue-500 shadow-xl scale-105" : "bg-gray-800/80 border-gray-700"}
            `}
            whileHover={{ scale: 1.1, y: -5 }}
          >
            {selectedPlan === plan.name && (
              <motion.div
                className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-xs px-3 py-1 rounded-full shadow-md"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Selected
              </motion.div>
            )}
            <h3 className="text-3xl font-semibold">{plan.name}</h3>
            <p className="text-2xl font-bold text-gray-200 my-2">{plan.price}</p>
            <ul className="text-md text-gray-300 space-y-3">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center justify-center space-x-2">
                  ✅ {feature}
                </li>
              ))}
            </ul>
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button
                className="mt-5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white w-full py-3 text-lg rounded-lg shadow-lg"
                onClick={() => handleUpgrade(plan)}
              >
                Upgrade
              </Button>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Pricing;
