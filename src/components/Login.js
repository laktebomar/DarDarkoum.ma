import React, {useState} from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "./../firebase" 
import { useNavigate } from "react-router-dom";
import { useStateContext } from '../contexts/ContextProvider';


const SignUp = () => {
    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")
    const {logged, setLogged} = useStateContext()
    const navigate=useNavigate()
    console.log("mail",mail)
    const handleLogin = (e)=>{
        e.preventDefault()
        signInWithEmailAndPassword(auth, mail, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          setLogged(true)
          navigate("/")  
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
  return (
<section className="signin-area signin-one">
   <div className="container ">
      <div className="row justify-content-center">
         <div className="col-lg-5 border rounded shadow p-3 mb-5 p-sm-6 m-sm-4">
            <form onSubmit={handleLogin}>
               <div className="signin-form form-style-two rounded-buttons">
                  <div className="row">
                     <div className="col-md-12">
                        <div className="form-input">
                           <label>mail</label>
                           <div className="input-items default">
                              <input type="text" placeholder="Email" onChange={(e)=>setMail(e.target.value)}/>
                              <i className="lni lni-envelope"></i>
                           </div>
                        </div>
                        
                     </div>
                     <div className="col-md-12">
                        <div className="form-input">
                           <label>Password</label>
                           <div className="input-items default">
                              <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
                              <i className="lni lni-key"></i>
                           </div>
                        </div>
                        
                     </div>
                     <div className="col-md-6">
                        <div className="form-input rounded-buttons">
                           <button
                              className="btn primary-btn btn-primary rounded-full"
                              type="submit"
                              >
                           Sign In!
                           </button>
                        </div>
                        
                     </div>
                     <div className="col-md-6">
                        <div className="form-input rounded-buttons">
                           <button
                              className="btn primary-btn-outline rounded-full"
                              type="submit"
                              >
                           Sign Up
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
               
            </form>
         </div>
      </div>
      
   </div>
   
</section>
  )
}

export default SignUp