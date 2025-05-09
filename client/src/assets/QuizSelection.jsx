const QuizSelection = () => {
    const quizzes = [
      { title: "Learning Style Quiz", link: "ls-quiz.html" },
      { title: "Career Interest Quiz", link: "ci-quiz.html" },
      { title: "Subject Strengths Quiz", link: "ss-quiz.html" },
      { title: "Emotional Intelligence Quiz", link: "eq-quiz.html" },
      { title: "General Knowledge Quiz", link: "gk-quiz.html" },
      { title: "Logical Thinking & Puzzle Quiz", link: "lt-quiz.html" },
    ];
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-3xl font-bold text-purple-600 mb-6">Select a Quiz 🧠</h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {quizzes.map((quiz, index) => (
              <a 
                key={index} 
                href={quiz.link} 
                className="bg-purple-600 text-white py-6 px-4 rounded-lg text-center transition-transform transform hover:scale-105 shadow-md"
              >
                <h3 className="text-xl font-semibold">{quiz.title}</h3>
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default QuizSelection;
  