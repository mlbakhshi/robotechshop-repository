const fetchCategories = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/get_categories.php");
    // const response = await fetch(`/api/get_categories.php`);
    const data = await response.json();
    const categoriesArray = data.categories;

    if (!Array.isArray(categoriesArray)) {
      console.error("خطا: داده‌های دریافت‌شده آرایه نیستند!", data);
      return [];
    }
console.log(categoriesArray)
    return categoriesArray.map((category, index) => ({
      id: category.id,
      categoryId: category.CategoryId,
      categoryName: category.CategoryName,

    }));
  } catch (error) {
    console.error("خطا در دریافت کالاها:", error);
    return [];
  }
};

export default fetchCategories;