import React, { useEffect, useState } from "react";
import { Formik, Field, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import NumberFormatInput from "./NumberFormatInput";
import {useGlobal} from "../context/GlobalContext";


const ProfitCalculator = () => {

  const formik = useFormikContext(); // ✅ دریافت context

  useEffect(() => {
    if (formik.values.BuyPrice) {
      const buyPrice = parseFloat(formik.values.BuyPrice);
      if (!isNaN(buyPrice)) {
          const profit = buyPrice * 1.2;
          const roundedProfit = Math.round(profit / 100) * 100; // رند به نزدیک‌ترین صدگان
          formik.setFieldValue("TwentyProfit", roundedProfit);

      }
    }
  }, [formik.values.BuyPrice]);

  
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

const Edit = ({ productToEdit = null }) => {
    const { globalValue, setGlobalValue } = useGlobal();
  const isEditing = Boolean(productToEdit); // ✅ تشخیص حالت ویرایش یا افزودن محصول جدید

  const initialValues = productToEdit || {
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
    BuyCount: Yup.number().required("لطفا تعداد خرید را وارد کنید").positive().integer(),
    BuyDate: Yup.string().required("لطفا تاریخ خرید را وارد کنید"),
    BuyPrice: Yup.string().required("لطفا قیمت خرید را وارد کنید"),
    TwentyProfit: Yup.string().required("لطفا سود ۲۰ درصد را وارد کنید"),
    SalePrice: Yup.string().required("لطفا قیمت فروش را وارد کنید"),
    ProductImg: Yup.mixed(),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
        const formData = new FormData();

        if (productToEdit) {
            formData.append("ProductId", productToEdit.id);
        }

        // بقیه اطلاعات فرم را اضافه کن
        formData.append("ProductName", values.ProductName);
        formData.append("StorageId", values.StorageId);
        formData.append("Category", values.Category);
        formData.append("Famous", values.Famous);
        formData.append("BuyCount", values.BuyCount);
        formData.append("BuyDate", values.BuyDate);
        formData.append("BuyPrice", values.BuyPrice);
        formData.append("TwentyProfit", values.TwentyProfit);
        formData.append("SalePrice", values.SalePrice);
        formData.append("Comment", values.Comment);

        // اگر تصویری انتخاب شده باشد، ارسال شود
        if (values.ProductImg) {
            formData.append("ProductImg", values.ProductImg);
        }

        // ارسال داده به سرور
        // const response = await fetch("http://localhost:8080/api/save_product.php", {
        //     method: "POST",
        //     body: formData,
        // });
        const response = await fetch(
            // "/api/save_product.php",
            `${globalValue}/api/save_product.php`,
            {
            method: "POST",
            body: formData,
        });

        const result = await response.json();

        if (result.success) {
            alert(result.message);
            resetForm();
        } else {
            alert(result.message);
        }
    } catch (error) {
        alert("خطا در ارسال اطلاعات به سرور");
    } finally {
        setSubmitting(false);
    }
};

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ setFieldValue }) => (
        <>
        
        <Form>
          <ProfitCalculator  />
            <div style={{marginLeft: "30px", marginRight: "30px"}}>
                <h2 style={{marginTop: "25px", marginBottom: "25px", textAlign: "center"}}>
                    {isEditing ? "ویرایش کالا" : "ثبت کالای جدید"}
                </h2>

                <div className="d-flex flex-row mb-3 row" style={{textAlign: "right"}}>
                    <div className="col-md-4 col-xs-12 mt-2">
                        <label className="ml-2">نام کالا</label>
                        <Field className="width_75" type="text" name="ProductName" placeholder="نام کالا"/>
                    </div>
                    <div className="col-md-4 col-xs-12 mt-2">
                        <label className="ml-2">شناسه انبار</label>
                        <Field type="text" name="StorageId" placeholder="شناسه انبار"/>
                    </div>
                    <div className="col-md-4 col-xs-12 mt-2">
                        <label className="ml-2">دسته‌بندی</label>
                        <Field as="select" name="Category" className="">
                            <option value="">انتخاب کنید</option>
                            <option value="1">ماژول</option>
                            <option value="2">سازه</option>
                            <option value="3">سنسور</option>
                            <option value="4">قطعه</option>
                        </Field>
                    </div>
                </div>

                <div className="d-flex flex-row mb-3 mt-5 row" style={{textAlign: "right"}}>
                    <div className="col-md-4 col-xs-12 mt-2">
                        <label className="ml-2">تعداد خرید</label>
                        <Field type="text" name="BuyCount" placeholder="تعداد خرید"/>
                    </div>
                    <div className="col-md-4 col-xs-12 mt-2">
                        <label className="ml-2">تاریخ خرید</label>
                        <Field name="BuyDate" component={DatePickerField}/>
                    </div>
                </div>

                <hr/>

                <div className="d-flex flex-row mb-3 mt-5 row" style={{textAlign: "right"}}>
                    <div className="col-md-4 col-xs-12 mt-3">
                        <label className="ml-2">قیمت خرید</label>
                        <NumberFormatInput type="text" name="BuyPrice" placeholder="قیمت خرید"/>
                    </div>
                    <div className="col-md-4 col-xs-12 mt-3">
                        <label className="ml-2">سود 20 درصد</label>
                        <NumberFormatInput type="text" name="TwentyProfit" placeholder="سود 20 درصد" readOnly/>
                    </div>
                    <div className="col-md-4 col-xs-12 mt-3">
                        <label className="ml-2">قیمت فروش</label>
                        <NumberFormatInput type="text" name="SalePrice" placeholder="قیمت فروش"/>
                    </div>
                </div>
                <input
                    name="ProductImg"
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                        const file = event.currentTarget.files[0];
                        setFieldValue("ProductImg", file);
                    }}
                />

                <div className="mt-3 mb-3">
                    <button type="submit">{isEditing ? "ویرایش کالا" : "افزودن کالای جدید"}</button>
                </div>
            </div>
        </Form>
        </>
      )}
    </Formik>
  );
};

export default Edit;