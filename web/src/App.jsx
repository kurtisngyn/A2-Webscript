import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router';
import AllCandies from './pages/AllCandies'
import Header from './components/Header';
import Footer from './components/Footer';

import authRequired from './pages/authRequired';

 import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

const ProtectedAllCandies = authRequired(AllCandies);

function App() {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Passed into the header to log out
  const handleLogout = () => {

    localStorage.removeItem("jwt-token");
    setIsAuthenticated(false);

    navigate("/sign-in");

  }

  // Passed into the header to Sign-in page to login
  const handleLogin = () => {

    setIsAuthenticated(true);
    navigate("/store");

  }

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwt-token");
    if (jwtToken) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div>
      <Header handleLogout={handleLogout} isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in"
          element={<SignIn handleLogin={handleLogin} />} />
        <Route path="/store" element={<ProtectedAllCandies />} />
        <Route path="/Candy" element={<navigate to="/" />} />
  
      </Routes>
      <Footer />

    </ div>
  )
}

export default App
