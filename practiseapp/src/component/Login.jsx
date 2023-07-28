import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Authcontext } from "./Context/Authcontext";

const Login = () => {

  const {state , login} = useContext(Authcontext)

  const [userdata, setUserdata] = useState({ email: "", password: "" });
  const router = useNavigate();

  const hangleChange = (event) => {
    setUserdata({ ...userdata, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (userdata.email && userdata.password) {
      const users = JSON.parse(localStorage.getItem("Users"));

      var flag = false;
      for (var i = 0; i < users.length; i++) {
        if (
          users[i].email == userdata.email &&
          users[i].password == userdata.password
        ) {
          flag = true;
          // login(users[i]);
          // alert("login succesfull")
          // localStorage.setItem(("CurrentUser"),JSON.stringify(userdata));
          // setUserdata({email:"",password:""})

          break;
        }
      }
      if (flag == false) {
        return alert("Please check credentials.");
      }
      alert("login succesfull");
      login(users[i])
      localStorage.setItem("CurrentUser", JSON.stringify(userdata));
      setUserdata({ email: "", password: "" });
      router("/");
    } else {
      alert("Please submit all details");
    }
  };

  return (
    <div id="body">
      <form action="" onSubmit={handleSubmit}>
        <h4>LOGIN</h4>
        <label htmlFor="">Email</label> <br />
        <input type="email" name="email" onChange={hangleChange} /> <br />
        <label htmlFor=""> Password</label> <br />
        <input type="password" name="password" onChange={hangleChange} /> <br />
        <input type="submit" id="button" value="Login" />

        <p id="tag">Don't have an account ? <b onClick={()=>router("/Register")}>register here</b></p>
      </form>
    </div>
  );
};

export default Login;
