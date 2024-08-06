import { useEffect, useState } from 'react';
import './App.css'
import questionsData from "./questions.json";

function App() {
 const [currentQuestion,SetCurrentQuestion] =useState(0);
 const [score,SetScore] = useState(0);
 const [showScore,SetShowScore] = useState(false);
 const [timer,SetTimer] = useState(10);

 useEffect(() => {
   let interval;
   if (timer > 0 && !showScore)  {
    interval = setInterval (() => {
      SetTimer((prevTimer) => prevTimer - 1 )
    },1000)
   } else {
    clearInterval(interval);
    SetShowScore(true);
   }
     return () => clearInterval(interval);
 }, [ timer, showScore ])

 const handleAnswerClick = (selectedOption) => {
   if(selectedOption === questionsData [currentQuestion].correctOption) {
    SetScore((prevScore) => prevScore + 1);
   }

   if (currentQuestion < questionsData.length - 1)
   {
   SetCurrentQuestion((prevQuestion) => prevQuestion + 1);
   SetTimer(10);
   }else{
    SetShowScore(true);
   }
 };

  const handleRestartQuiz = () => {
   SetCurrentQuestion(0);
   SetShowScore(false);
   SetScore(0);
   SetTimer(10);
  }
  
return (
    <>
      <div className='quiz-app'>
       {showScore ? (
        <div className='score-section'>
        <h2>Your Score:{ score }/{ questionsData.length }</h2>
        <button onClick={handleRestartQuiz}>Restart</button>
      </div>
       ) : (
        <div className='question-section'>
        <h2>Question{currentQuestion + 1 }</h2>
        <p>{questionsData [currentQuestion].question}</p>
        <div className='options'>
         {questionsData [currentQuestion].Options.map((option,index) =>(
          <button key={index} onClick={() => handleAnswerClick (option) }>{option}</button>
         ))}
        </div>
        <div className='timer'> Time Left: <span>{timer}s</span> </div>
       </div>
       )} 
       
       
      </div>
    </>
  )
}

export default App