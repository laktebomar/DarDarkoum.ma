import React, {useState, useEffect} from 'react'
import { MapContainer, LocationMarker, TileLayer, Marker, Popup } from 'react-leaflet';
import { useStateContext } from '../contexts/ContextProvider';
import Dar from './../assets/dar.jpeg'
import { collection, getDocs } from 'firebase/firestore';
import {db} from "./../firebase"

const data= [
  {   type : "appartement",
      title : "appartement à lmaarif",
      price : "5000",
      description : "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
      location : "biranzaran rue dadd",
      surface : "70",
    position: [33.586, -7.613]
  },
  {
    type:"apparement",
    price:"700000 DH",
    position: [33.701, -7.384]
  },
  {
    type:"House",
    price:"2000000 DH",
    position: [34.685, -7.393]
  },
  {
    type:"apparement",
    price:"700000 DH",
    position: [33.901, -7.384]
  }
  ,
  {
    type:"apparement",
    price:"700000 DH",
    position: [33.51, -7.384]
  }
  ,
  {
    type:"apparement",
    price:"700000 DH",
    position: [33.751, -7.384]
  }
  ,
  {
    type:"apparement",
    price:"700000 DH",
    position: [33.601, -7.384]
  }
]
    
export const MapList = () => {
  const [data1, setData] = useState([])
  const {hide, classN} = useStateContext()

  useEffect(()=>{
    const fetchData = async ()=>{
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

    fetchData()
 },[])
  return (
        <div>
          {hide?(
            <div>
            </div>
            ):(
            <div className='leaflet-container p-1'>
              <MapContainer center={[33.5705, -7.59]} zoom={13} scrollWheelZoom={true}>
              <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {data.map((item, key)=>{
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
      ) }
</div>        
  )
}
