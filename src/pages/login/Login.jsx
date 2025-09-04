// LoginPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useGlobal} from "../../context/GlobalContext";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { globalValue, setGlobalValue } = useGlobal();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/api/login.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            // const response = await fetch(
            //     // "/api/login.php",
            //     `${globalValue}/api/login.php`,
            //     {
            //         method: "POST",
            //         headers: { "Content-Type": "application/json" },
            //         body: JSON.stringify({ username, password }),
            //     }
            // );
            const result = await response.json();
            console.log("Login result:", result);

            if (result.success) {
                alert("ورود موفق 👌");

                // ست کردن کوکی به مدت 30 روز (بدون Secure برای localhost)
                const expireDate = new Date();
                expireDate.setTime(expireDate.getTime() + 30 * 24 * 60 * 60 * 1000);
                document.cookie = `userId=${result.userId}; expires=${expireDate.toUTCString()}; path=/; SameSite=Lax`;

                // ریدایرکت به صفحه اصلی
                navigate("/");
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error("خطا در ارتباط با سرور:", error);
            alert("خطا در اتصال به سرور. دوباره تلاش کنید.");
        }
    };

    return (
        <div style={{ maxWidth: "300px", margin: "50px auto" }}>
            <h2>صفحه ورود</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "10px" }}>
                    <label>نام کاربری:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{ width: "100%", padding: "5px", marginTop: "5px" }}
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label>رمز عبور:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: "100%", padding: "5px", marginTop: "5px" }}
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "10px",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    ورود
                </button>
            </form>
        </div>
    );
};

export default Login;