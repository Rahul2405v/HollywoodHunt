import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../Map.css';

const numberClasses = [
  'zero', 'one', 'two', 'three', 'four',
  'five', 'six', 'seven', 'eight', 'nine', 'ten',
  'eleven', 'twelve', 'thirteen', 'fourteen'
];

export default function Map() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState(Array(15).fill(false)); // Initialize with 15 questions
  const [score, setScore] = useState(0); // Initialize score to 0
  const location = useLocation();
  const navigate = useNavigate();
  const arr=[]
      
  useEffect(() => {
  
    if (location.state) {
      const questionId = location.state.questionId;
      const scoreUpdate = location.state.scoreUpdate;
      console.log(scoreUpdate);
      handleIt(questionId,scoreUpdate)
      // Update the score state with the new total score
      setScore(prevScore => prevScore + scoreUpdate);
       


      const updatedCompletedQuestions = [...completedQuestions];
      if (location.state.questionId === 13) {
        navigate('/completion', { state: { score } });
      }
      
      // Update the completedQuestions array
      if (questionId >= 0 && questionId < completedQuestions.length) {
        updatedCompletedQuestions[questionId] = true;
        setCompletedQuestions(updatedCompletedQuestions);
      }
    }
  }, [location.state]);

  useEffect(() => {
    if (completedQuestions.every(Boolean)) {
      navigate('/completion', { state: { score } });
    }
  }, [completedQuestions, navigate, score]);
   const handleIt=(questionId,scoreUpdate)=>{
    if(questionId==0){
      sessionStorage.setItem("totalScore", 0);}
    else{
      let currentScore = parseInt(sessionStorage.getItem("totalScore"));
      currentScore += parseInt(scoreUpdate); 
       sessionStorage.setItem("totalScore", currentScore);
       console.log(sessionStorage.getItem("totalScore"))
    }
   }
  const canAccessQuestion = (questionIndex) => {
    return questionIndex === 0 || completedQuestions[questionIndex - 1];
  };

  const handleQuestionCompletion = (scoreUpdate) => {
    const updatedCompletedQuestions = [...completedQuestions];
    
    updatedCompletedQuestions[currentQuestion] = true;
      
    
    

    setCompletedQuestions(updatedCompletedQuestions);

    // Update the score state with the new total score
    setScore(prevScore => prevScore + scoreUpdate);

    if (currentQuestion < 14) {
      setCurrentQuestion(prevQuestion => prevQuestion + 1);
    }
  };

  return (
    <div className='map'>
      
       <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 100 125" x="0px" y="0px"><circle fill="darkgreen" cx="17.01" cy="34.74" r="2.52"/><path fill="#B22222" d="M76.21,63.94l6.49,4.41.45-.07a1.24,1.24,0,0,1,.62,0,.38.38,0,0,1,.23.29.35.35,0,0,1-.12.34,1,1,0,0,1-.58.23l-3.76.65a1,1,0,0,1-.62,0,.37.37,0,0,1-.24-.28.38.38,0,0,1,.13-.35,1.18,1.18,0,0,1,.58-.22l1.86-.32-5.64-3.82-4,5.47,1.87-.32a1.11,1.11,0,0,1,.62,0,.37.37,0,0,1,.24.28.38.38,0,0,1-.13.35,1.18,1.18,0,0,1-.58.23l-3.73.63a1,1,0,0,1-.62,0,.36.36,0,0,1-.23-.28.36.36,0,0,1,.06-.28.53.53,0,0,1,.23-.19,8.25,8.25,0,0,1,.84-.17l4.55-6.31L68.65,60l-.44.08a1.11,1.11,0,0,1-.62,0,.38.38,0,0,1-.11-.63,1.18,1.18,0,0,1,.58-.23l3.19-.54a1.16,1.16,0,0,1,.63,0,.37.37,0,0,1,.24.29.38.38,0,0,1-.13.35,1.15,1.15,0,0,1-.59.22l-1.31.23,5.28,3.59,3.72-5.14-1.31.23a1.13,1.13,0,0,1-.63,0,.36.36,0,0,1-.24-.28A.38.38,0,0,1,77,57.8a1.14,1.14,0,0,1,.59-.23l3.2-.55a1.21,1.21,0,0,1,.62,0,.39.39,0,0,1,.24.29.38.38,0,0,1-.13.35,1.14,1.14,0,0,1-.58.22l-.44.08Z"/><path fill="#B22222" d="M15.1,39.94l-.64-.12c.22-1.19.4-1.94.4-2l.64.15S15.32,38.77,15.1,39.94Z"/><path fill="#B22222" d="M29.15,73.22l-.5,0-1-.06a17.84,17.84,0,0,1-2.47-.24l.12-.65a17.87,17.87,0,0,0,2.38.24l1,.06.47,0Zm4,0,0-.66c1.3-.06,2.61-.15,3.91-.29l.07.65C35.76,73,34.43,73.13,33.12,73.19ZM41,72.34l-.11-.65c1.33-.23,2.62-.5,3.83-.81l.16.63C43.64,71.83,42.34,72.11,41,72.34ZM21.64,70.9a5.27,5.27,0,0,1-1.74-3.6v-.1l.66,0v.08a4.67,4.67,0,0,0,1.55,3.14Zm27-.56-.23-.62A29.31,29.31,0,0,0,52,68.15l.31.58A29.77,29.77,0,0,1,48.67,70.34Zm7-3.78L55.25,66a15.07,15.07,0,0,0,2.69-2.73l.53.4A16.43,16.43,0,0,1,55.66,66.56ZM22.34,64.15l-.43-.5a14.8,14.8,0,0,1,3.42-2.11l.28.59A14.18,14.18,0,0,0,22.34,64.15Zm6.9-3.41-.2-.63.19-.06c1.14-.35,2.32-.77,3.51-1.23l.24.61c-1.2.47-2.4.89-3.55,1.25Zm31.15-.55L59.78,60a14.29,14.29,0,0,0,.78-3.74l.65,0A14,14,0,0,1,60.39,60.19ZM36.61,57.85l-.28-.59c1.18-.56,2.35-1.17,3.48-1.8l.32.57C39,56.67,37.81,57.28,36.61,57.85ZM19.66,56.21l-.22-.62c.76-.28,1.51-1,2.58-2.6l.54.37C21.41,55.05,20.57,55.88,19.66,56.21Zm-4-.85a7,7,0,0,1-1.73-3.69l.64-.12a6.43,6.43,0,0,0,1.55,3.34ZM43.52,54l-.37-.55c1.13-.74,2.2-1.51,3.18-2.28l.4.51C45.74,52.45,44.66,53.23,43.52,54Zm18-1.6-.66-.09a31.2,31.2,0,0,1,.81-3.89l.64.17A30.28,30.28,0,0,0,61.55,52.38ZM24.64,50l-.57-.33c.56-1,1.2-2.12,1.92-3.43l.57.32C25.84,47.87,25.2,49,24.64,50Zm25.07-1-.47-.46a20.06,20.06,0,0,0,2.47-3l.55.37A20.71,20.71,0,0,1,49.71,49Zm27.56-.38-.58-.31A22.88,22.88,0,0,1,78.89,45l.51.42A21.4,21.4,0,0,0,77.27,48.64Zm-63-.94h-.66a38.23,38.23,0,0,1,.26-4l.65.07C14.37,45.19,14.28,46.5,14.27,47.7ZM63.6,44.89,63,44.64a31.94,31.94,0,0,1,1.76-3.57l.57.33A32.27,32.27,0,0,0,63.6,44.89ZM28.54,43.18,28,42.82a35.4,35.4,0,0,1,2.34-3.21l.51.42A36.07,36.07,0,0,0,28.54,43.18Zm53.61-.45-.4-.52,1-.79a11.6,11.6,0,0,0,2-1.63l.49.43a11.41,11.41,0,0,1-2,1.73Zm-28.21-.44-.64-.15a6.5,6.5,0,0,0,.19-1.55,5.91,5.91,0,0,0-.4-2.12l.61-.24a6.35,6.35,0,0,1,.45,2.36A7.13,7.13,0,0,1,53.94,42.29Zm13.54-4.13-.53-.4a30,30,0,0,1,2.61-3l.47.46A28.58,28.58,0,0,0,67.48,38.16Zm-34-1-.44-.48a21,21,0,0,1,3.18-2.41l.35.56A20.35,20.35,0,0,0,33.5,37.2Zm53.28-.72-.66-.09a13.83,13.83,0,0,0,.12-1.69v-.13a5.59,5.59,0,0,0-.31-1.91l.62-.22a6.39,6.39,0,0,1,.35,2.13v.14A15.25,15.25,0,0,1,86.78,36.48Zm-35.94-1c-.21-.18-.42-.35-.65-.52a11.42,11.42,0,0,0-2.61-1.46l.24-.61a11.92,11.92,0,0,1,2.76,1.54c.24.18.47.36.69.55ZM40.08,33.28l-.19-.63a12.87,12.87,0,0,1,4-.56l0,.66A12.12,12.12,0,0,0,40.08,33.28Zm32.86-.63-.39-.52A21.17,21.17,0,0,1,75.93,30l.29.59A21.5,21.5,0,0,0,72.94,32.65ZM83.51,30a6.86,6.86,0,0,0-3.67-.56l-.06-.66a7.6,7.6,0,0,1,4,.62Z"/><path fill="#B22222" d="M74.86,54.15l-.62-.22c.23-.66.47-1.28.7-1.86l.61.24C75.32,52.89,75.09,53.5,74.86,54.15Z"/></svg>
      
      {numberClasses.map((className, index) => (
        <div key={index} className={`button ${className}`}>
          <button>
          {(index === currentQuestion && index === 0 && currentQuestion < 2) ? (
                            <Link to={`/question/${index + 1}`} onClick={() => handleQuestionCompletion(0)}>
                                {index + 1} {/* Display question number */}
                            </Link>
                        ) : (
                            (canAccessQuestion(index) && !(index === 0 && index >= 2)) ? (
                                <Link to={`/question/${index + 1}`}>
                                    {index + 1}
                                </Link>
                            ) : (
                                'X'
                            )
                        )}
          </button>
        </div>
      ))}
      
      {completedQuestions.every(Boolean) && (
        <div className="score">
        
        </div>
      )}
    </div>
  );
}