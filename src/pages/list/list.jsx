import React, { useEffect, useState } from "react";
import { Formik, Field, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import NumberFormatInput from "../../components/NumberFormatInput";
import {useGlobal} from "../../context/GlobalContext";

const ProfitCalculator = ({ checkExistingProduct }) => {
  const { values, setFieldValue } = useFormikContext();

  useEffect(() => {
    if (values.BuyPrice) {
      const buyPrice = parseFloat(values.BuyPrice);
      if (!isNaN(buyPrice)) {
        const profit = buyPrice * 1.2;
        setFieldValue("TwentyProfit", profit.toFixed(0));
      }
    }
  }, [values.BuyPrice, setFieldValue]);

  useEffect(() => {
    if (values.ProductName) {
      checkExistingProduct(values.ProductName);
    }
  }, [values.ProductName, checkExistingProduct]);

  return null;
};

const DatePickerField = ({ field, form }) => {
  return (
    <DatePicker
      value={field.value}
      onChange={(date) => form.setFieldValue(field.name, date?.toString())}
      calendar={persian}
      locale={persian_fa}
      format="YYYY/MM/DD"
    />
  );
};

const List = () => {
  const [existingProduct, setExistingProduct] = useState(null);
  const { globalValue, setGlobalValue } = useGlobal();
  const checkExistingProduct = async (productName) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/check_product.php?ProductName=${productName}`
      );
      // const response = await fetch(
      //   // `/api/check_product.php?ProductName=${productName}`
      //   `${globalValue}/api/check_product.php?ProductName=${productName}`
      // );
      const data = await response.json();

      // console.log("Product Check Response:", data); // برای دیباگ

      if (data.exists) {
        setExistingProduct(data.product);
      } else {
        setExistingProduct(null);
      }
    } catch (error) {
      console.error("Error checking existing product:", error);
    }
  };

  const initialValues = {
    ProductName: "",
    StorageId: "",
    Category: "",
    Famous: "",
    BuyCount: 0,
    BuyDate: "",
    BuyPrice: "",
    TwentyProfit: "",
    SalePrice: "",
    Comment: "",
    ProductImg: null,
  };

  const validationSchema = Yup.object({
    ProductName: Yup.string().required("لطفا نام کالا را وارد کنید"),
    StorageId: Yup.string(),
    Category: Yup.string().required("لطفا دسته‌بندی را وارد کنید"),
    Famous: Yup.string(),
    Comment: Yup.string(),
    BuyCount: Yup.number()
      .required("لطفا تعداد خرید را وارد کنید")
      .positive()
      .integer(),
    BuyDate: Yup.string().required("لطفا تاریخ خرید را وارد کنید"),
    BuyPrice: Yup.string().required("لطفا قیمت خرید را وارد کنید"),
    TwentyProfit: Yup.string().required("لطفا سود ۲۰ درصد را وارد کنید"),
    SalePrice: Yup.string().required("لطفا قیمت فروش را وارد کنید"),
    ProductImg: Yup.mixed(),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      console.log("Values being sent to PHP:", values);
      const formData = new FormData();
      for (const key in values) {
        if (values[key] !== null) {
          formData.append(key, values[key]);
        }
      }

      const response = await fetch(
        "http://localhost:8080/api/save_product.php",
        {
          method: "POST",
          body: formData,
        }
      );
    // const response = await fetch(
    //         // "/api/save_product.php",
    //     `${globalValue}/api/save_product.php`,
    //         {
    //           method: "POST",
    //           body: formData,
    //         }
    //       );

      const textResponse = await response.text();
      console.log("Raw response from server:", textResponse);

      try {
        const result = JSON.parse(textResponse);
        console.log("Parsed JSON response:", result);

        if (result.success) {
          alert(result.message);
          resetForm();
        } else {
          alert(result.message);
        }
      } catch (e) {
        console.error("Failed to parse JSON:", e);
        alert("پاسخ سرور معتبر نیست.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("خطا در ارسال اطلاعات به سرور");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <>
          <ProfitCalculator checkExistingProduct={checkExistingProduct} />
          <Form>
            <div style={{ marginLeft: "30px", marginRight: "30px" }}>
              <h2 style={{ marginTop: "25px", marginBottom: "25px", textAlign: "center" }}>
                فرم کالای جدید
              </h2>

              <div className="d-flex flex-row mb-3" style={{ textAlign: "right" }}>
                <div className="col-md-4">
                  <label >نام کالا</label>
                  <Field type="text" name="ProductName" placeholder="نام کالا" />
                </div>
                <div className="col-md-4">
                  <label>شناسه انبار</label>
                  <Field type="text" name="StorageId" placeholder="شناسه انبار" />
                </div>
                <div className="col-md-4">
                  <label>دسته‌بندی</label>
                  <Field as="select" name="Category" className="form-control">
                    <option value="">انتخاب کنید</option>
                    <option value="1">ماژول</option>
                    <option value="2">سازه</option>
                    <option value="3">سنسور</option>
                    <option value="4">قطعه</option>
                  </Field>
                </div>
              </div>
              <div className="d-flex flex-row mb-3">
                <div className="col-md-3">
                  <label>تعداد خرید</label>
                  <Field type="text" name="BuyCount" placeholder="تعداد خرید" />
                </div>
                <div className="col-md-3">
                  <label>تاریخ خرید</label>
                  <Field name="BuyDate" component={DatePickerField} />
                </div>
              </div>

              <hr />


              <hr />

              <div className="d-flex flex-row mb-3">
                {

                }
                <div className="col-md-4">
                  <label>قیمت خرید</label>
                  <NumberFormatInput type="text" name="BuyPrice" placeholder="قیمت خرید" />
                </div>
                <div className="col-md-4">
                  <label>سود 20 درصد</label>
                  <Field type="text" name="TwentyProfit" readOnly />
                </div>
                <div className="col-md-4">
                  <label>قیمت فروش</label>
                  <Field type="text" name="SalePrice" placeholder="قیمت فروش" />
                </div>
              </div>

              {/* فیلد آپلود عکس */}
              <div className="d-flex flex-row mb-3">
                <div className="col-md-4">
                  <label>عکس کالا</label>
                  <input
                    name="ProductImg"
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];
                      setFieldValue("ProductImg", file);
                    }}
                  />
                </div>
              </div>

              <div>
                <button type="submit">ارسال</button>
              </div>
            </div>
            {existingProduct && (
              <div style={{ border: "1px solid gray", padding: "10px", marginTop: "10px" }}>
                <h3>⚠️ کالا مشابه پیدا شد:</h3>
                <p><strong>نام کالا:</strong> {existingProduct.ProductName}</p>
                <p><strong>قیمت:</strong> {existingProduct.Price} تومان</p>
                <p><strong>توضیحات:</strong> {existingProduct.Description}</p>
              </div>
            )}
          </Form>
        </>
      )}
    </Formik>
  );
};

export default List;