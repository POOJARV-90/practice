import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Authcontext } from "./Context/Authcontext";


const Login = () => {

  const {state , login} = useContext(Authcontext)

  const [userdata, setUserdata] = useState({ email: "", password: "" ,role :""});
  const router = useNavigate();

  const hangleChange = (event) => {
    setUserdata({ ...userdata, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (userdata.email && userdata.password) {
      const users = JSON.parse(localStorage.getItem("Users")); //access to LS

      var flag = false;
      for (var i = 0; i < users.length; i++) {
        if (
          users[i].email == userdata.email &&
          users[i].password == userdata.password
        ) {
          flag = true;
          localStorage.setItem(("CurrentUser"),JSON.stringify( users[i]));
          login(users[i]);
          alert("login succesfull")
          setUserdata({email:"",password:"",role :""  })
          router("/");
          break;
        }
      }
      if (flag == false) {
           alert("Please check credentials.");   //RETURN
      }
      
    } else {
      alert("Please submit all details");
    }
  };

  return (
    <div id="body">
      <form action="" onSubmit={handleSubmit}>
        <h4>LOGIN</h4>
        <label htmlFor="">Email</label> <br />
        <input type="email" name="email" onChange={hangleChange} value={userdata.email} /> <br />
        <label htmlFor=""> Password</label> <br />
        <input type="password" name="password" onChange={hangleChange} value={userdata.password} /> <br />
        <input type="submit" id="button" value="Login" />

        <p id="tag">Don't have an account ? <b onClick={()=>router("/Register")}>register here</b></p>
      </form>
    </div>
  );
};

export default Login;
