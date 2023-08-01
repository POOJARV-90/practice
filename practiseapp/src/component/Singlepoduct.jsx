import React, { useContext, useEffect, useState } from "react";
// import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Authcontext } from "./Context/Authcontext";

const Singlepoduct = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [products, setProducts] = useState([]);
  const [single, setSingle] = useState({});
  const { id } = useParams();
  const router = useNavigate();
  const { state } = useContext(Authcontext);
  const [isProductExist, setIsProductExist] = useState(false);
  const [userData, setUserData] = useState({});
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    image: "",
    category: "Other",
  });
  const [allowUpdate, setAllowUpdate] = useState(false);

  useEffect(() => {
    if (state) {
      setUserData(state.user);
    }
  }, [state]);

  useEffect(() => {
    const productFromDB = JSON.parse(localStorage.getItem("Products"));
    if (productFromDB) {
      setIsProductExist(true);
      setProducts(productFromDB);
    } else {
      setIsProductExist(false);
    }
  }, []);

  useEffect(() => {
    if (isProductExist) {
      if (id && products.length) {
        const res = products.find((pro) => pro.id == id);
        setSingle(res);
      }
    }
  }, [id, products]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("CurrentUser"));
    // console.log(user, "uzer");
    if (user) {
      setIsUserLoggedIn(true);
      setCurrentUserEmail(user.email);
    }
  }, []);

  function addCart() {
    if (isUserLoggedIn) {
      const users = JSON.parse(localStorage.getItem("Users"));
      for (let i = 0; i < users.length; i++) {
        if (users[i].email === currentUserEmail) {
          users[i].cart.push(single);
          localStorage.setItem("Users", JSON.stringify(users));
          break;
        }
      }
      alert("Product successfully added to cart!");
      router("/cart");
    } else {
      alert("You can't add a product before logging in!");
    }
  }


  function uptoDate() {
    setAllowUpdate(true);
  }

  function closeUpate() {
    setAllowUpdate(false);
  }

  function handleChange(e) {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  }
  function selectRole(e) {
    setProductData({ ...productData, ["category"]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    const allProduct = JSON.parse(localStorage.getItem("Products"));
    for (let i = 0; i < allProduct.length; i++) {
      if (allProduct[i].id === id) {
        allProduct[i].image = productData.image;
        allProduct[i].name = productData.name;
        allProduct[i].price = productData.price;
        allProduct[i].category = productData.category;
        single.image = productData.image;
        single.name = productData.name;
        single.price = productData.price;
        single.category = productData.category;

        localStorage.setItem("Products", JSON.stringify(allProduct));
        setProductData({ name: "", price: "", image: "", category: "Other" });
       alert("Product Updated!");
      }
    }
  }

  return (
    <div>
      {allowUpdate ? (
        <div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <form onSubmit={handleSubmit}>
              <fieldset
                style={{
                  width: "380px",
                  marginTop: "50px",
                  textAlign: "centre",
                  backgroundImage:
                    "linear-gradient(to bottom right, #8000ff, #ff00ff)",
                }}
              >
                {/* <legend>Fill your Details</legend> */}
                <label>Product Name:</label>
                <br />
                <input
                  style={{
                    width: "380px",
                    marginTop: "10px",
                    height: "30px",
                    marginBottom: "10px",
                    textAlign: "centre",
                  }}
                  type="text"
                  name="name"
                  value={productData.name}
                  onChange={handleChange}
                />
                <br />

                <label>Product Price :</label>
                <br />
                <input
                  style={{
                    width: "380px",
                    marginTop: "10px",
                    height: "30px",
                    marginBottom: "10px",
                    textAlign: "centre",
                  }}
                  type="number"
                  name="price"
                  value={productData.price}
                  onChange={handleChange}
                />
                <br />
                <label>Product Category :</label>
                <br />
                <select
                  style={{
                    width: "380px",
                    marginTop: "10px",
                    height: "30px",
                    marginBottom: "10px",
                    textAlign: "centre",
                  }}
                  onChange={selectRole}
                >
                  <option value="Other">Other</option>
                  <option value="Mens">Mens</option>
                  <option value="Womens">Womens</option>
                  <option value="Kids">Kids</option>
                  <option value="Electronics">Electronics</option>
                </select>
                <br />
                <label>Product Image :</label>
                <br />
                <input
                  style={{
                    width: "380px",
                    marginTop: "10px",
                    height: "30px",
                    marginBottom: "10px",
                    textAlign: "centre",
                  }}
                  type="text"
                  name="image"
                  value={productData.image}
                  onChange={handleChange}
                />
                <br />
                <input
                  style={{
                    marginLeft: "105px",
                    marginTop: "15px",
                    backgroundColor: " black",
                    fontWeight: "700",
                    border: "2px solid  #ccff66",
                    color: "white",
                    padding: "8px 35px",
                    borderRadius: "20px",
                  }}
                  type="submit"
                  value="Update Product"
                />
                <p style={{textAlign:"center", color:"white", fontWeight:"700"}} onClick={closeUpate}>X</p>
              </fieldset>
            </form>
          </div>
        </div>
      ) : null}

      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          width: "50%",
          margin: "auto",
          marginTop: "50px",
          border: "1px solid black",
        }}
      >
        <div style={{ width: "40%", height: "350px" }}>
          <img
            style={{ width: "100%", height: "100%", marginTop: "40px" }}
            src={single.image}
            alt="Product"
          />
        </div>

        <div style={{ width: "40%", height: "400px", padding: "15px" }}>
          <h2>Name: {single.name}</h2>
          <h2>Price: {single.price}$</h2>
          <p style={{ fontSize: "17px" }}>Category: {single.category}</p>

          {userData?.role === "Seller" ? (
            <div>
              <button
                style={{
                  height: "45px",
                  width: "150px",
                  border: "1px solid purple",
                  backgroundColor: "purple",
                  color: "white",
                  fontWeight: "700",
                  fontSize: "17px",
                  borderRadius: "50px",
                }}
                onClick={uptoDate}
              >
                Update
              </button>
            </div>
          ) : (
            <div>
              <button
                style={{
                  height: "45px",
                  width: "150px",
                  border: "1px solid purple",
                  backgroundColor: "purple",
                  color: "white",
                  fontWeight: "700",
                  fontSize: "17px",
                  borderRadius: "50px",
                }}
                onClick={addCart}
              >
                Add to cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Singlepoduct;