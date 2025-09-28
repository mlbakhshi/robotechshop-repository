import { useLocation, useParams } from "react-router-dom";
import Product from "../shop/product";
import React, { useEffect } from "react";
import fetchCategoriesProducts from "../../data/fetchCategoriesProducts";
import { useProducts } from "../../context/ProductContext";

function CategoryProducts() {
    const { products, setProducts, openEdit, handleIncreaseStock, handleDecreaseStock } = useProducts();
    const { categoryId } = useParams();
    const location = useLocation();
    const categoryName = location.state?.categoryName || "دسته‌بندی";

    useEffect(() => {
        fetchCategoriesProducts(categoryId).then(data => setProducts(data));
    }, [categoryId, setProducts]);


    return (
        <div className="common-box mt-3">
            <p className="h2">
                لیست {categoryName}
            </p>
            <div className="row products">
                {products.length > 0 ? (
                    products.map((product) => (
                        <Product
                            key={product.id}
                            data={product}
                            onIncrease={() => handleIncreaseStock(product.id)}
                            onDecrease={() => handleDecreaseStock(product.id)}
                            onEdit={() => openEdit(product, { refetch: async () => await fetchCategoriesProducts(categoryId) })}
                        />
                    ))
                ) : (
                    <p>هیچ کالایی یافت نشد.</p>
                )}
            </div>
        </div>
    );
}

export default CategoryProducts;
