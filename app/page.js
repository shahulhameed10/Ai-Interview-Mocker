"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Rocket, Mic, BrainCircuit, CalendarCheck } from "lucide-react";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white">
      {/* Hero Section */}
      <div className="text-center mt-20 space-y-6">
        <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
          AI-Powered Mock Interviews 🚀
        </h1>
        <p className="text-lg text-gray-300 max-w-lg mx-auto">
          Get real-time AI feedback, improve your responses, and ace your dream job interview with confidence.
        </p>
        <Button 
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 text-lg rounded-full shadow-lg transition-all"
          onClick={() => router.push("/dashboard")}
        >
          Start Practicing
        </Button>
      </div>

      {/* Features Section */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 px-5">
        <FeatureCard 
          Icon={Mic} 
          title="Voice Analysis"
          description="Improve your speech with real-time voice and tone analysis."
        />
        <FeatureCard 
          Icon={BrainCircuit} 
          title="AI Feedback"
          description="Get intelligent feedback on your responses and skills."
        />
        <FeatureCard 
          Icon={CalendarCheck} 
          title="Interview Scheduling"
          description="Schedule mock interviews with AI or HR professionals."
        />
      </div>

    </div>
  );
}

// Feature Card Component
function FeatureCard({ Icon, title, description }) {
  return (
    <div className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-lg rounded-lg shadow-md border border-gray-700">
      <Icon className="w-12 h-12 text-cyan-400" />
      <h3 className="text-xl font-semibold mt-4">{title}</h3>
      <p className="text-gray-400 text-center mt-2">{description}</p>
    </div>
  );
}
