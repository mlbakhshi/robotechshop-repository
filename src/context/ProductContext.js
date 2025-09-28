import React, { createContext, useContext, useRef, useState } from "react";
import fetchProducts from "../data/fetchProducts"; // fallback
import Edit from "../components/edit";

const ProductContext = createContext();

export function ProductProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    // نگه داشتن تابع refetch برای احضار بعد از ذخیره
    const editingRefetchRef = useRef(null);

    const mapProductToFormValues = (p) => ({
        ProductName: p.productName || p.ProductName || "",
        StorageId: p.StorageId || "",
        Category: p.Category || "",
        Famous: p.Famous || "",
        BuyCount: p.buyCount ?? p.BuyCount ?? 0,
        BuyPrice: p.buyPrice ?? p.BuyPrice ?? "",
        TwentyProfit: p.twentyProfitPrice ?? p.TwentyProfit ?? "",
        SalePrice: p.salePrice ?? p.SalePrice ?? "",
        ProductImg:  p.ProductImg || null,
        id: p.id ?? p.ProductId ?? null,
    });

    const fetchProductById = async (id) => {
        const res = await fetch(
            // `http://localhost:8080/api/get_product.php?id=${id}`
            `/api/get_product.php?id=${id}`
        );
        const data = await res.json();
        if (!data.success) throw new Error(data.message || "محصول یافت نشد");
        return data.product;
    };

    const openEdit = async (product, options = {}) => {
        try {
            const fullProduct = await fetchProductById(product.id);
            setEditingProduct(mapProductToFormValues(fullProduct));
            editingRefetchRef.current = typeof options.refetch === "function" ? options.refetch : null;
        } catch (err) {
            alert(err.message);
        }
    };

    const handleClose = () => {
        setEditingProduct(null);
        editingRefetchRef.current = null;
    };

    // وقتی روی Save در Edit زده شد: مودال بسته میشه و اگر refetch داده شده اجرا می‌شود
    const handleSaved = async () => {
        setEditingProduct(null);

        try {
            if (editingRefetchRef.current) {
                const updated = await editingRefetchRef.current();
                if (Array.isArray(updated)) setProducts(updated);
            } else {
                // fallback: اگر refetch داده نشده سعی کن fetchProducts کلی رو بزنی (ممکنه به پارامتر نیاز داشته باشه)
                const updated = await fetchProducts();
                if (Array.isArray(updated)) setProducts(updated);
            }
        } catch (err) {
            console.error("handleSaved error:", err);
        } finally {
            editingRefetchRef.current = null;
        }
    };

    const handleIncreaseStock = async (productId) => {
        setProducts(prev => prev.map(p => p.id === productId ? { ...p, buyCount: p.buyCount + 1 } : p));

        try {
            const res = await fetch(
                // "http://localhost:8080/api/increase_stock.php"
                "/api/increase_stock.php"
                , {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: productId, increment: 1 }),
            });
            const data = await res.json();
            if (!data.success) alert("خطا در ذخیره موجودی در سرور");
        } catch (err) {
            console.error(err);
            alert("ارتباط با سرور برقرار نشد");
        }
    };

    const handleDecreaseStock = async (productId) => {
        setProducts(prev => prev.map(p => p.id === productId ? { ...p, buyCount: p.buyCount - 1 } : p));

        try {
            const res = await fetch(
                // "http://localhost:8080/api/decrease_stock.php"
                "/api/decrease_stock.php"
                , {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: productId, decrement: 1 }),
            });
            const data = await res.json();
            if (!data.success) alert("خطا در ذخیره موجودی در سرور");
        } catch (err) {
            console.error(err);
            alert("ارتباط با سرور برقرار نشد");
        }
    };

    return (
        <ProductContext.Provider value={{
            products,
            setProducts,
            openEdit,
            editingProduct,
            handleClose,
            handleSaved,
            handleIncreaseStock,
            handleDecreaseStock
        }}>
            {children}

            {/* مودال مرکزی — فقط یک‌جا رندر می‌شود */}
            {editingProduct && (
                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "rgba(0,0,0,0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 9999,
                        padding: 20,
                    }}
                >
                    <div style={{
                        background: "white",
                        borderRadius: 8,
                        maxWidth: 900,
                        width: "100%",
                        maxHeight: "90vh",
                        overflow: "auto",
                        padding: 16
                    }}>
                        <Edit
                            productToEdit={editingProduct}
                            onClose={handleClose}
                            onSaved={handleSaved}
                        />
                    </div>
                </div>
            )}
        </ProductContext.Provider>
    );
}

export function useProducts() {
    return useContext(ProductContext);
}
