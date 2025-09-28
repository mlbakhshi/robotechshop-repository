import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import Shop from './pages/shop/shop';
import Cart from './pages/cart/cart';
import Nav from './components/nav';
import { ShopContextProvider } from './context/shopContext';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Search from './pages/search/search';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./pages/login/Login";
import Register from "./pages/register/register";
import Edit from "./components/edit";
import {GlobalProvider,} from "./context/GlobalContext";
import CategoryProducts from "./pages/category/CategoryProducts";
import {useDeviceType} from "./hook/useDeviceType";
import {useEffect} from "react";
import ProductDetail from "./pages/product/ProductDetail";
import {ProductProvider} from "./context/ProductContext";


function App() {

  const device = useDeviceType();

  useEffect(() => {
    if (device === "mobile") {
      import("./theme.css");
    } else {
      import("./index.css");
    }
  }, [device]);

  return (
    <div className="App">
    <ShopContextProvider>
    <GlobalProvider>
        <Router>
        <ProductProvider>
          <Nav />
          <Routes>
            <Route path="/shop" element={<Shop />} />
            <Route path="/" element={<Navigate to="/shop" />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/category/:categoryId" element={<CategoryProducts />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </ProductProvider>
        </Router>
    </GlobalProvider>
        </ShopContextProvider>
    </div>
  );
}

export default App;
