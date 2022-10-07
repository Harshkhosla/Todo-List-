import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
// import Navebar from './components/Navebar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
// import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';


function App() {
  return (
    <>
      <NoteState>


        <Router>
         
         

            <Routes>

              {/* <Route exact path="/" element={<Signup />} /> */}
              <Route exact path="/" element={<Home />} />
              <Route exact path="/pear" element={<Login/>} />
              <Route exact path="/bat" element={<Signup/>} />
              <Route exact path="/about" element={<About />} />
            </Routes>
          
        </Router>
      </NoteState>



    </>
  )
}

export default App; 
