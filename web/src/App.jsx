import { Routes, Route, Navigate } from 'react-router';
import AllCandies from './pages/AllCandies'
import Header from './components/Header';
import Footer from './components/Footer';
 import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';


function App() {

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/store" element={<AllCandies />} />
        <Route path="/Candy" element={<Navigate to="/" />} />
  
      </Routes>
      <Footer />

    </ div>
  )
}

export default App
