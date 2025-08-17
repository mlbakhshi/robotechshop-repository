import {getCookie}  from "../../utility/cookie";
const Product = ({ data }) => {
    const userId = getCookie("userId");

    const formatNumber = (num) => {
        if (num === null || num === undefined || isNaN(num)) return "";
        return Math.floor(num).toLocaleString("fa-IR");
    };

    return (
        <div className="product-card">
            <img src={data.image} alt={data.productName} />
            <h3 className="mt-3">{data.productName}</h3>

            {/* فقط اگر کوکی وجود داشته باشه */}
            {userId && <p>قیمت خرید: {formatNumber(data.buyPrice)} تومان</p>}
            {userId && <p>قیمت رسمی: {formatNumber(data.twentyProfitPrice)} تومان</p>}
            <p>قیمت فروش: {formatNumber(data.salePrice)} تومان</p>
            <p>موجودی: {formatNumber(data.buyCount)}</p>
        </div>
    );
};

export default Product;