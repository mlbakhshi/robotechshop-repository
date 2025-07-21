import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import Edit from "../../components/edit";

const Search = () => {
  const [existingProduct, setExistingProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  const initialValues = {
    ProductName: "",
  };

  const validationSchema = Yup.object({
    ProductName: Yup.string().required("لطفا نام کالا را وارد کنید"),
  });

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setShowEditForm(true);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/check_product.php?ProductName=${values.ProductName}`
      );
      const data = await response.json();

      if (data.exists && Array.isArray(data.products) && data.products.length > 0) {
        setExistingProduct(data.products);
        setShowEditForm(false);
      } else {
        setExistingProduct([]);
        setShowEditForm(true);
      }
    } catch (error) {
      alert("خطا در دریافت اطلاعات از سرور");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* 🔹 فرم جستجو */}
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form>
          <div style={{ marginLeft: "30px", marginRight: "30px" }}>
            <h2 style={{ marginTop: "25px", marginBottom: "25px", textAlign: "center" }}>
              کالای جدید
            </h2>

            <div className="d-flex flex-row mb-3" style={{ textAlign: "right" }}>
              <div className="col-md-4">
                <label className="m-1">نام کالا</label>
                <Field type="text" name="ProductName" placeholder="نام کالا" />
              </div>
            </div>

            <div>
              <button type="submit"> جستجو </button>
            </div>

            <hr />
          </div>
        </Form>
      </Formik>

      {/* 🔹 نمایش محصولات مشابه */}
      {existingProduct && existingProduct.length > 0 && !showEditForm && (
        <div style={{ border: "1px solid gray", padding: "10px", marginTop: "10px" }}>
          <h3>
            {existingProduct.length} کالای مشابه پیدا شد. اگر قصد ویرایش دارید،
            یکی را انتخاب کنید. در غیر این‌صورت روی دکمه "کالای جدید" کلیک کنید.
          </h3>
          {existingProduct.map((product, index) => (
            <div key={index} style={{ marginBottom: "10px", padding: "5px", borderBottom: "1px solid lightgray" }}>
              <p>
                <strong>نام کالا:</strong> {product.ProductName}
              </p>
              <p>
                <strong>دسته‌بندی:</strong> {product.Category}
              </p>
              <button type="button" onClick={() => handleEditClick(product)}>
                ویرایش
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 🔹 نمایش فرم ویرایش بیرون از `Formik` */}
      {showEditForm && (
  <>
    {selectedProduct ? (
      <Edit productToEdit={selectedProduct} />
    ) : (
      <Edit />
    )}
  </>
)}
    </>
  );
};

export default Search;