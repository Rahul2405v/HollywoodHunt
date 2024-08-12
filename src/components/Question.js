// src/Question.js
import React, { useState,useEffect } from 'react';
import parse from 'html-react-parser';
import '../Question.css'; // Adjust the import according to your file structure
import { useParams, useNavigate } from 'react-router-dom';
const questionsArray = [
  {
    question: "Which 2010 film, exploring the concept of shared dreaming, was edited by the same person who later cut a 2017 war film told from three perspectives?",
    options: ["a) Shutter Island", "b) Inception", "c) The Lovely Bones", "d) Source Code"],
    hint: "The film involves multiple layers of dreams within dreams.",
    answer: "b) Inception",
    hintQuestion: `
      <p>What will be the output of the following code?</p>
      <pre><code>
a = [1, 2, [3, 4]]
b = a
b[2][0] = 7
print(a)
      </code></pre>
    `,
    hintAnswer: "[1, 2, [7, 4]]"
  },
  {
    question: "The cinematographer of the film in Q1 also shot which 2015 post-apocalyptic movie, where characters traverse a desert wasteland?",
    options: ["a) The Rover", "b) Mad Max: Fury Road", "c) The Bad Batch", "d) Turbo Kid"],
    hint: "The title suggests chaos and mayhem in a dystopian world.",
    answer: "b) Mad Max: Fury Road",
    hintQuestion: `
      <p>What will be the output of the following Python code?</p>
      <pre><code>
def fibonacci(n):
  a, b = 0, 1
  for _ in range(n):
    a, b = b, a + b
  return a
print(fibonacci(5))
      </code></pre>
    `,
    hintAnswer: "5"
  },
  {
    question: "Which 2016 sci-fi film, featuring a linguist decoding an alien language, shares themes of non-linear time perception with the movie in Q1?",
    options: ["a) The Arrival", "b) Midnight Special", "c) Passengers", "d) Life"],
    hint: "The plot revolves around communication with extraterrestrial beings.",
    answer: "a) The Arrival",
    hintQuestion: `
      <p>Given the string 'hello world', what is the result of the following operation that involves converting the string to a list, modifying it, and joining it back into a string?</p>
      <pre><code>
s = 'hello world'
s_list = s.split(' ')
s_list[1] = 'universe'
result = '_'.join(s_list)
print(result)
      </code></pre>
    `,
    hintAnswer: "hello_universe"
  },
  {
    question: "The theoretical physicist who consulted on the film in Q5 was the subject of which 2014 biopic?",
    options: ["a) The Imitation Game", "b) The Theory of Everything", "c) A Beautiful Mind", "d) The Man Who Knew Infinity"],
    hint: "This biopic portrays the life of a renowned physicist who developed a groundbreaking theory on black holes.",
    answer: "b) The Theory of Everything",
    hintQuestion: `
      <p>Evaluate the following logical expression:</p>
      <pre><code>
not (True and False) or (False and True)
      </code></pre>
    `,
    hintAnswer: "True"
  },
  {
    question: "Which 2014 space film, scored by the same composer as the movie in Q1, features a protagonist experiencing time dilation?",
    options: ["a) Gravity", "b) The Martian", "c) Interstellar", "d) Guardians of the Galaxy"],
    hint: "The film explores the idea of traveling through a wormhole to save humanity.",
    answer: "c) Interstellar",
    hintQuestion: `
      <p>What will be the result of the following list comprehension?</p>
      <pre><code>
squares = [x**2 for x in range(4) if x % 2 == 0]
print(squares)
      </code></pre>
    `,
    hintAnswer: "[0, 4, 16]"
  },
  {
    question: "Which 2016 Marvel film introduces a character manipulating time, echoing concepts from Q1, Q3, and Q5?",
    options: ["a) Captain America: Civil War", "b) X-Men: Apocalypse", "c) Doctor Strange", "d) Deadpool"],
    hint: "The protagonist's journey begins after a devastating car accident.",
    answer: "c) Doctor Strange",
    hintQuestion: `
      <p>What does the following function return when called with the argument 7?</p>
      <pre><code>
def func(x):
  return x if x < 5 else x - 5
print(func(7))
      </code></pre>
    `,
    hintAnswer: "2"
  },
  {
    question: "The visual effects supervisor for the film in Q7 also worked on which 2018 animated film that explores parallel universes?",
    options: ["a) Ralph Breaks the Internet", "b) Spider-Man: Into the Spider-Verse", "c) Incredibles 2", "d) Teen Titans Go! To the Movies"],
    hint: "This animated film features various versions of a popular web-slinging superhero.",
    answer: "b) Spider-Man: Into the Spider-Verse",
    hintQuestion: `
      <p>What is the output of the following loop?</p>
      <pre><code>
for i in range(1, 4):
  print(i * 2)
      </code></pre>
    `,
    hintAnswer: "2 4 6"
  },
  {
    question: "The production designer of the film in Q9 also worked on which 2013 sci-fi film set entirely on a train, sharing themes of class struggle?",
    options: ["a) Snowpiercer", "b) The Polar Express", "c) Source Code", "d) Unstoppable"],
    hint: "The story takes place on a train that continuously circles a frozen Earth.",
    answer: "a) Snowpiercer",
    hintQuestion: `
      <p>What will be the result of the following list operation involving a nested list and index manipulation?</p>
      <pre><code>
numbers = [[1, 2], [3, 4]]
numbers[1].append(5)
numbers[0].pop(0)
print(numbers)
      </code></pre>
    `,
    hintAnswer: "[[2], [3, 4, 5]]"
  },
  {
    question: "Which 2023 biopic, exploring the creation of the atomic bomb, shares themes of scientific ethics and unintended consequences with the films in Q5 and Q6?",
    options: ["a) Tesla", "b) Oppenheimer", "c) Radium Girls", "d) The Current War"],
    hint: "The film is named after the physicist who led the Manhattan Project.",
    answer: "b) Oppenheimer",
    hintQuestion: `
      <p>What does the following code print?</p>
      <pre><code>
my_dict = {'a': 1, 'b': 2}
my_dict.update({'c': 3})
print(my_dict)
      </code></pre>
    `,
    hintAnswer: "{'a': 1, 'b': 2, 'c': 3}"
  },
  {
    question: "The lead actor from the film in Q13 played which comic book character in a 2018 film, whose symbiotic relationship echoes themes of duality in Q1 and Q12?",
    options: ["a) Deadpool", "b) Venom", "c) Carnage", "d) Riot"],
    hint: "The character is bonded with an alien symbiote.",
    answer: "b) Venom",
    hintQuestion: `
      <p>Complete the output of this code snippet involving NumPy:</p>
      <pre><code>
import numpy as np
def multiply_arrays(a, b):
  return np.dot(a, b)
print(multiply_arrays([1, 2], [3, 4]))
      </code></pre>
    `,
    hintAnswer: "11"
  },
  {
    question: "Which 2024 sci-fi epic, scored by the same composer as Q7, continues a story begun in 2021 and shares themes of destiny, power, and perception-altering substances with Q4?",
    options: ["a) Avatar 3", "b) Dune: Part Two", "c) Blade Runner 2099", "d) Tron: Ares"],
    hint: "This film is the continuation of a story involving a desert planet and a powerful substance.",
    answer: "b) Dune: Part Two",
    hintQuestion: `
      <p>What will be the result of the following code?</p>
      <pre><code>
def mystery_function(x):
  if x % 2 == 0:
    return x / 2
  else:
    return x * 3 + 1
print(mystery_function(5))
      </code></pre>
    `,
    hintAnswer: "16"
  },
  {
    question: "Which film, known for its intricate heist plot, was directed by the same filmmaker as the movie in Q1, and features a high-stakes bank robbery?",
    options: ["a) Heat", "b) The Town", "c) Inside Man", "d) The Dark Knight"],
    hint: "The movie involves a detailed plan to rob a bank while evading capture.",
    answer: "c) Inside Man",
    hintQuestion: `
      <p>What will be the result of the following operation?</p>
      <pre><code>
a = [1, 2, [3, 4]]
b = a
b[2][0] = 7
a[1] = 5
print(b)
      </code></pre>
    `,
    hintAnswer: "[1, 5, [7, 4]]"
  },
  {
    question: "Which 2019 Marvel film concludes the storyline that began with the film in Q6, and features the final battle against a powerful antagonist?",
    options: ["a) Spider-Man: Far From Home", "b) Avengers: Endgame", "c) Captain Marvel", "d) Guardians of the Galaxy Vol. 3"],
    hint: "The movie marks the culmination of the Infinity Saga.",
    answer: "b) Avengers: Endgame",
    hintQuestion: `
      <p>Evaluate the following logical expression:</p>
      <pre><code>
not (True and False) or (False and True)
      </code></pre>
    `,
    hintAnswer: "True"
  },
  {
    question: "Which 2023 film, directed by the same filmmaker as Q8, depicts a gritty take on a classic fairy tale character and explores themes of revenge?",
    options: ["a) The Little Mermaid", "b) Guillermo del Toro's Pinocchio", "c) The Banshees of Inisherin", "d) The Northman"],
    hint: "The protagonist of this film is a wooden puppet who wants to become a real boy.",
    answer: "b) Guillermo del Toro's Pinocchio",
    hintQuestion: `
      <p>What does the following code return when called with the argument 7?</p>
      <pre><code>
def func(x):
  return x if x < 5 else x - 5
print(func(7))
      </code></pre>
    `,
    hintAnswer: "2"
  },
];


export default function Question() {
    const { id } = useParams();
    const navigate = useNavigate();
    const questionId = parseInt(id, 10) - 1; // Convert id to zero-based index
    const [hintSolved,setSolved] =useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const [score, setScore] = useState(0);
    const [hintVisible, setHintVisible] = useState(false);
    const [usedHint, setUsedHint] = useState(false);
    const [value, setValue] = useState("");
   

    function handleChange(e) {
      if(e.target.value===questionsArray[questionId].hintAnswer){
        setSolved(true);}
        setValue(e.target.value);
        
    }
    if (questionId < 0 || questionId >= questionsArray.length) {
      return <div>Question not found</div>;
    }
  
    const currentQuestion = questionsArray[questionId];
  
    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
    };
  
    const handleSubmit = () => {
      let scoreUpdate = 0;
      let correctAnswer = false;
      if (selectedOption === currentQuestion.answer) {
        scoreUpdate = usedHint ? 3 : 5;
        correctAnswer = true;
      }
      alert(`Answer has been submitted!`);
      navigate(`/map`, { state: { correctAnswer, questionId, scoreUpdate } });
    };
  
    const handleHint = () => {
      setHintVisible(!hintVisible);
      setUsedHint(true);
    };
  
    return (
      <div className="quiz">
        <h2>{currentQuestion.question}</h2>
         {hintVisible && <div className='ques-hint'   >{parse(currentQuestion.hintQuestion)}
          <label>Output</label>
          <br /><input value={value} onChange={handleChange} />
         </div> }
        {hintSolved && hintVisible && <div className="hint">Hint: {currentQuestion.hint}</div>}
        <div>
          {currentQuestion.options.map((option, index) => (
            <label key={index}>
              <input
                type="radio"
                value={option}
                checked={selectedOption === option}
                onChange={handleOptionChange}
              />
              {option}
            </label>
          ))}
        </div>
        <div className="quiz-buttons">
          <button>Home</button>
          <button onClick={handleSubmit}>Submit</button>
        </div>
        <button className='hint-btn' onClick={handleHint}>Hint</button>
      </div>
    );
  }


