import React, { useEffect, useState } from 'react'
import { collection, getDocs, query, where,onSnapshot, documentId} from 'firebase/firestore';
import {db} from '../firebase'
import { useStateContext } from '../contexts/ContextProvider'
import {MapContainer, TileLayer, LocationMarker, Marker, Popup} from 'react-leaflet'
const ProductInfo = () => {

  const {userMail, userName, annonceId} = useStateContext()
  const [data, setData] = useState([])
  const [x, setX] = useState("")
  const [prNear, setPrNear] = useState([])

  useEffect(()=>{
    const q = query(collection(db, "annonce"), where(documentId(), '==', annonceId));
    const unsubscribe= onSnapshot(q,(snapshot)=>{
    setX("oo")
    setData(snapshot.docs.map(doc=>({...doc.data(),id:doc.id})))})


    if (data.length !=0){
      const prodNear = query(collection(db, "annonce"), where('location', '==', data[0].location));
      const unsub= onSnapshot(prodNear,(snapshot)=>
      setPrNear(snapshot.docs.map(doc=>({...doc.data(),id:doc.id})))  
  );
  } 
  }, [annonceId, x])

  console.log(prNear)
  console.log(annonceId)
  return (
    data.map((item, index)=>{
      return (
        <div className="container mt-3 shadow rounded-3 ">

        <h1 className="my-4">{item.title}
        </h1>
      
        
        <div className="row">
      
          <div className="col-md-8">
            <img className="img-fluid" src={item.image} alt=""/>
            <h3 className="my-4 text-muted">Autres Annonces dans {item.city}</h3>
      
        <div className="row">
          {prNear.map((itm, key)=>{
            return(
            <div className="col-md-3 col-sm-6 mb-4" key={key}>
            <a href="#">
                  <img className="img-fluid" src={itm.image} alt=""/>
                </a>
          </div>)
          })}
          
      
        </div>
          </div>
      
          <div className="col-md-4">
            <h3 className="my-3">Annonce Desc</h3>
            <p>{item.description}</p>
            <h3 className="my-3">Annonce Details</h3>
            <ul className='list-unstyled'>
              <li> - Price : {item.price}</li>
              <li> - Superfecie : {item.surface}</li>
              <li> - Addresse : {item.location}</li>
              <li> - type: {item.type}</li>
              <li> - Number: </li>
            </ul>
            <div className='leaflet-container shadow rounded-3' style={{height: "39%"}}>
            <MapContainer center={[item.position[0], item.position[1]]} zoom={10} scrollWheelZoom={true}>
              <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                     <Marker position={[item.position[0], item.position[1]]} >
                  <Popup>
                  </Popup>
                  </Marker>
                </MapContainer>
            </div>
          </div>
          
      
        </div>
        
      
      </div>
      )
    })
    
  )
}

export default ProductInfo