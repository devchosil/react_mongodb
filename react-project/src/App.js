
import './App.css';
import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate, useLocation } from 'react-router-dom';
import Main from './pages/Main';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Test from './pages/Test';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <BrowserRouter>
        <div className="App">
          <Routes>
            {/* <Route
              path="/"
              element={
                isLoggedIn ? (
                  <Outlet />
                ) : (
                  // Redirect to /login if not logged in
                  <Navigate to="/login" replace />
                )
              }
            >
              <Route index element={<Main />} />
            </Route> */}
          <Route
            path="/"
            element={isLoggedIn ? <Main /> : <Navigate to="/login" replace />}
          />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/test" element={<Test/>} />
          </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
