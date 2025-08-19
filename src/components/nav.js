
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { ShopContext } from "../context/shopContext";
import "./nav.css";
import { getCookie } from "../utility/cookie";
import Logout from "../pages/logout/logout";

const Nav = () => {
   const { cartItems } = useContext(ShopContext);
   const userId = getCookie("userId");
   const [showLogoutModal, setShowLogoutModal] = useState(false);

   const itemCount = cartItems?.reduce((prev, current) => {
      return prev + current.count;
   }, 0);

   const handleLogout = () => {
      // حذف کوکی
      document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setShowLogoutModal(false);

      // ریدایرکت به صفحه ورود
      window.location.href = "/";
   };

   return (
       <div className="navbar navbar-dark bg-dark navbar-expand-lg">
          <div className="container">
             <a className="navbar-brand">فروشگاه روبوتک</a>
             <ul className="navbar-nav">
                <li className="nav-item">
                   <Link to="/" className="nav-link">
                      فروشگاه
                   </Link>
                </li>
                <li className="nav-item">
                   <Link to="/cart" className="nav-link">
                      <FontAwesomeIcon icon={faShoppingCart} />
                      <span className="nav-bar-badget"> {itemCount} </span>
                   </Link>
                </li>

                {userId && (
                    <li className="nav-item">
                       <Link to="/search" className="nav-link">
                          کالای جدید
                       </Link>
                    </li>
                )}

                {!userId && (
                    <li className="nav-item">
                       <Link to="/register" className="nav-link">
                          ثبت نام/ورود
                       </Link>
                    </li>
                )}

                {userId && (
                    <li className="nav-item">
                       <button
                           className="nav-link btn btn-link"
                           style={{ color: "white", textDecoration: "none" }}
                           onClick={() => setShowLogoutModal(true)}
                       >
                          خروج
                       </button>
                    </li>
                )}
             </ul>
          </div>

          {/* مودال خروج */}
          {showLogoutModal && (
              <Logout
                  message="آیا مطمئن هستید که می‌خواهید خارج شوید؟"
                  onConfirm={handleLogout}
                  onCancel={() => setShowLogoutModal(false)}
              />
          )}
       </div>
   );
};

export default Nav;