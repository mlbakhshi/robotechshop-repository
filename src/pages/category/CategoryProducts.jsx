import {useLocation, useParams} from "react-router-dom";
import Product from "../shop/product";
import React, {useEffect, useState} from "react";
import fetchCategoriesProducts from "../../data/fetchCategoriesProducts";

function CategoryProducts() {
    const { categoryId } = useParams(); // پارامتر از URL
    const [products, setProducts] = useState([]);
    const location = useLocation();
    const categoryName = location.state?.categoryName || "دسته‌بندی";

    useEffect(() => {
        fetchCategoriesProducts(categoryId).then((data) => {
            setProducts(data);
        });
    }, [categoryId]);

    return (
        <div>
            <p className="h2">
                لیست {categoryName}
            </p>
            <div className="row products">
                {products.length > 0 ? (
                    products.map((product) => (
                        <Product
                            key={product.id}
                            data={product}
                            // onIncrease={() => handleIncreaseStock(product.id)}
                            // onDecrease={() => handleDecreaseStock(product.id)}
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