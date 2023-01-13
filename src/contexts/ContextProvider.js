import React, { createContext, useContext, useState } from 'react';
import {auth} from './../firebase'

const StateContext = createContext();



  export const ContextProvider = ({ children }) => {    
            const [logged, setLogged] = useState(false);
            const [hide, setHide] = useState(true)
            const [classN, setClassN] = useState("None")
            const [userRole, setUserRole] = useState('')
            const [show, setShow] = useState(false);
            const [userName, setUserName] = useState('')
            const [search, setSearch] = useState([]); 
            const [annonceId, setAnnonceId] = useState('')
            const [aId, setAId] = useState('')
            var userMail;
            if (auth.currentUser){
              userMail= auth.currentUser.email
            }

        
            return (
                <StateContext.Provider value={{ logged, setLogged, hide, setHide, classN, show,
                setShow, setClassN, search, setSearch, userRole, setUserRole, aId, setAId, 
                userName, userMail,setUserName, annonceId, setAnnonceId}}>
                  {children}
                </StateContext.Provider>
              );
            };
  

export const useStateContext = () => useContext(StateContext);