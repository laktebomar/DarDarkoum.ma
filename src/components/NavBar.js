import React, {useState} from 'react'
import {Link, NavLink, useNavigate} from 'react-router-dom'
import LOGO from './../assets/darDarkoum.png'
import { useStateContext } from '../contexts/ContextProvider'
import {auth} from './../firebase'
import { Navbar, Nav , Container, NavDropdown } from 'react-bootstrap'

const NavBar = () => {
  const {logged, setHide, setShow, userRole, setLogged} = useStateContext()
  const [display, setDisplay] = useState("show")
  const navigate = useNavigate();


  const handleClick = () => {
    setDisplay(display==="show"?"hide":"show")
    
    setHide(prevState => !prevState)
    
 }
 const handleShow = () => setShow(true);

  const logOut  = async ()=>{
    await auth.signOut().then(()=>{
            localStorage.removeItem('authUser')
            setLogged(false)}
    ).catch((e)=>console.log(e))
    
  }
  return (
    
  <Navbar bg="light" expand="lg">
      <Container>
        <Link className='nav-link active' to="/">DarDARKOUM</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
             <ul className="navbar-nav">
             <li className="nav-item">
               <Link to="" className="nav-link active">Home</Link>
             </li>
             <li className="nav-item">
             <button className="nav-link active btn" onClick={handleClick}> {display} map</button>
          </li>
          {logged && userRole=="user"? (
            <>
            <li className="nav-item">
             <Link to="/ajouterannonce" className="nav-link active  btn-transparent"> add properties</Link>
             
          </li>
             <li className="nav-item">
            <Link to="/profile" className="nav-link active">Profile</Link>
          </li>
          <li className="nav-item"> 
            <a href='/' className="btn" onClick={logOut}>Logout</a>
          </li>
          <li className="nav-item">
             <a href="http://localhost:3001/"  target="_blank" className="nav-link active">Admin</a>
           </li>
           </>
           ): logged ? (<>
            <li className="nav-item">
             <Link to="/ajouterannonce" className="nav-link active btn"> add properties</Link>
             
          </li>
             <li className="nav-item">
            <Link to="/profile" className="nav-link active">Profile</Link>
          </li>
          <li className="nav-item">
            <a className="nav-link active btn-transparent"  onClick={logOut}>Logout</a>
          </li></>):(         
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
        
         
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar



    {/*
  <nav className="navbar navbar navbar-expand-lg bg-light">
    <div className="container-fluid">
      
      <Link to="" className="navbar-brand ms-4">DarDARKOUM</Link>
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
            {logged && userRole=="user"? (
              <>
              <li className="nav-item">
              <Link to="/ajouterannonce" className="btn"> add properties</Link>
              
            </li>
              <li className="nav-item">
              <Link to="/profile" className="nav-link active">Profile</Link>
            </li>
            <li className="nav-item"> 
              <a href='/' className="btn" onClick={logOut}>Logout</a>
            </li>
            <li className="nav-item">
              <a href="http://localhost:3000/"  target="_blank" className="nav-link active">Admin</a>
            </li>
            </>
            ): logged ? (<>
              <li className="nav-item">
              <Link to="/ajouterannonce" className="btn"> add properties</Link>
              
            </li>
              <li className="nav-item">
              <Link to="/profile" className="nav-link active">Profile</Link>
            </li>
            <li className="nav-item">
              <a className="btn"  onClick={logOut}>Logout</a>
            </li></>):(         
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
  </nav>*/}
