import React, {useState, useEffect} from 'react'
import { MapContainer, LocationMarker, TileLayer, Marker, Popup } from 'react-leaflet';
import { useStateContext } from '../contexts/ContextProvider';
import Dar from './../assets/dar.jpeg'
import { collection, getDocs, query, onSnapshot } from 'firebase/firestore';

import {db} from "./../firebase"


    
export const MapList = () => {
  const [data1, setData] = useState([])
  const {hide, classN, search} = useStateContext()

  useEffect(()=>{
    const q = query(collection(db, "annonce"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const cities = [];
    querySnapshot.forEach((doc) => {
          cities.push(doc.data());
    });
    setData(cities)
    });
 },[])
  return (
        <div>
          {hide?(
            <div>
            </div>
            ):(
              (search.length!=0)?(
                <div className='leaflet-container p-1 shadow'>
                <MapContainer center={[33.5705, -7.59]} zoom={15} scrollWheelZoom={true}>
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {search.map((item, key)=>{
                  return(
                    <Marker position={[item.position[0], item.position[1]]} key={key}>
                    <Popup>
                    <img src={Dar} style={{width:"50%", height:"50%"}}/><br/>
                    {item.type} for {item.price} <br /> 
                    </Popup>
                    </Marker>
                )   })
                }
                </MapContainer>
                </div>
              ):(
                <div className='leaflet-container p-1 shadow'>
              <MapContainer center={[33.5705, -7.59]} zoom={15} scrollWheelZoom={true}>
              <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {data1.map((item, key)=>{
                return(
                  <Marker position={[item.position[0], item.position[1]]} key={key}>
                  <Popup>
                  <img src={Dar} style={{width:"50%", height:"50%"}}/><br/>
                  {item.type} for {item.price} <br /> 
                  </Popup>
                  </Marker>
              )   })
              }
              </MapContainer>
              </div>
              )
           
              
      ) }
</div>        
  )
}
