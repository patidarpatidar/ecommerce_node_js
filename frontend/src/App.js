import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Nav from './components/Nav';
import Signup from './components/Signup';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';
import PrivateComponent from './components/PrivateComponent';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
      <Routes>
        <Route element={<PrivateComponent/>}>
          <Route path='/' element={<ProductList/>}/>
          <Route path='/add' element={<AddProduct/>}/>
          <Route path='/update/:id' element={<UpdateProduct/>}/>
          <Route path='/logout' element={<h1>logout...</h1>}/>
          <Route path='/profile' element={<h1>profile...</h1>}/>
        </Route>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
    
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
