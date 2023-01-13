import React,{useRef, useState, useMemo, useEffect} from 'react'
import Dar from './../assets/dar.jpeg'
import { useStateContext } from '../contexts/ContextProvider';
import {doc, updateDoc, collection,documentId, query, where, onSnapshot, serverTimestamp} from "firebase/firestore" 
import {db, auth, storage} from "./../firebase"
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import { MapContainer, LocationMarker, TileLayer, Marker, Popup } from 'react-leaflet';
import {v4} from 'uuid'
const UpdateAppr = () => {
    const {show, setShow, userName,aId} = useStateContext()
    const [title, setTitle] = useState("")
    const [ville, setVille] = useState("")
    const [type, setType] = useState("vente")
    const [price, setPrice] = useState(0)
    const [desc, setDesc] = useState("")
    const [location, setLocation] = useState("")
    const [surface, setSurface] = useState(0)
    const markerRef = useRef(null)
    const [d, setD] = useState([])
    const [err, setErr] = useState(false)
    const [data, setData] = useState([])
    const [image, setImage] = useState(null)
    const [imageURL, setImageURL] = useState(null)
    
    const [position, setPos] = useState([33.5705, -7.59])
      
   console.log(aId)
    // data query
   useEffect( ()=>{
    const fetchData = async ()=>{
      const q = await query(collection(db, "annonce"), where(documentId(), '==', aId));
      const unsubscribe= await onSnapshot(q,(snapshot)=>
      setData(snapshot.docs.map(doc=>({...doc.data(),id:doc.id}))))
    }
    fetchData()
   },  [])
    
// image 
const handleImage = async()=>{
  if (image == null) return;
  const imageRef = await ref(storage, `images/${image.name + v4()}`)
 await uploadBytes(imageRef, image) .then(snapshot => console.log(snapshot))
 .catch(err => console.log(err.message));

 await getDownloadURL(imageRef).then((url)=>{
    setImageURL(url)
 })
}
// position finder
    const pos = async(e)=>{
      e.preventDefault()
       await navigator.geolocation.getCurrentPosition(
          (position) => {setD([position.coords.latitude, position.coords.longitude])}
          
       ) 
    }
   
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current
          if (marker != null) {
            setPos([marker.getLatLng().lat, marker.getLatLng().lng])
          }
        },
      }),
      [],
    )
  
      const aPosition = d.length !=0 & position.length == 0? d : position

// handling updates
   const handleupdate = async(e)=>{
    e.preventDefault()
    const annonce = doc(db, 'annonce', aId)
    if (data.length!=0){
      await updateDoc(annonce, {
        type : type ,
            title : title!=''?title:data[0].title ,
            price : Number(price) !=0?Number(price) : data[0].price ,
            description : desc !=''? desc: data[0].description,
            city:ville !=''? ville: data[0].city,
            location : location!=''? location: data[0].location,
            surface : Number(surface) != ''? Number(surface): data[0].surface ,
            date: serverTimestamp(),
            image:imageURL!=null? imageURL:data[0].image,
            position: aPosition !=''? aPosition : data[0].position,
      })
    }
    
    await setErr(true)
   }

    return (
      <div className='container p-3'>
      <div className="card">
        <div className="card-header py-3">
          <h5 className="mb-0">updater une annonce</h5>
        </div>
        <div className="card-body">
          {err ? <p className="alert alert-success" role="alert">ton annonce a étè updaté</p> : <></>}
          {data.map((item, key)=>{
               return(
                <form method="post" onSubmit={handleupdate} key={key}>
           
          <div className="row mb-4" key={key}>
              <div className="col-md-6 mb-4">
                <div className="form-outline">
                <label className="form-label" htmlFor="form7Example1">Titre de l'annonce</label>
                  <input type="text" id="form7Example1" className="form-control" onChange={(e)=>setTitle(e.target.value)} defaultValue={item.title} />
                </div>
              </div>
              <div className="col">
              <div className="form-outline">
                <label className="form-label" htmlFor="form7Example2">Type de l'annonce</label>
                <select className='form-control' onChange={(e)=>setType(e.target.value)} defaultValue={item.type}>
                  <option value='vente'>vente</option>  
                  <option value='location'>location</option>
                  </select>
                </div>
              </div>
              <div className="col">
              <div className="form-outline">
                <label className="form-label" htmlFor="form7Example2">Superficie</label>
                  <input type="text" id="form7Example2" className="form-control" onChange={(e)=>setSurface(e.target.value)} defaultValue={item.surface}/>
                </div>
              </div>  
            </div>
  
      
         
  
            <div className='row mb-4'>
            <div className='col-md-6 mb-4'>
                <div className="form-outline">
                  <label className="form-label" htmlFor="form7Example4">Address</label>
                  <input type="text" id="form7Example4" className="form-control" onChange={(e)=>setLocation(e.target.value)} defaultValue={item.location}/>
                </div>
              </div>
              <div className='col'>
              <div className="form-outline">
            <label className="form-label" htmlFor="form7Example3">Ville</label>
              <input type="text" id="form7Example3" className="form-control" onChange={e=>setVille(e.target.value)} defaultValue={item.city}/>
            </div>
              </div>
              <div className=''>
                  <button className='btn btn-primary' onClick={pos}>add location</button>
              </div>
            </div>
            
            <div className='leaflet-container'>
            <MapContainer center={item.position} zoom={13} scrollWheelZoom={true} >
            <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                 
                    <Marker
                    draggable={true}
                    eventHandlers={eventHandlers} 
                    position={item.position}
                    ref = {markerRef}
                    >
                      <Popup>{position}</Popup>
                  </Marker>
             
                  
              
              </MapContainer>
            </div>
            <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form7Example5">price</label>
              <input type="number" id="form7Example5" className="form-control" onChange={(e)=>setPrice(e.target.value)} defaultValue={item.price}/>
            </div>
  
      
            <div className="form-outline mb-4">
            <label htmlFor="formFileLg" class="form-label">Ajouter des images</label>
                <input class="form-control form-control-lg" id="formFileLg" type="file" onChange={(e)=>setImage(e.target.files[0])}/>
                <button type='button' onClick={handleImage}>Add Image</button>
            </div>
  
      
            <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form7Example7">Description</label>
              <textarea className="form-control" id="form7Example7" rows="4" onChange={(e)=>setDesc(e.target.value)} defaultValue={item.description}></textarea>
            </div>
            <button type='subbmit'>updater l'annonce</button>
          </form>
               ) 
            })}
        </div>
      </div>
  
  </div>)
}

export default UpdateAppr