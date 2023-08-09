import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [finalprice, setFinalPrice] = useState(0);
  const [userCart, setUserCart] = useState([]);
  const router = useNavigate();

  // console.log(userCart, "- userCart");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("CurrentUser"));
    if (user?.email) {
      const allUsers = JSON.parse(localStorage.getItem("Users"));
      for (var i = 0; i < allUsers.length; i++) {
        if (
          allUsers[i].email == user.email &&
          allUsers[i].password == user.password
        ) {
          setUserCart(allUsers[i].cart);
          break;
        }
      }
    } else {
      alert("Please login to watch all cart products.");
      router("/login");
    }
  }, []);

  useEffect(() => {
    if (userCart.length) {
      var totalprice = 0;
      for (var i = 0; i < userCart.length; i++) {
        totalprice += parseInt(userCart[i].price);
      }
      setFinalPrice(totalprice);
    }
  }, [userCart]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("CurrentUser"));
    if (user) {
      if (user?.role == "Seller") {
        alert("Access granted only to Buyer.");
        router("/");
      }
    } else {
      alert("You are not a Logged in user.");
      router("/practicelogin");
    }
  }, []);

  function checkout() {
    const user = JSON.parse(localStorage.getItem("CurrentUser"));
    if (user?.email) {
      const allUsers = JSON.parse(localStorage.getItem("Users"));
      for (var i = 0; i < allUsers.length; i++) {
        if (
          allUsers[i].email == user.email &&
          allUsers[i].password == user.password
        ) {
          allUsers[i].cart = [];
          break;
        }
      }
      localStorage.setItem("Users", JSON.stringify(allUsers));
    }
    setFinalPrice([]);
    setUserCart([]);
    alert("Your products will be delivered soon. Thankyou for shopping!");
  }

  return (
    <div>
      <h1>Cart</h1>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            width: "72%",
            border: "1px solid black",
          }}
        >
          {userCart &&
            userCart.map((pro) => (
              <div
                style={{
                  width: "19%",
                  height: "370px",
                  border: "1px solid grey",
                  padding: "10px",
                  marginBottom: "10px",
                  marginTop: "10px",
                }}
              >
                <img
                  style={{ width: "100%", height: "250px" }}
                  src={pro.image}
                />
                <h3>Name : {pro.name}</h3>
                <h4>Price : {pro.price} $</h4>
              </div>
            ))}
        </div>

        <div
          style={{ width: "25%", height: "300px", border: "1px solid black" }}
        >
          <h2 style={{ marginLeft: "20px" }}>Price Details</h2>
          <h3 style={{ marginLeft: "20px" }}>
            Total MRP : {finalprice + finalprice} $
          </h3>
          <h3 style={{ marginLeft: "20px" }}>
            Total MRP after discount : {finalprice} $
          </h3>
          <button
            style={{
              height: "45px",
              width: "150px",
              border: "1px solid rgb(166, 166, 223)",
              backgroundColor: "#d6d6e2",
              color: "white",
              fontWeight: "700",
              fontSize: "17px",
              borderRadius: "50px",
              marginTop: "30px ",
            }}
            onClick={checkout}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
