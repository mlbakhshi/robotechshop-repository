import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import Shop from './pages/shop/shop';
import Cart from './pages/cart/cart';
import Nav from './components/nav';
import { ShopContextProvider } from './context/shopContext';
import Welcom from './components/welcom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Search from './pages/search/search';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./pages/login/Login";
import Register from "./pages/register/register";

function App() {
  return (
    <div className="App">
    <ShopContextProvider>
        <Router>
          
          <Nav />
          <Welcom />
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        
        </Router>
        </ShopContextProvider>
    </div>
  );
}

export default App;
