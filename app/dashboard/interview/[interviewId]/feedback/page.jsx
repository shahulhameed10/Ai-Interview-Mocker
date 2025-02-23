"use client";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

function Feedback() {
  const params = useParams();
  const router = useRouter(); // Initialize Router
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    if (params?.interviewId) {
      GetFeedback();
    }
  }, [params]);

  const GetFeedback = async () => {
    try {
      const result = await db
        .select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, params.interviewId))
        .orderBy(UserAnswer.id);

      setFeedbackList(result);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold text-green-600">Congratulations!</h2>
      <h2 className="text-2xl font-bold">Here is your interview feedback</h2>
      {feedbackList?.length==0?
      <h2 className="font-bold text-xl text-gray-500"> No interview feedback record</h2>
      :<>
      <h2 className="text-primary text-lg my-3">
        Your overall interview rating: <strong>7/10</strong>
      </h2>

      <h2 className="text-sm text-gray-500">
        Find below interview questions with correct answers, your answer, and
        feedback for improvement.
      </h2>
      {feedbackList &&
        feedbackList.map((item, index) => (
          <Collapsible key={index} className="my-7">
            <CollapsibleTrigger className="p-2 flex justify-between bg-secondary rounded-lg my-2 text-left">
              {item.question}
              <ChevronsUpDown className="h-7 w-7" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="flex flex-col gap-2">
                <h2 className="text-purple-600 p-2 border rounded-lg">
                  <strong>Rating:</strong>
                  {item.rating}
                </h2>
                <h2 className="p-2 border rounded-lg bg-red-100 text-md text-red-900">
                  <strong>Your Answer:</strong>
                  {item.userAns}
                </h2>
                <h2 className="p-2 border rounded-lg bg-green-50 text-md text-green-900">
                  <strong>Correct Answer:</strong>
                  {item.correctAns}
                </h2>
                <h2 className="p-2 border rounded-lg bg-blue-100 text-md text-blue-900">
                  <strong>Feedback:</strong>{" "}
                  {String(item.feedback).replace(/\*/g, "")}
                </h2>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
        </>}
        <Button onClick={()=>router.replace('/dashboard')}>Go Home</Button>
    </div>
  );
}

export default Feedback;
