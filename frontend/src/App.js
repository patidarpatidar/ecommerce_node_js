import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Nav from './components/Nav';
import Signup from './components/Signup';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path='/' element={<h1>products...</h1>}/>
        <Route path='/add' element={<h1>add products...</h1>}/>
        <Route path='/update' element={<h1>update products...</h1>}/>
        <Route path='/logout' element={<h1>logout...</h1>}/>
        <Route path='/profile' element={<h1>profile...</h1>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
    
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
