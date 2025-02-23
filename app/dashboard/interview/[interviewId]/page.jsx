"use client";

import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useState } from "react";
import Webcam from "react-webcam";
import { Lightbulb, WebcamIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function Interview() {
  const params = useParams();
  const [interviewData, setInterviewData] = useState();
  const [webCamEnabled, setwebCamEnabled] = useState(false);
  const router=useRouter();

  const onStart = () => {
    router.push(`/dashboard/interview/${interviewData?.mockId}/start`);
};



  useEffect(() => {
    if (!params?.interviewId) return;
    console.log(params.interviewId);
    GetInterviewDetails();
  }, [params?.interviewId]);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));
    setInterviewData(result[0]);
  };


  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl">Let's Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col my-5 gap-5 p-5 rounded-lg border">
          <div
            className="font-sans flex flex-col p-5 rounded-lg border gap-5"
            style={{ background: "radial-gradient(circle, #FFFFFF, #F0F4F8)" }}
          >
            {interviewData ? (
              <>
                <h2 className="text-lg">
                  <strong>Job Role/Job Position:</strong>{" "}
                  {interviewData.jobPosition}
                </h2>
                <h2 className="text-lg">
                  <strong>Job Description/Tech Stack:</strong>{" "}
                  {interviewData.jobDesc}
                </h2>
                <h2 className="text-lg">
                  <strong>Years Of Experience:</strong>{" "}
                  {interviewData.jobExperience}
                </h2>
              </>
            ) : (
              <p>Loading interview details...</p>
            )}
          </div>
          <div className="p-5 border rounded-lg border-yellow-500 bg-yellow-100 ">
            <h2 className="flex gap-2 items-center text-violet-800">
              <Lightbulb />
              <strong>Information</strong>
            </h2>
            <h2 className="mt-3 text-yellow-500">
              {process.env.NEXT_PUBLIC_INFORMATION}
            </h2>
          </div>
        </div>

        <div>
          {webCamEnabled ? (
            <Webcam
              onUserMedia={() => setwebCamEnabled(true)}
              onUserMediaError={() => setwebCamEnabled(false)}
              mirrored={true}
              style={{
                height: 300,
                width: 300,
              }}
            />
          ) : (
            <>
              <WebcamIcon className="h-72 w-5/6 my-7 p-20 bg-secondary rounded-lg" />
              <Button
                className="w-5/6 bg-teal-500 cursor-pointer hover:bg-sky-500"
                onClick={() => setwebCamEnabled(true)}
              >
                Enable Web Cam And Microphone
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="mt-10 flex justify-center">
      <Button className=" bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-600 transition" onClick={onStart}>START INTERVIEW</Button></div>
    </div>
  );
}

export default Interview;
