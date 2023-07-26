import React, { useEffect, useState } from 'react'
// import "../Component/Navbar.css"
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [userdata , setUserdata] = useState({});
   const router = useNavigate();
  useEffect(()=>{
    const users = JSON.parse(localStorage.getItem("CurrentUser"));
    if (users){
      setUserdata(users)
    }
  },[] )

  function logout() {    ///tobechange
    localStorage.removeItem("CurrentUser")
    setUserdata({})
    router('/')
}

  return (
    <div id='parent'>
      {/* <div>1</div>
      <div>1</div>
      <div id=''>
        {userdata?.email?
        <>
        <span>1</span>
        <span>1</span>
        <span onClick={logout}>logout</span>
        </>
        :
        <span>2</span>
        }
        

        

      </div> */}
      






    </div>
  )
}

export default Navbar