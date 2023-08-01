import { createContext, useEffect, useReducer } from "react";
                    

export const Authcontext = createContext();

const incialState  = {user:null , product:[]};

const reducer = (state,action) => {
    switch(action.type){
        case "login":
            return{user:action.payload};  //...state

         case "logout"  :
            return{user:null} ;

            default :
            return state;
    }
};

const Authprovider = ({children}) => {

    const [state,dispatch] = useReducer(reducer,incialState);

    const login = (userData) => {
        
        localStorage.setItem("CurrentUser",JSON.stringify(userData)); //new
        dispatch({
            type:"login",
            payload: userData
        })
    }

    const logout = () => {
        localStorage.removeItem("CurrentUser")
        dispatch({
            type :"logout"
        })
        alert("you have logout succesfully")
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
    );


};

export default Authprovider ;