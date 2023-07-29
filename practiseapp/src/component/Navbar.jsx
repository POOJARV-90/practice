import React, { useContext, useEffect, useState } from 'react'
import '../component/Navbar.css'
import { useNavigate } from 'react-router-dom';
import { Authcontext } from './Context/Authcontext';

const Navbar = () => {

const [userdata , setUserdata] = useState();
const {state,login,logout} = useContext(Authcontext);
const router = useNavigate();

useEffect(() => {
  
  if (state) {
      setUserdata(state.user)
     
  }else{
    setUserdata({})
  }
}, [state])


  return (
    <div id='parent'>
      <div>LOGO</div>
      <div></div>  
      <div id=''>
      {/* userdata */}
        {userdata?.email?
        <>
        <span><i class="fa-regular fa-user fa-lg"> :  </i>{state?.user?.name} </span>  
        <span>PRODUCTS</span>
        {userdata?.role =="Seller" && <span>ADD PRODUCT</span> }
       
        <span onClick={logout}> LOGOUT <i class="fa-solid fa-right-from-bracket"></i></span>

        </>
        :
        <span id='login' onClick={()=>router('/Login')}> <span>LOGIN</span>
         <img src="https://cdn.iconscout.com/icon/premium/png-512-thumb/login-2651272-2198190.png?f=avif&w=256" alt="" />
        </span>
        }
        

        

      </div>







    </div>
  )
}

export default Navbar