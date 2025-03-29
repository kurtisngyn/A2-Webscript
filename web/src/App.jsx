import { Routes, Route, Navigate } from 'react-router';
import AllCandies from './pages/AllCandies'
import Header from './components/Header';
import Footer from './components/Footer';
 


function App() {

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<AllCandies />} />
        <Route path="/Candy" element={<Navigate to="/" />} />
  
      </Routes>
      <Footer />

    </ div>
  )
}

export default App
