import React, { useEffect, useState } from "react";
import '../component/Cart.css'
import { useNavigate } from "react-router-dom";


const Cart = () => {
  const [userCart, setUserCart] = useState([]);
  const [finalPrice, setFinalPrice] = useState(0);
  const router = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("CurrentUser"));
    if (user?.email) {
      const allusers = JSON.parse(localStorage.getItem("Users"));

      for (var i = 0; i < allusers.length; i++) {
        if (
          allusers[i].email === user.email &&
          allusers[i].password === user.password
        ) {
          setUserCart(allusers[i].cart);
          break;
        }
      }
    } else {
      alert("Please login to watch all cart products.");
      router("/Login");
    }
  }, []);

  useEffect(() => {
    if (userCart?.length) {
      var totalPrice = 0;
      for (var i = 0; i < userCart.length; i++) {
        totalPrice += userCart[i].price;
      }
      setFinalPrice(totalPrice);
    }
  }, [userCart]);

  function buyProducts() {
    const user = JSON.parse(localStorage.getItem("CurrentUser"));
    if (user?.email) {
      const allUsers = JSON.parse(localStorage.getItem("Users"));
      for (var i = 0; i < allUsers.length; i++) {
        if (
          allUsers[i].email === user.email &&
          allUsers[i].password === user.password
        ) {
          allUsers[i].cart = [];
          break;
        }
      }
      localStorage.setItem("Users", JSON.stringify(allUsers));
    }
    setFinalPrice(0);
    setUserCart([]);
    alert("Product will deliver soon, Thank you for shopping.");
  }

  return (
    <div id="cart">
      <div id="bankoffer">
        10% Instant Discount on Select HDFC Bank Credit Card on minimum purchase
        of Rs.6000. (Maximum Discount of Rs. 800) TnC Apply
      </div>

      <div id="cart-all-items">
        {userCart?.length === 0 ? (
          <div id="cart-all-items-left">
            <div id="no-product-in-cart">
              Your cart needs some love <br />
              <small>Fill your cart with the best of Shoppers Stop</small>{" "}
              <br />
              <u onClick={() => router("/Multipleproduct")}>Start Shopping</u>
            </div>
          </div>
        ) : (
          <div id="cart-all-items-left">
            {userCart.map((pro, index) => (
              <div key={index} id="cart-product">
                <div>
                  <div>
                    <img src={pro.image} alt="" />
                  </div>
                  <div>
                    <p>
                      <span>{pro.title}</span> <span>{pro.price}$</span>
                    </p>
                    <div>
                      <p></p> <span>Price dropped 50%</span>
                    </div>
                    <span>Color : Black</span> <br />
                    <select>
                      <option value=""> size</option>
                      <option value="">1</option>
                      <option value="">1</option>
                      <option value="">1</option>
                    </select>
                    <select>
                      <option value=""> Qty</option>
                      <option value="">1</option>
                      <option value="">1</option>
                      <option value="">1</option>
                    </select>
                    <div id="remove-wishlist">
                      <div>REMOVE</div>
                      <div>MOVE TO WISHLIST</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div id="cart-all-items-right">
          <h2>Order Summary</h2>
          <p>
            <span>Sub total</span> <span> {finalPrice + finalPrice} $</span>
          </p>
          <p>
            <span>Delivery charges*</span> <span>Free</span>
          </p>
          <p>
            <span>Offer discount(20%)</span> <span>{finalPrice / 2} $</span>
          </p>
          <h1>
            <span>Total Price</span>{" "}
            <span>
              {" "}
              {finalPrice + finalPrice - finalPrice / 2}{" "}
              <b style={{ color: "#ff7635" }}>$</b>
            </span>
          </h1>
          <button onClick={buyProducts} id="button">
            Buy Now
          </button>
        </div>
      </div>
      
     
    </div>
  );
};

export default Cart;