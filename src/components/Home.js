import React, {useState, useEffect} from 'react'
import { MapList } from './MapList';
import SearchProperties from './SearchProperties';
import { useStateContext } from '../contexts/ContextProvider';
import { collection, getDocs, query, onSnapshot } from 'firebase/firestore';
import {db} from "./../firebase"


const Home = () => {
   const [data, setData] = useState([])
   const {setHide, setClassN} = useStateContext()



   useEffect(()=>{
  {/* const fetchData = async ()=>{
      let l = [];
         try{
            const querySnapshot = await getDocs(collection(db, "annonce"));

            querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            l.push(doc.data())
            });
            setData(l)
         }catch(e){
            console.log(e)
         }
         
      }

      fetchData()*/}

      const q = query(collection(db, "annonce"));
               const unsubscribe = onSnapshot(q, (querySnapshot) => {
               const cities = [];
               querySnapshot.forEach((doc) => {
                     cities.push(doc.data());
               });
               setData(cities)
               });

   },[])
   console.log(data)
  return (
   <div>
      
      <MapList/>
      <SearchProperties/>
      <section style={{backgroundColor: "#eee"}}>
  <div className="container py-3">
   {data.map((item,key)=>{
      return(
         <div className="row justify-content-center mb-3" key={key}>
         <div className="col-md-12 col-xl-10">
            <div className="card shadow-0 border rounded-3">
            <div className="card-body">
               <div className="row">
                  <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                  <div className="bg-image hover-zoom ripple rounded ripple-surface">
                     <img
                        src={item.image}
                        className="w-100"
                     />
                     <a href="#!">
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
                  <h5>{item.title}</h5>
                  <div className="d-flex flex-row">
                     <div className="text-danger mb-1 me-2">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                     </div>
                     <span>{item.surface} m</span>
                  </div>
                  <div className="mt-1 mb-0 text-muted small">
                     <span>{item.location}</span>
                     <span className="text-primary"> • </span>
                     <span>{item.position} <br /></span>
                  </div>
                  <div className="mb-2 text-muted small">
                     <span>Posted by  user</span>
                     <span className="text-primary"> • </span>
                     <span>at  <br /></span>
                  </div>
                  <p className="text-truncate mb-4 mb-md-0">
                     {item.description}
                  </p>
                  </div>
                  <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                  <div className="d-flex flex-row align-items-center mb-1">
                     <h4 className="mb-1 me-1">{item.price} DH</h4>
                  </div>
                  <h6 className="text-success">{item.type}</h6>
                  <div className="d-flex flex-column mt-4">
                     <button className="btn btn-primary btn-sm" type="button">Details</button>
                     <button className="btn btn-outline-primary btn-sm mt-2" type="button">
                        Add to wishlist
                     </button>
                  </div>
                  </div>
               </div>
            </div>
            </div>
         </div>
         </div>
   )})}
   
  
  </div>
</section>
 </div>
  )
}

export default Home