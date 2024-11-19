import React, { lazy, Suspense, useEffect, useState } from 'react';
import './index.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Login from './components/Login'
import Signup from './components/Signup';
import { ToastContainer } from 'react-toastify';
import Home from './components/Home';
import { auth } from './components/firebase';
import Forgetpassword from './components/Forgetpassword';
import Pageloading from './components/Loading/Pageloading';

// Lazy load Login component
const Login = lazy(() => import('./components/Login'));

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              {/* Only wrap the Login route with Suspense */}
              <Route
                path="/"
                element={user ? <Navigate to="/home" /> : 
                  <Suspense fallback={<Pageloading />}>
                    <Login />
                  </Suspense>
                }
              />
              {/* Other routes do not need Suspense */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/home" element={<Home />} />
              <Route path="/forget" element={<Forgetpassword />} />
            </Routes>
            <ToastContainer />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
