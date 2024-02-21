import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import './App.css';
import Books from './components/Books';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/register" element={<SignupPage/>} />
        <Route path="/" element={<LoginPage/>} />
        <Route path="/books" element={<Books/>} />
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
