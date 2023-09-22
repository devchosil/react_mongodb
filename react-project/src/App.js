
import './App.css';
import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate, useLocation } from 'react-router-dom';
import Main from './pages/Main';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Test from './pages/Test';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isLogin = () =>  setIsLoggedIn(true);
  const isLogout = () => setIsLoggedIn(false);

  return (
    <BrowserRouter>
        <div className="App">
          <Routes>
            <Route
              path="/"
              element={isLoggedIn ? <Main isLogout={isLogout} isLoggedIn={isLoggedIn}/> : <Navigate to="/login" replace />} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/login" element={<Login isLogin={isLogin}/>} />
            <Route path="/test" element={<Test isLogout={isLogout} isLoggedIn={isLoggedIn}/>} />
          </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
