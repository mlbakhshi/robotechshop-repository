import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    // ثبت نام
    const handleRegister = async () => {
        setMessage("");
        if (!username || !password) {
            setMessage("تمام فیلدها الزامی هستند.");
            return;
        }

        try {
            // const res = await fetch("http://localhost:8080/api/register.php", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify({ username, password }),
            // });

            const res = await fetch(
                "/api/register.php",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password }),
                }
            );


            const data = await res.json();
            if (data.success) {
                setMessage("ثبت نام موفق! لطفاً برای ورود منتظر بمانید...");
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            console.error(error);
            setMessage("خطا در اتصال به سرور.");
        }
    };

    // ورود
    const handleLogin = async () => {
        setMessage("");
        if (!username || !password) {
            setMessage("تمام فیلدها الزامی هستند.");
            return;
        }

        try {
            // const res = await fetch("http://localhost:8080/api/login.php", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify({ username, password }),
            // });

            const res = await fetch(
                "/api/login.php",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password }),
                }
            );

            const data = await res.json();
            if (data.success) {
                // ست کردن کوکی به مدت 30 روز
                const expireDate = new Date();
                expireDate.setTime(expireDate.getTime() + 30 * 24 * 60 * 60 * 1000);
                document.cookie = `userId=${data.userId}; expires=${expireDate.toUTCString()}; path=/; SameSite=Lax`;

                setMessage("ورود موفق! در حال انتقال…");
                setTimeout(() => navigate("/"), 1000); // ریدایرکت
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            console.error(error);
            setMessage("خطا در اتصال به سرور.");
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "50px auto", textAlign: "center" }}>
            <h2>ثبت نام / ورود</h2>
            <input
                type="text"
                placeholder="نام کاربری"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ width: "100%", marginBottom: 10 }}
            />
            <input
                type="password"
                placeholder="رمز عبور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "100%", marginBottom: 10 }}
            />
            <div style={{ marginBottom: 10 }}>
                <button onClick={handleRegister} className="btn btn-warning btn-lg ml-3" style={{ marginRight: 10 }}>ثبت نام</button>
                <button onClick={handleLogin} className="btn btn-success btn-lg">ورود</button>
            </div>
            {message && <p style={{ marginTop: 20 }}>{message}</p>}
        </div>
    );
};

export default Register;