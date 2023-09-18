
import './App.css';
import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Test from './pages/Test';


function App() {

  return (
    <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Main/>} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/test" element={<Test/>} />
          </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
