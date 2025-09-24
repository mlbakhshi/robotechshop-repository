// src/components/Product.jsx
import { getCookie } from "../../utility/cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Product = ({ data, onIncrease, onDecrease, onEdit }) => {
    const userId = getCookie("userId");

    const formatNumber = (num) => {
        if (num === null || num === undefined || isNaN(num)) return "";
        return Math.floor(num).toLocaleString("fa-IR");
    };

    return (
        <div className="product-card" style={{ position: "relative" }}>
            <div style={{ position: "relative", display: "inline-block" }}>
                <img src={data.image} alt={data.productName} className="img-product" />
            </div>

            <h3 className="mt-3">{data.productName}</h3>
            {userId && <p>قیمت خرید: {formatNumber(data.buyPrice)} ت</p>}
            {userId && <p>قیمت رسمی: {formatNumber(data.twentyProfitPrice)} ت</p>}
            <p> {formatNumber(data.salePrice)} تومان</p>

            <p style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center" }}>
                {userId && (
                    <button
                        type="button"
                        onClick={onIncrease}
                        style={{
                            backgroundColor: "green",
                            border: "none",
                            borderRadius: "50%",
                            width: "30px",
                            height: "30px",
                            cursor: "pointer",
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        aria-label="increase"
                    >
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                )}

                موجودی: {formatNumber(data.buyCount)}

                {userId && data.buyCount > 0 && (
                    <button
                        type="button"
                        onClick={onDecrease}
                        style={{
                            backgroundColor: "red",
                            border: "none",
                            borderRadius: "50%",
                            width: "30px",
                            height: "30px",
                            cursor: "pointer",
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        aria-label="decrease"
                    >
                        <FontAwesomeIcon icon={faMinus} />
                    </button>
                )}
            </p>

            <p>
                کد کالا: <span style={{ color: "gray" }}>{(data.StorageId || "").replace(/%/g, "")}</span>
            </p>

            {/* دکمه ویرایش */}
            {userId && <div className="edit-position" >
                <button
                    onClick={() => onEdit && onEdit(data)}
                    style={{
                        backgroundColor: "#007bff",
                        border: "none",
                        borderRadius: 6,
                        padding: "6px 10px",
                        cursor: "pointer",
                        color: "white",


                    }}
                    aria-label="edit-product"
                >
                    <FontAwesomeIcon icon={faEdit} style={{ marginLeft: 6 }} />
                </button>
            </div>}
        </div>
    );
};

export default Product;
