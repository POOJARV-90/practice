import React, { useContext, useEffect, useState } from "react";
import "../component/Navbar.css";
import { useNavigate } from "react-router-dom";
import { Authcontext } from "./Context/Authcontext";

const Navbar = () => {
  const [userdata, setUserdata] = useState();

  const { state, logout } = useContext(Authcontext);
  const router = useNavigate();

  useEffect(() => {
    if (state?.user) {
      setUserdata(state?.user);
    } else {
      setUserdata({});
    }
  }, [state]);

  return (
    <div id="parent">
      <div onClick={() => router("/")}>LOGO</div>
      <div></div>
      <div id="">
        {userdata?.email ? (
          <>
            <span>
              <i className="fa-regular fa-user fa-lg"> : </i>
              {userdata.name}:<span>{userdata.role}</span>
            </span>
            <span onClick={() => router("/Cart")} >CART</span>
            <span onClick={() => router("/AllProducts")}>PRODUCTS</span>
            {userdata.role == "Seller" && (
              <span onClick={() => router("/Addproduct")}>ADD PRODUCT</span>
            )}

            <span onClick={logout}>
              {" "}
              LOGOUT <i className="fa-solid fa-right-from-bracket"></i>
            </span>
          </>
        ) : (
          <span id="login" onClick={() => router("/Login")}>
            {" "}
            <span>LOGIN</span>
            <img
              src="https://cdn.iconscout.com/icon/premium/png-512-thumb/login-2651272-2198190.png?f=avif&w=256"
              alt=""
            />
          </span>
        )}
      </div>
    </div>
  );
};

export default Navbar;

