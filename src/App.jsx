
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from './components/Register';
import PlayerDetails from './components/PlayerDetails';
import Dashboard from './components/Dashboard';
import Court from './components/Court';
import BookGym from './components/BookGym';
import Trainer from './components/Trainer';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path="/playerDetails" element={<PlayerDetails />} />
        <Route path="/court" element={<Court />} />
        <Route path="/bookGym" element={<BookGym />} />
        <Route path ="/trainer" element={<Trainer />} />
             </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
