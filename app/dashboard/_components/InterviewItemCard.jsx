"use client"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';
import React from 'react'

function InterviewItemCard({interview}) {
    const router = useRouter();
    console.log("Interview Props:", interview);


    const onStart = () => {
        if (!interview?.mockId) {
            console.error("Error: Mock ID is missing!");
            return; // Prevents navigation if mockId is undefined
        }
        router.push(`/dashboard/interview/${interview.mockId}`);
    };
    const onFeedbackPress=()=>{
        router.push('/dashboard/interview/'+interview.MockId+"/feedback")
    }
    

   return (
    <div className='border shadow-sm rounded-lg p-3'>
        <h2 className='font-bold text-primary'>{interview?.jobPosition}</h2>
        <h2 className='text-sm text-gray-700'>{interview?.jobExperience} Years of Experience</h2>
        <div className='flex justify-between mt-2 gap-5'>
            <Button size="sm" variant="outline" className="w-full" onClick={onFeedbackPress}>Feedback</Button>
            <Button size="sm"
             className="w-full"
             onClick={onStart}>Start</Button>
             
            

        </div>
    </div>
    
  )
 }

export default InterviewItemCard
