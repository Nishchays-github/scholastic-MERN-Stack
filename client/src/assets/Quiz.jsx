import React, { useState } from "react";

const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris",
  },
  {
    question: "Who painted the famous artwork “Starry Night”?",
    options: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Claude Monet"],
    answer: "Vincent van Gogh",
  },
  {
    question: "Name the National reptile of India.",
    options: ["King Cobra", "Indian Rat Snake", "Monitor Lizard", "Indian Python"],
    answer: "King Cobra",
  },
  {
    question: "Who invented the Watch?",
    options: ["Guglielmo Marconi", "Peter Henlein", "Benjamin Franklin", "Thomas Alva Edison"],
    answer: "Peter Henlein",
  },
  {
    question: "Which is the largest active volcano on our planet?",
    options: ["Mauna Loa", "Incahuasi", "Monte Pissis", "Tipas"],
    answer: "Mauna Loa",
  },
  {
    question: "Who was the first woman to go into space?",
    options: ["Kalpana Chawla", "Sally Ride", "Anna Kikina", "Valentina Tereshkova"],
    answer: "Valentina Tereshkova",
  },
  {
    question: "What is the colour of blood in cockroach?",
    options: ["Red", "Blue", "White", "Green"],
    answer: "White",
  },
  {
    question: "What do you call a group of fish?",
    options: ["Pack", "School", "Pride", "Colony"],
    answer: "School",
  },
  {
    question: "Who is the author of the “Harry Potter” book series?",
    options: ["J.K. Rowling", "Roald Dahl", "Beatrix Potter", "Julia Donaldson"],
    answer: "J.K. Rowling",
  },
  {
    question: "What do you call a baby kangaroo?",
    options: ["Fry", "Joey", "Kid", "Foal"],
    answer: "Joey",
  },
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showNext, setShowNext] = useState(false);

  const handleAnswerClick = (selectedOption) => {
    if (selectedOption === quizData[currentQuestion].answer) {
      setScore(score + 10);
    }
    setShowNext(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowNext(false);
    } else {
      setShowNext(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-lg text-center">
        <h1 className="text-2xl font-semibold text-purple-600">Quiz Time!</h1>

        {currentQuestion < quizData.length ? (
          <>
            <p className="mt-6 text-lg font-medium">{quizData[currentQuestion].question}</p>

            <div className="mt-4 space-y-3">
              {quizData[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition duration-300"
                  onClick={() => handleAnswerClick(option)}
                >
                  {option}
                </button>
              ))}
            </div>

            {showNext && (
              <button
                className="mt-6 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300"
                onClick={handleNextQuestion}
              >
                {currentQuestion < quizData.length - 1 ? "Next" : "Finish"}
              </button>
            )}

            <p className="mt-4 font-semibold">Score: {score}</p>
          </>
        ) : (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-green-600">Quiz Completed!</h2>
            <p className="text-lg font-medium mt-2">Your final score: {score}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
