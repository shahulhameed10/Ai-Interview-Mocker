"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState, useCallback } from "react";
import InterviewItemCard from "./interviewItemCard";

function InterviewList() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);

  // Memoize the function to prevent unnecessary re-creation
  const GetInterviewList = useCallback(async () => {
    if (!user) return;

    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.CreatedBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(MockInterview.id));

      console.log("Fetched Interview List:", result);
      setInterviewList(Array.isArray(result) ? result : []);  // Ensure it's always an array
    } catch (error) {
      console.error("Error fetching interviews:", error);
    }
  }, [user]); // Only re-run when `user` changes

  useEffect(() => {
    GetInterviewList();
  }, [GetInterviewList]); // Prevent infinite re-renders

  return (
    <div>
      <h2 className="font-medium text-xl">Previous Mock Interviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {interviewList.length > 0 ? (
          interviewList.map((interview, index) => (
            <InterviewItemCard interview={interview} key={interview.id || index} />
          ))
        ) : (
          <p>No interviews found.</p>
        )}
      </div>
    </div>
  );
}

export default InterviewList;
