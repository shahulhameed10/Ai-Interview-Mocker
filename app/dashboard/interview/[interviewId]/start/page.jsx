"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";  // Import Router
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";

const QuestionssSection = dynamic(() => import("./_components/QuestionssSection"), { ssr: false });
const RecordAnswerSection = dynamic(() => import("./_components/RecordAnswerSection"), { ssr: false });

function StartInterview() {
  const params = useParams();
  const router = useRouter(); // Initialize Router
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState(null);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    if (params?.interviewId) {
      GetInterviewDetails(params.interviewId);
    }
  }, [params]);

  const GetInterviewDetails = async (interviewId) => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, interviewId));

      if (!result.length || !result[0]?.jsonMockResp) {
        console.warn("No interview data found or jsonMockResp is empty.");
        return;
      }

      const jsonMockResp = JSON.parse(result[0].jsonMockResp);
      setMockInterviewQuestion([...jsonMockResp]);
      setInterviewData(result[0]);
    } catch (error) {
      console.error("Error fetching or parsing interview data:", error);
    }
  };

  // Navigate to Feedback Page
  const handleEndInterview = () => {
    router.push(`/dashboard/interview/${interviewData?.mockId}/feedback`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Left Side: Questions */}
      <QuestionssSection mockInterviewQuestion={mockInterviewQuestion} activeQuestionIndex={activeQuestionIndex} />

      {/* Right Side: Camera + Recording + Buttons */}
      <div className="flex flex-col items-center relative">
        <RecordAnswerSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
        />

        {/* Navigation Buttons - Aligned Below the Camera */}
        <div className="flex justify-end gap-6 mt-6 w-full pr-10">
          {activeQuestionIndex > 0 && (
            <Button
              onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Previous Question
            </Button>
          )}

          {activeQuestionIndex !== mockInterviewQuestion?.length - 1 ? (
            <Button
              onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Next Question
            </Button>
          ) : (
            <Button
              onClick={handleEndInterview}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
            >
              End Interview
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default StartInterview;
