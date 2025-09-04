import { createContext, useState, useEffect } from "react";
import fetchProducts from "../data/fetchProducts";

export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
        .then((data) => setProducts(data))
        .finally(() => setLoading(false));
  }, []);

  return (
      <ShopContext.Provider value={{ products, setProducts, loading }}>
        {children}
      </ShopContext.Provider>
  );
};