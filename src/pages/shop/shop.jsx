import React, { useEffect, useState } from "react";
import fetchProducts from "../../data/fetchProducts";
import Product from "./product";

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        fetchProducts().then((data) => {
            setProducts(data);
            setFilteredProducts(data);
        });
    }, []);

    // وقتی متن سرچ تغییر کرد، فیلتر کن
    const handleSearch = () => {
        const filtered = products.filter((product) => {
            if (!product.productName) return false;
            return product.productName.toLowerCase().includes(searchTerm.toLowerCase());
        });
        setFilteredProducts(filtered);
    };

    // تابع افزایش موجودی
    const handleIncreaseStock = async (productId) => {
        // آپدیت بدون رفرش در state
        setProducts(prev =>
            prev.map(p => p.id === productId ? { ...p, buyCount: p.buyCount + 1 } : p)
        );
        setFilteredProducts(prev =>
            prev.map(p => p.id === productId ? { ...p, buyCount: p.buyCount + 1 } : p)
        );

        // ارسال به سرور
        try {
            const response = await fetch("http://localhost:8080/api/increase_stock.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: productId, increment: 1 }),
            })
            const data = await response.json();
            if (!data.success) {
                alert("خطا در ذخیره موجودی در سرور");
            }
        } catch (error) {
            console.error(error);
            alert("ارتباط با سرور برقرار نشد");
        }
    };

    const handleDecreaseStock = async (productId) => {
        // آپدیت بدون رفرش در state
        setProducts(prev =>
            prev.map(p => p.id === productId ? { ...p, buyCount: p.buyCount - 1 } : p)
        );
        setFilteredProducts(prev =>
            prev.map(p => p.id === productId ? { ...p, buyCount: p.buyCount - 1 } : p)
        );

        // ارسال به سرور
        try {
            const response = await fetch("http://localhost:8080/api/decrease_stock.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: productId, decrement: 1 }),
            })
            const data = await response.json();
            if (!data.success) {
                alert("خطا در ذخیره موجودی در سرور");
            }
        } catch (error) {
            console.error(error);
            alert("ارتباط با سرور برقرار نشد");
        }
    };

    return (
        <div>
            <h1>فروشگاه</h1>

            <div style={{ marginBottom: "1rem" }}>
                <input
                    type="text"
                    placeholder="جستجو کنید..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
                />
                <button onClick={handleSearch}>جستجو</button>
            </div>

            <div className="row products">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <Product
                            key={product.id}
                            data={product}
                            onIncrease={() => handleIncreaseStock(product.id)}
                            onDecrease={() => handleDecreaseStock(product.id)}
                        />
                    ))
                ) : (
                    <p>هیچ کالایی یافت نشد.</p>
                )}
            </div>
        </div>
    );
};

export default Shop;