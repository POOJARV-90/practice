import React, { useContext } from 'react'
import { Authcontext } from './Context/Authcontext'

const Home = () => {
    const  {state,logout} = useContext(Authcontext);
   console.log(state,"state")
    return (
    <div>Home : {state?.user?.name}</div>
  )
}

export default Home