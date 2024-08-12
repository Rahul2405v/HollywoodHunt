import { BrowserRouter,Routes,Route } from 'react-router-dom';

import Question from './components/Question';
import Start from './components/Start';
import Map from './components/Map'
import '../src/App.css'
import Completion from './components/Completion';

import { useState,useEffect } from 'react';

function App() {
 
 
  
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Start/>}/>
        <Route path='/question/:id' element={<Question/>}/>
       
        <Route path='/map' element={<Map/>}/>
       
        <Route path="/completion" element={<Completion />} />
      
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App; 