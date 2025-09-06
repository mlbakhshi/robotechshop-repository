import React, { useEffect, useState } from "react";
import fetchProducts from "../../data/fetchProducts";
import Product from "./product";
import { useGlobal } from "../../context/GlobalContext";
import fetchCategories from "../../data/fetchCategories";
import { Link, useLocation } from "react-router-dom";

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const { globalValue } = useGlobal();
    const location = useLocation();

    // دریافت محصولات
    useEffect(() => {
        fetchProducts(globalValue).then((data) => {
            setProducts(data);
        });
    }, [globalValue]);

    // دریافت دسته‌بندی‌ها
    useEffect(() => {
        fetchCategories().then((data) => setCategories(data));
    }, []);

    // فیلتر محصولات بر اساس search query
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const searchTerm = searchParams.get("search")?.toLowerCase() || "";

        console.log("SearchTerm:", searchTerm);
        if (!searchTerm) {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(
                products.filter(p => p.productName?.toLowerCase().includes(searchTerm))
            );
        }
    }, [location.search, products]);

    const handleIncreaseStock = async (productId) => {
        setProducts(prev => prev.map(p => p.id === productId ? { ...p, buyCount: p.buyCount + 1 } : p));
        setFilteredProducts(prev => prev.map(p => p.id === productId ? { ...p, buyCount: p.buyCount + 1 } : p));

        try {
            const response = await fetch("http://localhost:8080/api/increase_stock.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: productId, increment: 1 }),
            });
            const data = await response.json();
            if (!data.success) alert("خطا در ذخیره موجودی در سرور");
        } catch (error) {
            console.error(error);
            alert("ارتباط با سرور برقرار نشد");
        }
    };

    const handleDecreaseStock = async (productId) => {
        setProducts(prev => prev.map(p => p.id === productId ? { ...p, buyCount: p.buyCount - 1 } : p));
        setFilteredProducts(prev => prev.map(p => p.id === productId ? { ...p, buyCount: p.buyCount - 1 } : p));

        try {
            const response = await fetch("http://localhost:8080/api/decrease_stock.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: productId, decrement: 1 }),
            });
            const data = await response.json();
            if (!data.success) alert("خطا در ذخیره موجودی در سرور");
        } catch (error) {
            console.error(error);
            alert("ارتباط با سرور برقرار نشد");
        }
    };

    const categoryImages = {
        1: "images/module.webp",
        2: "images/robotic.jpg",
        3: "images/sensors.webp",
        4: "images/device.png"
    };

    return (
        <div>
            <div className="categories-grid mt-3">
                {categories.length > 0 ? (
                    categories.map(cat => (
                        <Link
                            key={cat.categoryId}
                            to={`/category/${cat.categoryId}`}
                            state={{ categoryName: cat.categoryName }}
                            className="category-card"
                            style={{ backgroundImage: `url('${categoryImages[cat.categoryId]}')` }}
                        >
                            <span>{cat.categoryName}</span>
                        </Link>
                    ))
                ) : <p>هیچ کالایی یافت نشد.</p>}
            </div>

            <hr/>
            <p className="h2">لیست کالاها</p>
            <div className="row products">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
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
