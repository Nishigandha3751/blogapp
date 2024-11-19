import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Create from './components/Create';
import Read from './components/Read';
import 'bootstrap/dist/css/bootstrap.min.css';
import Edit from './components/Edit';
import { Navbar } from 'react-bootstrap';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Navbar/>
    
      <Routes>
      <Route path='/' element={<Create/>}></Route>
        <Route path='/read' element={<Read/>}></Route>
        <Route path='/Edit/:id' element={<Edit/>}></Route>
      </Routes>
      
      
    </div>
    </BrowserRouter>
  );
}

export default App;