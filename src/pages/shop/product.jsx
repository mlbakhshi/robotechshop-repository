const Product = ({ data }) => {
    console.log("Product data:", data); // این خط رو اضافه کن
    return (
        <div className="product-card">
            <img src={data.image} alt={data.productName}/>
            <h3>{data.productName}</h3>
            <p>قیمت خرید: {Math.floor((data.buyPrice))} تومان</p>
            <p>قیمت رسمی: {Math.floor(data.twentyProfitPrice)} تومان</p>
            <p>قیمت فروش: {Math.floor(data.salePrice)} تومان</p>
        </div>
    );
};

export default Product;