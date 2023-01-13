import React, { useRef } from 'react'
import {createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from '../firebase'
import {db} from "./../firebase"
import {addDoc, collection, doc, serverTimestamp, setDoc} from "firebase/firestore" 

const SignUp = () => {
   const email = useRef()
   const password = useRef()
   const name = useRef()
   const num = useRef()

   const handleSignUp = async (e)=>{
      e.preventDefault()
      try {
          await createUserWithEmailAndPassword(auth, email.current.value, password.current.value).then(async ()=>{
            const res = await addDoc(collection(db, "users"), {
               email:email.current.value,
               password: password.current.value,
               username: name.current.value,
               phone_number: num.current.value,
               role: "user"
            })
            await console.log("user created", auth.currentUser.uid)
          }).catch((err) =>
           console.log(err)
         );
          await updateProfile(auth.currentUser, { displayName: name.current.value, role:"admin"}).then(()=>{
            console.log("user updated")
          }).catch(
           (err) => console.log(err)
         );
       } catch (err) {
         console.log(err);
       }
   }
   


  return (
<section className="signin-area signin-one">
   <div className="container ">
      <div className="row justify-content-center">
         <div className="col-lg-5 border rounded shadow p-3 mb-5 p-sm-6 m-sm-4">
            <div >
               <div className="signin-form form-style-two rounded-buttons">
                  <div className="row">
                     <div className="col-md-12">
                        <div className="form-input">
                           <label>Your account will be under this email</label>
                           <div className="input-items default">
                              <input type="text" placeholder="Email"  ref={email}/>
                              <i className="lni lni-envelope"></i>
                           </div>
                        </div>
                        
                     </div>
                     <div className="col-md-12">
                        <div className="form-input">
                           <label>
                           </label>
                           <div className="input-items default">
                              <input type="text" placeholder="Name" ref={name}/>
                              <i className="lni lni-user"></i>
                           </div>
                        </div>
                     </div>
                     <div className="col-md-12">
                        <div className="form-input">
                           <label>
                           </label>
                           <div className="input-items default">
                              <input type="text" placeholder="Phone Number" ref={num}/>
                              <i className="lni lni-user"></i>
                           </div>
                        </div>
                     </div>
                     <div className="col-md-12">
                        <div className="form-input">
                           <label>Password for your account</label>
                           <div className="input-items default">
                              <input type="password" placeholder="Password" ref={password}/>
                              <i className="lni lni-key"></i>
                           </div>
                        </div>
                        
                     </div>
                   
                     <div className="col-md-6">
                        <div className="form-input rounded-buttons">
                           <button
                              className="btn primary-btn-outline rounded-full"
                              onClick={handleSignUp}>
                           Sign Up
                           </button>
                        </div>
                     </div>
                     <div className="col-md-12">
                        <div className="form-input text-center">
                           <p className="text">
                              By signing up you agree with the
                              <a href="#">Terms and Conditions</a>
                              and
                              <a href="#">Privacy</a>
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
               
            </div>
         </div>
      </div>
      
   </div>
   
</section>
  )
}

export default SignUp