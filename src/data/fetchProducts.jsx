import sevensegment from "../assets/7segment.jpg";
import cheragh from "../assets/cheragh.jpg";
import dorbin from "../assets/dorbin.jpg";
import infrared from "../assets/Infrared.jpg";
import PIR from "../assets/PIR.jpg";
import touch from "../assets/touch.jpg";

// حالا globalValue به عنوان پارامتر گرفته می‌شود
const fetchProducts = async (globalValue) => {
  try {
    const response = await fetch(`${globalValue}/api/get_products.php`);
    const data = await response.json();
    const productsArray = data.products;
    console.log("📦 fetchProducts called");

    if (!Array.isArray(productsArray)) {
      console.error("خطا: داده‌های دریافت‌شده آرایه نیستند!", data);
      return [];
    }

    const images = [sevensegment, cheragh, dorbin, infrared, PIR, touch];

    return productsArray.map((product, index) => ({
      id: product.id,
      productName: product.ProductName,
      image: product.ProductImg ? product.ProductImg : images[index % images.length],
      buyPrice: product.BuyPrice,
      twentyProfitPrice: product.TwentyProfit,
      salePrice: product.SalePrice,
      buyCount: product.BuyCount,
      StorageId: product.StorageId,
    }));
  } catch (error) {
    console.error("خطا در دریافت کالاها:", error);
    return [];
  }
};

export default fetchProducts;