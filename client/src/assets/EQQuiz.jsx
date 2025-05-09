import React, { useState } from "react";

const EQQuiz = () => {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [resultText, setResultText] = useState("");
  const totalQuestions = 15;

  const handleChange = (event) => {
    setAnswers({ ...answers, [event.target.name]: parseInt(event.target.value) });
  };

  const calculateScore = () => {
    if (Object.keys(answers).length !== totalQuestions) {
      alert("Please answer all the questions before submitting!");
      return;
    }

    let totalScore = Object.values(answers).reduce((sum, value) => sum + value, 0);

    setScore(totalScore);

    // Determine EQ level based on score
    if (totalScore <= 56) {
      setResultText("Your EQ is developing. Work on improving self-awareness and empathy.");
    } else if (totalScore <= 69) {
      setResultText("Good EQ, but there’s room for improvement in emotional regulation.");
    } else if (totalScore <= 83) {
      setResultText("You have a high EQ! You are self-aware and empathetic, but could still work on staying calm in stressful situations.");
    } else {
      setResultText("Excellent EQ! You are highly emotionally intelligent and able to handle almost any situation with grace.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl overflow-y-auto max-h-[90vh]">
        <h1 className="text-3xl font-bold text-purple-600 text-center mb-6">Emotional Intelligence (EQ) Quiz</h1>

        {!score ? (
          <form className="space-y-6">
            {[
              {
                question: "How often do you check in with your emotions during the day?",
                options: [
                  { label: "Rarely, I don't think about my emotions much", value: 3 },
                  { label: "Sometimes, but only when something big happens", value: 4 },
                  { label: "Often, I try to check in with how I'm feeling throughout the day", value: 5 },
                  { label: "Always, I'm very in tune with my emotions", value: 6 },
                ],
              },
              {
                question: "When you're feeling upset, what is your usual reaction?",
                options: [
                  { label: "I ignore it and carry on with my day", value: 4 },
                  { label: "I feel overwhelmed but eventually figure out why I'm upset", value: 5 },
                  { label: "I try to understand the cause of my emotions and reflect on them", value: 6 },
                  { label: "I get angry and let it out immediately", value: 3 },
                ],
              },
              {
                question: "When you feel angry or stressed, how do you manage those emotions?",
                options: [
                  { label: "I let my emotions control me", value: 3 },
                  { label: "I take deep breaths or count to ten to calm myself", value: 6 },
                  { label: "I vent to someone right away", value: 5 },
                  { label: "I ignore the feelings and push through", value: 4 },
                ],
              },
              {
                question: "How do you handle stress before an exam?",
                options: [
                  { label: "I get really anxious and stressed out", value: 4 },
                  { label: "I try to calm myself by studying or preparing well", value: 5 },
                  { label: "I feel confident and don't worry much", value: 6 },
                  { label: "I procrastinate and leave everything until the last minute", value: 3 },
                ],
              },
            ].map((q, index) => (
              <div key={index} className="border-b pb-4">
                <p className="font-semibold mb-2">{index + 1}. {q.question}</p>
                {q.options.map((option, optionIndex) => (
                  <label key={optionIndex} className="block text-gray-700">
                    <input
                      type="radio"
                      name={`q${index + 1}`}
                      value={option.value}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            ))}

            <button
              type="button"
              onClick={calculateScore}
              className="w-full bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600 transition"
            >
              Submit
            </button>
          </form>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-purple-600">Your EQ Score: {score}</h2>
            <p className="text-gray-700 mt-4">{resultText}</p>
            <button
              onClick={() => {
                setScore(null);
                setAnswers({});
              }}
              className="mt-6 bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600"
            >
              Retake Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EQQuiz;
