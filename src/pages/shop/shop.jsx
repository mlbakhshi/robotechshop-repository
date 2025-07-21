import React, { useEffect, useState } from "react";
import fetchProducts from "../../data/fetchProducts";
import Product from "./product";

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // برای متن سرچ
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        fetchProducts().then((data) => {
            setProducts(data);
            setFilteredProducts(data); // اول همه رو نشون بده
        });
    }, []);

    // وقتی متن سرچ تغییر کرد، فیلتر کن
    const handleSearch = () => {
        const filtered = products.filter((product) => {
            if (!product.productName) return false; // اگر نام وجود نداشت، فیلترش کن
            return product.productName.toLowerCase().includes(searchTerm.toLowerCase());
        });
        setFilteredProducts(filtered);
    };

    return (
        <div>
            <h1>فروشگاه</h1>

            {/* input و دکمه سرچ */}
            <div style={{ marginBottom: "1rem" }}>
                <input
                    type="text"
                    placeholder="جستجو کنید..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleSearch(); // سرچ با Enter هم انجام بشه
                    }}
                />
                <button onClick={handleSearch}>جستجو</button>
            </div>

            <div className="row products">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <Product key={product.id} data={product} />
                    ))
                ) : (
                    <p>هیچ کالایی یافت نشد.</p>
                )}
            </div>
        </div>
    );
};

export default Shop;