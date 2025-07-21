import sevensegment from "../assets/7segment.jpg";
import cheragh from "../assets/cheragh.jpg";
import dorbin from "../assets/dorbin.jpg";
import infrared from "../assets/Infrared.jpg";
import PIR from "../assets/PIR.jpg";
import touch from "../assets/touch.jpg";

const fetchProducts = async () => {
  
  try {
   
    const response = await fetch("http://localhost:8080/api/get_products.php");
    const data = await response.json();
    const productsArray = data.products;
    console.log("📦 fetchProducts called");

    // چک کردن اینکه داده‌های API به‌صورت آرایه دریافت شده‌اند
    if (!Array.isArray(productsArray)) {
      console.error("خطا: داده‌های دریافت‌شده آرایه نیستند!", data);
      return [];
    }

    // لیست تصاویر برای تخصیص تصادفی
    const images = [sevensegment, cheragh, dorbin, infrared, PIR, touch];

    // پردازش داده‌ها
    return productsArray.map((product, index) => ({
      id: product.ProductId,
      productName: product.ProductName,
      image: images[index % images.length], // اختصاص تصویر تصادفی
      buyPrice: product.BuyPrice,
      twentyProfitPrice: product.TwentyProfit,
      salePrice: product.SalePrice,
    }));
  } catch (error) {
    console.error("خطا در دریافت کالاها:", error);
    return [];
  }
};

// به‌جای `PRODUCTS`، این تابع را `export` کنید
export default fetchProducts;