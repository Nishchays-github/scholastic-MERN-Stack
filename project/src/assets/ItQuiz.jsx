import { useState } from "react";

const quizData = [
  { question: "Find the odd one out: Tiger, Leopard, Lion, Elephant", options: ["Tiger", "Leopard", "Lion", "Elephant"], answer: "Elephant" },
  { question: "A basket contains 5 apples. You take away 3. How many do you have?", options: ["2", "3", "5", "7"], answer: "3" },
  { question: "A plane crashes on the border of Canada and the USA. Where do they bury the survivors?", options: ["USA", "Canada", "Nowhere", "Their homeland"], answer: "Nowhere" },
  { question: "A doctor gives you three pills and tells you to take one every 30 minutes. How long will it take to finish the pills?", options: ["1.5 hours", "1 hour", "2.5 hours", "2 hours"], answer: "1 hour" },
  { question: "What comes next in the pattern? A, C, F, J, O, ?", options: ["S", "T", "U", "V"], answer: "U" },
  { question: "If 2 + 3 = 10, 7 + 2 = 63, 6 + 5 = 66, what does 8 + 4 equal?", options: ["24", "96", "84", "72"], answer: "96" },
  { question: "A room contains 6 people. Each of them shakes hands with every other person. How many handshakes occur?", options: ["12", "15", "20", "30"], answer: "15" },
  { question: "What is the missing number in the pattern? 1, 1, 2, 6, 24, ___", options: ["48", "36", "100", "120"], answer: "120" },
  { question: "If a man is facing east, turns 90° to his left, then turns 180° to his right, which direction is he facing?", options: ["North", "South", "East", "West"], answer: "South" },
  { question: "A farmer had 10 cows, all but 7 died. How many cows are left?", options: ["7", "10", "3", "5"], answer: "7" },
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);

  const checkAnswer = (option) => {
    setSelected(option);
    if (option === quizData[currentQuestion].answer) {
      setScore(score + 10);
    }
  };

  const nextQuestion = () => {
    setSelected(null);
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 md:p-8 shadow-lg rounded-lg w-full max-w-2xl text-center">
        <h1 className="text-2xl font-semibold text-purple-600">Quiz Time!</h1>

        {currentQuestion < quizData.length ? (
          <>
            <p className="text-lg font-medium mt-6">{quizData[currentQuestion].question}</p>
            <div className="mt-4 space-y-2">
              {quizData[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => checkAnswer(option)}
                  className={`w-full p-3 text-lg border rounded-lg transition ${
                    selected === option
                      ? option === quizData[currentQuestion].answer
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                  disabled={selected !== null}
                >
                  {option}
                </button>
              ))}
            </div>

            {selected && (
              <button
                onClick={nextQuestion}
                className="mt-4 px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                Next
              </button>
            )}
          </>
        ) : (
          <p className="text-lg font-medium mt-6">Quiz Completed! 🎉</p>
        )}

        <p className="mt-6 text-gray-700 text-lg">Score: {score}</p>
      </div>
    </div>
  );
};

export default Quiz;
