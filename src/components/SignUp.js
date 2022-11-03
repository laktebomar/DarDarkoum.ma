import React from 'react'

const SignUp = () => {
  return (
<section className="signin-area signin-one">
   <div className="container ">
      <div className="row justify-content-center">
         <div className="col-lg-5 border rounded shadow p-3 mb-5 p-sm-6 m-sm-4">
            <form action="#">
               <div className="signin-form form-style-two rounded-buttons">
                  <div className="row">
                     <div className="col-md-12">
                        <div className="form-input">
                           <label>Your account will be under this email</label>
                           <div className="input-items default">
                              <input type="text" placeholder="Email" />
                              <i className="lni lni-envelope"></i>
                           </div>
                        </div>
                        
                     </div>
                     <div className="col-md-12">
                        <div className="form-input">
                           <label>
                           </label>
                           <div className="input-items default">
                              <input type="text" placeholder="Name" />
                              <i className="lni lni-user"></i>
                           </div>
                        </div>
                     </div>
                     <div className="col-md-12">
                        <div className="form-input">
                           <label>Password for your account</label>
                           <div className="input-items default">
                              <input type="password" placeholder="Password" />
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
                     <div className="col-md-12">
                        <div className="form-input text-center">
                           <p className="text">
                              By signing in you agree with the
                              <a href="#">Terms and Conditions</a>
                              and
                              <a href="#">Privacy</a>
                           </p>
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