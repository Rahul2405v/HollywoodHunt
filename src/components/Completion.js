import React from 'react';
import { useLocation } from 'react-router-dom';
import '../index.css'
export default function Completion() {
  const location = useLocation();
  const { score } = location.state || { score: 0 };
  function checkContentEditable() {
    if (document.body.contentEditable === "true") {
        console.log("ContentEditable has been enabled!");
        // Take action here, such as disabling it
        document.body.contentEditable = "false";
        alert("Editing is disabled on this page!");
    }
}
setInterval(checkContentEditable, 1000);

  return (
    <div className='completion'>
      <h1>Congratulations!</h1>
      <p>You have completed all questions.</p>
      <h2>Your Final Score: {(sessionStorage.getItem("totalScore"))*100}</h2>
    </div>
  );
}
