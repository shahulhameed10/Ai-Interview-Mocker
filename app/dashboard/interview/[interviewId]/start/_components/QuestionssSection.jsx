import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

function QuestionssSection({ mockInterviewQuestion, activeQuestionIndex }) {
  const texttoSpeeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry ,your browser does not support text to speech");
    }
  };

  return (
    mockInterviewQuestion && (
      <div className="p-5 border rounded-lg my-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {mockInterviewQuestion.map((question, index) => (
            <h2
              key={index}
              className={`p-3 rounded-full text-xs md:text-sm text-center cursor-pointer border transition-all ${
                activeQuestionIndex === index
                  ? "bg-blue-500 text-white"
                  : "border-gray-300 text-gray-600"
              }`}
            >
              Question #{index + 1}
            </h2>
          ))}
        </div>
        <h2 className="my-5 text-md  md:text-lg">
          {mockInterviewQuestion[activeQuestionIndex]?.question}
        </h2>
        <Volume2
          onClick={() =>
            texttoSpeeech(mockInterviewQuestion[activeQuestionIndex]?.question)
          }
        />

        <div className="border rounded-lg p-5 bg-blue-400 mt-20">
          <h2 className="flex gap-2 items-center text-yellow-200">
            <Lightbulb />
            <strong>Note: </strong>
          </h2>
          <h2 className="text-md text-yellow-50 my-2 p-3">
            {process.env.NEXT_PUBLIC_QUESTION_NOTE}
          </h2>
        </div>
      </div>
    )
  );
}

export default QuestionssSection;
