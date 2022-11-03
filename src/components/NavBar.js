import React, {useState} from 'react'
import SignUp from './SignUp'
import {Link, NavLink} from 'react-router-dom'
import LOGO from './../assets/darDarkoum.png'
import { useStateContext } from '../contexts/ContextProvider'
import AddPropereties from './AddPropereties'

const NavBar = () => {
  const {logged, setHide, setShow} = useStateContext()
  const [display, setDisplay] = useState("hide")

  const handleClick = () => {
    setDisplay(display==="show"?"hide":"show")
    
    setHide(prevState => !prevState)
    
 }
 const handleShow = () => setShow(true);
  return (
  <nav className="navbar navbar-expand-lg bg-light shadow">
    <div className="container-fluid">
      
      <Link to="" className="navbar-brand ms-5"><img src={LOGO} style={{width:"10%", height:"10%"}}/> Olympus</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end me-5" id="navbarNav">
             <ul className="navbar-nav">
             <li className="nav-item">
               <Link to="" className="nav-link active">Home</Link>
             </li>
             <li className="nav-item">
             <button className="btn" onClick={handleClick}> {display} map</button>
          </li>
          {logged? (
            <>
            <li className="nav-item">
             <button className="btn" onClick={handleShow} > add properties</button>
             <AddPropereties/>
          </li>
             <li className="nav-item">
            <Link to="/profile" className="nav-link active">Profile</Link>
          </li>
          <li className="nav-item">
            <Link to="" className="nav-link active">Logout</Link>
          </li></>
           ): (          
            <>
            <li className="nav-item">
           <Link to="/login" className="nav-link active">Login</Link>
         </li>
         <li className="nav-item">
           <Link to="/signup" className="nav-link active">Create account</Link>
         </li>
         </>
         )}
        </ul>
        
         
      </div>
    </div>
  </nav>
  )
}

export default NavBar