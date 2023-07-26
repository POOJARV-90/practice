import React, { useState } from 'react'
import '../component/Register.css'
import { useNavigate } from 'react-router-dom';

const Register = () => {

const [userdata , setUserdata] = useState({name:"",email:"",password :""});

const router = useNavigate()

const handlechange = (event) => {
    setUserdata({...userdata ,[event.target.name]:event.target.value})
}
console.log(userdata);

const handleSubmit = (event) => {
    event.preventDefault();
    if(userdata.name && userdata.email && userdata.password){
        const array = JSON.parse(localStorage.getItem("Users")) || [];
        const userobject ={
            name : userdata.name,
            email :userdata.email,
            password: userdata.password,
        }
        array.push(userobject);
        localStorage.setItem("Users",JSON.stringify(array));
        setUserdata({})
        alert("Registerd succesfully")
        router('/Login')
    }else{
        alert("please submit the require details")
    }
}

  return (

    <div id='body'>
        <form onSubmit={handleSubmit}>
            <h4>REGISTER</h4>
            <label htmlFor="">Name</label> <br />
            <input type="text" onChange={handlechange} name='name' /> <br />

            <label htmlFor="">Email</label> <br />
           <input type="email" onChange={handlechange} name='email'  />  <br />

           <label htmlFor="">Password</label> <br />
           <input type='password' onChange={handlechange } name='password'/>  <br />

           <input type="submit" id='button' value="Register" />

           {/* <button>abc</button> */}


        </form>



    </div>
  )


}

export default Register