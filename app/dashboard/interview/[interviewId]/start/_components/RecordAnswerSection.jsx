"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModal";
import { useUser } from "@clerk/nextjs";
import { date } from "drizzle-orm/mysql-core";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";

function RecordAnswerSection({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    setUserAnswer(results.map((result) => result.transcript).join(" "));
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswer();
    }
  }, [userAnswer]);

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
      console.log(userAnswer);
    } else {
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    console.log(userAnswer);
    setLoading(true);
    const feedbackPrompt =
      "Question: " +
      mockInterviewQuestion[activeQuestionIndex]?.question +
      ", user answer: " +
      userAnswer +
      ". Based on the question and user answer, provide a rating and feedback " +
      "for improvement in JSON format with 'rating' and 'feedback' fields.";

    const result = await chatSession.sendMessage(feedbackPrompt);
    const mockJsonResp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");

    console.log("Feedback Response:", mockJsonResp);
    const JsonFeedbackResp = JSON.parse(mockJsonResp);

    const resp = await db.insert(UserAnswer).values({
      mockIdRef: interviewData?.mockId,
      question: mockInterviewQuestion[activeQuestionIndex]?.question,
      correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
      userAns: userAnswer,
      feedback: JsonFeedbackResp?.feedback,
      rating: JsonFeedbackResp?.rating,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      createdAt: new Date(),
    });
    if (resp) {
      toast("User Answer recorded successfully");
      setUserAnswer('');
      setResults([]);
    }
    setResults([])
    setLoading(false);
  };
    
    

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5 max-w-[600px] min-h-[500px] mx-auto relative">
        <Image
          src={"/cam.png"}
          width={180}
          height={180}
          className="absolute"
          alt="Webcam background"
        />
        <Webcam
          mirrored={true}
          style={{
            height: 350,
            width: "100%",
            zIndex: 10,
          }}
        />
      </div>

      <Button
        disabled={loading}
        variant="outline"
        className="my-10 bg-blue-400 font-semibold"
        onClick={StartStopRecording}
      >
        {isRecording ? (
          <h2 className="text-red-600 flex items-center">
            <Mic className="mr-2" /> Stop Recording...
          </h2>
        ) : (
          "Record Answer"
        )}
      </Button>
    </div>
  );
}
export default RecordAnswerSection;
