import React from "react";
import { useFormikContext } from "formik";

const NumberFormatInput = ({ name, ...props }) => {
    const { setFieldValue, values } = useFormikContext();

    const handleChange = (e) => {
        // فقط اعداد
        const rawValue = e.target.value.replace(/\D/g, "");

        // مقدار خام رو داخل Formik ذخیره می‌کنیم
        setFieldValue(name, rawValue);
    };

    // برای نمایش، فرمت سه‌رقمی
    const formattedValue =
        values[name] !== undefined && values[name] !== null
            ? values[name].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            : "";

    return (
        <div>
            <input
                {...props}
                name={name}
                value={formattedValue}
                onChange={handleChange}
            />
            {/* فقط برای تست ببینی مقدار واقعی چی ذخیره شده */}
            {/* <small style={{color: "gray"}}>raw: {values[name]}</small> */}
        </div>
    );
};

export default NumberFormatInput;