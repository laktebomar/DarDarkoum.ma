import React from 'react'
import { Navigate } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'
import Dar from './../assets/dar.jpeg'
import AddPropereties from './AddPropereties'

const user = [{
  name : "Omar Lakteb",
  city : "CASABLANCA",
  listedProduct: "15",
  soldProduct : "12",
}]


const ProfilePage = () => {
  const {logged, setShow} = useStateContext()
  const handleShow = () => setShow(true);

  return (
 
      <section className="h-100 gradient-custom-2">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-9 col-xl-7">
              <div className="card">
              {user.map(item=>{
                    return(
                      <>
                      <div className="rounded-top text-white d-flex flex-row" style={{backgroundColor: "#000", height:"200px"}}>
                      <div className="ms-4 mt-5 d-flex flex-column" style={{width: "150px"}}>
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                          alt="Generic placeholder image" className="img-fluid img-thumbnail mt-4 mb-2"
                          style={{width: "150px" ,zIndex: "1"}}/>
                        <button type="button" className="btn btn-outline-dark" data-mdb-ripple-color="dark"
                          style={{zIndex: "1"}} onClick={handleShow}>
                          Add Properties
                        </button>
                        <AddPropereties/>
                      </div>
                     
                      <div className="ms-3" style={{marginTop: "130px"}}>
                        <h5>{item.name}</h5>
                        <p>{item.city}</p>
                      </div>
                    </div>
                    <div className="p-4 text-black" style={{backgroundColor: "#f8f9fa"}}>
                      <div className="d-flex justify-content-end text-center py-1">
                        <div>
                          <p className="mb-1 h5">{item.listedProduct}</p>
                          <p className="small text-muted mb-0">listed Product</p>
                        </div>
                        <div className="px-3">
                          <p className="mb-1 h5">{item.soldProduct}</p>
                          <p className="small text-muted mb-0">Sold Product</p>
                        </div>
                      </div>
                    </div>
                    </>
                    )
                  })}
               
               <div className="row justify-content-center mb-3">
         <div className="col-md-12 col-xl-10">
            <div className="card shadow-0 border rounded-3">
            <div className="card-body">
               <div className="row">
                  <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                  <div className="bg-image hover-zoom ripple rounded ripple-surface">
                     <img
                        src={Dar}
                        className="w-100"
                     />
                     <a href="#">
                        <div className="hover-overlay">
                        <div
                           className="mask"
                           style={{backgroundColor: "rgba(253, 253, 253, 0.15)"}}
                        ></div>
                        </div>
                     </a>
                  </div>
                  </div>
                  <div className="col-md-6 col-lg-6 col-xl-6">
                  <h5>loren upsem</h5>
                  <div className="d-flex flex-row">
                     <div className="text-danger mb-1 me-2">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                     </div>
                     <span>80 m</span>
                  </div>
                  <div className="mt-1 mb-0 text-muted small">
                     <span>casa blanca </span>
                     <span className="text-primary"> • </span>
                     <span>el fourat <br /></span>
                  </div>
                  <div className="mb-2 text-muted small">
                     <span>Posted by omar</span>
                     <span className="text-primary"> • </span>
                     <span>at 16:45 wednesday <br /></span>
                  </div>
                  <p className="text-truncate mb-4 mb-md-0">
                     faefeafzefhz  ezbkdezdfdbez ezfdezdlezd edledezvdjez
                  </p>
                  </div>
                  <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                  <div className="d-flex flex-row align-items-center mb-1">
                     <h4 className="mb-1 me-1">3000 DH</h4>
                  </div>
                  <h6 className="text-success">rent</h6>
                  <div className="d-flex flex-column mt-4">
                     <button className="btn btn-primary btn-sm" type="button">delete</button>
                     <button className="btn btn-outline-primary btn-sm mt-2" type="button">
                       update
                     </button>
                  </div>
                  </div>
               </div>
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

export default ProfilePage