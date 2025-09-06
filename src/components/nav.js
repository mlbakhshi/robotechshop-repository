import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { ShopContext } from "../context/shopContext";
import "./nav.css";
import { getCookie } from "../utility/cookie";
import Logout from "../pages/logout/logout";
import {useDeviceType} from "../hook/useDeviceType";

const Nav = () => {
    const { cartItems } = useContext(ShopContext);
    const userId = getCookie("userId");
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const itemCount = cartItems?.reduce((prev, current) => prev + current.count, 0);

    const device = useDeviceType();
    const handleLogout = () => {
        document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setShowLogoutModal(false);
        window.location.href = "/";
    };

    const handleSearch = () => {
        navigate(`/shop?search=${encodeURIComponent(searchTerm)}`);
    };

    return (
        <div className="navbar navbar-dark navbar-expand-lg d-flex header">
            {/*{device === "desktop" &&*/}
                <div className="header-logo">
                    <a href="">
                        <img className="logo" src="/images/header-logo1-removebg.png"
                             alt="فروشگاه تخصصی روباتیک Robotech"/>
                    </a>
                </div>
            {/*}*/}

            {/* بخش سرچ */}
            <div className="nav-search" style={{display: "flex"}}>
                <input
                    style={{width: "80%", borderBottomRightRadius: "10px", borderTopRightRadius: "10px", borderColor:"unset"}}
                    type="text"
                    placeholder="کالای مورد نظر خود را جستجو کنید..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
                />
                <button onClick={handleSearch}>
                    <i className="fa fa-search" style={{fontsize:"48px",color:"white"}}></i>
                </button>
            </div>

            {device === "desktop" &&
                <div className="header-menu">
                    <div className="container" style={{justifyContent: "end", position: "relative", top: "22%"}}>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/" className="nav-link" style={{color: "black"}}>فروشگاه</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/cart" className="nav-link" style={{color: "black"}}>
                                    <FontAwesomeIcon icon={faShoppingCart}/>
                                    <span className="nav-bar-badget"> {itemCount} </span>
                                </Link>
                            </li>
                            {userId && (
                                <li className="nav-item">
                                    <Link to="/search" className="nav-link" style={{color: "black"}}>کالای جدید</Link>
                                </li>
                            )}
                            {!userId && (
                                <li className="nav-item">
                                    <Link to="/register" className="nav-link" style={{color: "black"}}>ثبت
                                        نام/ورود</Link>
                                </li>
                            )}
                            {userId && (
                                <li className="nav-item">
                                    <button
                                        className="nav-link btn btn-link"
                                        style={{color: "black", textDecoration: "none"}}
                                        onClick={() => setShowLogoutModal(true)}
                                    >
                                        خروج
                                    </button>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            }


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
