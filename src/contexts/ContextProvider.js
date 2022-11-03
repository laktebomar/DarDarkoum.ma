import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();



  export const ContextProvider = ({ children }) => {    
            const [logged, setLogged] = useState(false);
            const [hide, setHide] = useState(false)
            const [classN, setClassN] = useState("None")
            const [show, setShow] = useState(false);


            return (
                <StateContext.Provider value={{ logged, setLogged, hide, setHide, classN, show,  setShow, setClassN}}>
                  {children}
                </StateContext.Provider>
              );
            };
  

export const useStateContext = () => useContext(StateContext);