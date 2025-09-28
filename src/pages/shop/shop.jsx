import React, { useEffect, useState } from "react";
import fetchProducts from "../../data/fetchProducts";
import Product from "./product";
import { useGlobal } from "../../context/GlobalContext";
import fetchCategories from "../../data/fetchCategories";
import { Link, useLocation } from "react-router-dom";
import Edit from "../../components/edit";
import { useProducts } from "../../context/ProductContext";

const Shop = () => {
    const { products, setProducts, editingProduct, openEdit, handleClose, handleSaved, handleIncreaseStock, handleDecreaseStock } = useProducts();
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const { globalValue } = useGlobal();
    const location = useLocation();
    // const [editingProduct, setEditingProduct] = useState(null);

    // دریافت محصولات
    useEffect(() => {
        fetchProducts(globalValue).then(data => setProducts(data));
    }, [globalValue, setProducts]);

    // دریافت دسته‌بندی‌ها
    useEffect(() => {
        fetchCategories().then((data) => setCategories(data));
    }, []);

    // فیلتر محصولات بر اساس search query
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const searchTerm = searchParams.get("search")?.toLowerCase() || "";

        if (!searchTerm) {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(
                products.filter(p => p.productName?.toLowerCase().includes(searchTerm))
            );
        }
    }, [location.search, products]);


    const categoryImages = {
        1: "images/module.webp",
        2: "images/robotic.jpg",
        3: "images/sensors.webp",
        4: "images/device.png",
        6: "images/abzar.jfif",
        7: "images/kit.jfif"
    };

    return (
        <div className="common-box">
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
                            onEdit={() => openEdit(product, { refetch: async () => await fetchProducts(globalValue) })}
                        />
                    ))
                ) : (
                    <p>هیچ کالایی یافت نشد.</p>
                )}

                {/*{editingProduct && (*/}
                {/*    // یک modal ساده*/}
                {/*    <div*/}
                {/*        style={{*/}
                {/*            position: "fixed",*/}
                {/*            inset: 0,*/}
                {/*            background: "rgba(0,0,0,0.5)",*/}
                {/*            display: "flex",*/}
                {/*            alignItems: "center",*/}
                {/*            justifyContent: "center",*/}
                {/*            zIndex: 9999,*/}
                {/*            padding: 20,*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        <div style={{*/}
                {/*            background: "white",*/}
                {/*            borderRadius: 8,*/}
                {/*            maxWidth: 900,*/}
                {/*            width: "100%",*/}
                {/*            maxHeight: "90vh",*/}
                {/*            overflow: "auto",*/}
                {/*            padding: 16*/}
                {/*        }}>*/}

                {/*            <Edit*/}
                {/*                productToEdit={editingProduct}*/}
                {/*                onClose={handleClose}*/}
                {/*                onSaved={() => handleSaved(globalValue)}*/}
                {/*            />*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*)}*/}
            </div>
        </div>
    );
};

export default Shop;
