"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModal";
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();
  const handleClose = () => {
    setOpenDialog(false);
    setJobPosition("");
    setJobDesc("");
    setJobExperience("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const InputPrompt = `Job position: ${jobPosition}, job description: ${jobDesc}, Years of Experience: ${jobExperience}. 
      Please provide ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions with answers in JSON format, using 'question' and 'answer' fields.`;

    try {
      const result = await chatSession.sendMessage(InputPrompt);
      const MockJsonResp = await result.response
        .text()
        .replace("```json", "")
        .replace("```", "");
      console.log(JSON.parse(MockJsonResp));
      setJsonResponse(MockJsonResp);
      //database insertion
      if (MockJsonResp) {
        const resp = await db
          .insert(MockInterview)
          .values({
            mockId: uuidv4(),
            jsonMockResp: MockJsonResp,
            jobPosition: jobPosition,
            jobDesc: jobDesc,
            jobExperience: jobExperience,
            CreatedBy: user?.primaryEmailAddress?.emailAddress,
            CreatedAt:new Date()
          })
          .returning({ mockId: MockInterview.mockId });

        console.log("Inserted ID:", resp);
        if(resp){
          setOpenDialog(false);
          router.push('/dashboard/interview/'+resp[0]?.mockId)
        }
      } else {
        console.log("ERROR");
      }
    } catch (error) {
      console.error("Error generating interview questions:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Button to open dialog */}
      <div
        className="p-10 rounded-lg bg-secondary hover:bg-blue-400 hover:scale-105 
        hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>

      {/* Dialog Modal */}
      <Dialog open={openDialog} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job interview
            </DialogTitle>
            <DialogDescription>
              <div className="mb-4 text-lg font-medium">
                Add details about your job position, job description, and years
                of experience.
              </div>

              <form onSubmit={onSubmit}>
                <div className="my-3">
                  <label>Job Role/Job Position</label>
                  <Input
                    placeholder="Ex. Full Stack Developer, Data Analyst"
                    required
                    value={jobPosition}
                    onChange={(event) => setJobPosition(event.target.value)}
                  />
                </div>

                <div className="my-3">
                  <label>Job Description / Tech Stack (In Short)</label>
                  <Textarea
                    placeholder="Ex. React, Angular, Node.js, MySQL"
                    required
                    value={jobDesc}
                    onChange={(event) => setJobDesc(event.target.value)}
                  />
                </div>

                <div className="my-3">
                  <label>Years of Experience</label>
                  <Input
                    placeholder="Ex. 5"
                    type="number"
                    max="70"
                    required
                    value={jobExperience}
                    onChange={(event) => setJobExperience(event.target.value)}
                  />
                </div>

                <div className="flex gap-5 justify-end mt-4">
                  <Button type="button" variant="ghost" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        {" "}
                        <LoaderCircle className="animate-spin" /> 'Generating
                        from AI'
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
