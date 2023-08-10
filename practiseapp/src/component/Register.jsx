import React, { useState } from "react";
import "../component/Register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [userdata, setUserdata] = useState({
    name: "",
    email: "",
    password: "",
    role: "Buyer",
  });

  const router = useNavigate();

  const handlechange = (event) => {
    setUserdata({ ...userdata, [event.target.name]: event.target.value });
  };
  console.log(userdata);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userdata.name && userdata.email && userdata.password) {
      const array = JSON.parse(localStorage.getItem("Users")) || []; //asses

      const userobject = {
        name: userdata.name,
        email: userdata.email,
        password: userdata.password,
        role: userdata.role,
        cart: [],
      };
      array.push(userobject);
      localStorage.setItem("Users", JSON.stringify(array)); //set users here//

      setUserdata({ name: "", email: "", password: "", role: "Buyer" });
      router("/Login");
      alert("Registerd succesfully");
    } else {
      alert("please submit the require details");
    }
  };

  function selectrole(event) {
    // console.log(event.target.value ,"role")
    setUserdata({ ...userdata, ["role"]: event.target.value });
  }

  return (
    <div id="body">
      <form onSubmit={handleSubmit}>
        <h4>REGISTER</h4>
        <label>Name</label> <br />
        <input
          value={userdata.name}
          type="text"
          onChange={handlechange}
          name="name"
        />{" "}
        <br />
        <br />
        <label htmlFor="">Email</label> <br />
        <input
          value={userdata.email}
          type="email"
          onChange={handlechange}
          name="email"
        />{" "}
        <br />
        <label htmlFor="">Select Role : </label>
        <select id="select" onChange={selectrole}>
          <option value="Buyer">Buyer</option>
          <option value="Seller">Seller</option>
        </select>{" "}
        <br />
        <label htmlFor="">Password</label> <br />
        <input
          value={userdata.password}
          type="password"
          onChange={handlechange}
          name="password"
        />{" "}
        <br />
        <input type="submit" id="button" value="Register" />
        {/* <button>abc</button> */}
      </form>
    </div>
  );
};

export default Register;
