import { createContext, useEffect, useReducer } from "react";
                    

export const Authcontext = createContext();

const incialState  = {user:null , product:[]};

const reducer = (state,action) => {
    switch(action.type){
        case "login":
            return{user:action.payload};

         case "logout"  :
            return{user:null} ;

            default :
            return state;
    }
}

export const Authprovider = ({children}) => {

    const [state,dispatch] = useReducer(reducer,incialState);

    function login(userData){
        
        localStorage.setItem("CurrentUser",JSON.stringify(userData)); //new
        dispatch({
            type:"login",
            payload: userData
        })
    }

    function logout (){
        localStorage.removeItem("CurrentUser")
        dispatch({
            type :"logout"
        })
    }

    useEffect(()=> {
        const user = JSON.parse(localStorage.getItem("CurrentUser"))

        if (user){
            dispatch({
                type:"login",
                payload:user
            })
        }
       
    },[])

    return(

        <Authcontext.Provider value={{state,login,logout}}>
            {children}
        </Authcontext.Provider>
    )


}