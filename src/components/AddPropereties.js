import React, {useRef, useState, useMemo, isValidElement} from 'react'

import Dar from './../assets/dar.jpeg'
import { useStateContext } from '../contexts/ContextProvider';
import {addDoc, collection, doc, serverTimestamp, setDoc} from "firebase/firestore" 
import {db, auth, storage} from "./../firebase"
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import { MapContainer, LocationMarker, TileLayer, Marker, Popup } from 'react-leaflet';
import {v4} from 'uuid'




function AddPropereties() {
  const {show, setShow, userName,userMail, aId} = useStateContext()
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
  const [image, setImage] = useState([])
  const [imageURL, setImageURL] = useState(null)
  
    const [position, setPos] = useState([33.5705, -7.59])
    
 console.log(aId)
  

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

    

    /*var userImage
    if (image!="") {userImage = ref(storage, `${image.replace(/C:\\fakepath\\/i, '')}`)
    console.log(userImage)}
   
    const metadata = {
      contentType: 'image/jpeg',
    };*/

    const handleImage = async()=>{
      if (image == null) return;
      const imageRef = await ref(storage, `images/${image.name + v4()}`)
     await uploadBytes(imageRef, image) .then(snapshot => console.log(snapshot))
     .catch(err => console.log(err.message));

     await getDownloadURL(imageRef).then((url)=>{
      setImageURL(url)
   })
    }
 const handleAdd =  async(e)=>{
  e.preventDefault()
  

    try {
      const res = await addDoc(collection(db, "annonce"), {
        type : type,
        title : title,
        price : Number(price),
        description : desc,
        user: userName!='' ? userName: '',
        city:ville,
        location : location,
        image:imageURL,
        surface : Number(surface),
        date : serverTimestamp(),
        position: aPosition})
        setErr(true)
      } catch (error) {
          console.log(error)
      }
      console.log("zzzz")
    
 }
 console.log(userMail)
  return (
    <div className='container p-3'>
    <div className="card">
      <div className="card-header py-3">
        <h5 className="mb-0">Ajouter une annonce</h5>
      </div>
      <div className="card-body">
        {err ? <p className="alert alert-success" role="alert">ton annonce a étè ajouté</p> : <></>}
        <form method="post" onSubmit={handleAdd}>
    
        <div className="row mb-4">
            <div className="col-md-6 mb-4">
              <div className="form-outline">
              <label className="form-label" for="form7Example1">Titre de l'annonce</label>
                <input type="text" id="form7Example1" className="form-control" onChange={(e)=>setTitle(e.target.value)} />
              </div>
            </div>
            <div className="col">
            <div className="form-outline">
              <label className="form-label" for="form7Example2">Type de l'annonce</label>
              <select className='form-control' onChange={(e)=>setType(e.target.value)}>
                <option value='vente'>vente</option>
                <option value='location'>location</option>
                </select>
              </div>
            </div>
            <div className="col">
            <div className="form-outline">
              <label className="form-label" for="form7Example2">Superficie</label>
                <input type="text" id="form7Example2" className="form-control" onChange={(e)=>setSurface(e.target.value)}/>
              </div>
            </div>  
          </div>

    
       

          <div className='row mb-4'>
          <div className='col-md-6 mb-4'>
              <div class="form-outline">
                <label class="form-label" for="form7Example4">Address</label>
                <input type="text" id="form7Example4" class="form-control" onChange={(e)=>setLocation(e.target.value)}/>
              </div>
            </div>
            <div className='col'>
            <div className="form-outline">
          <label className="form-label" for="form7Example3">Ville</label>
            <input type="text" id="form7Example3" class="form-control" onChange={e=>setVille(e.target.value)}/>
          </div>
            </div>
            <div className=''>
                <button className='btn btn-primary' onClick={pos}>add location</button>
            </div>
          </div>
          
          <div className='leaflet-container'>
          <MapContainer center={[33.5705, -7.59]} zoom={13} scrollWheelZoom={true} >
          <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
               
                  <Marker
                  draggable={true}
                  eventHandlers={eventHandlers} 
                  position={position}
                  ref = {markerRef}
                  >
                    <Popup>{position}</Popup>
                </Marker>
           
                
            
            </MapContainer>
          </div>
          <div className="form-outline mb-4">
          <label className="form-label" for="form7Example5">price</label>
            <input type="number" id="form7Example5" className="form-control" onChange={(e)=>setPrice(e.target.value)}/>
          </div>

    
          <div className="form-outline mb-4">
          <label for="formFileLg" class="form-label">Ajouter des images</label>
              <input class="form-control form-control-lg" id="formFileLg" type="file" onChange={(e)=>setImage(e.target.files[0])}/>
              <button type='button' className='btn btn-primary mt-2' onClick={handleImage}>Add Image</button>
          </div>

    
          <div className="form-outline mb-4">
          <label className="form-label" for="form7Example7">Description</label>
            <textarea className="form-control" id="form7Example7" rows="4" onChange={(e)=>setDesc(e.target.value)}></textarea>
          </div>
          <button type='submit' className='btn btn-primary'>ajouter l'annonce</button>
        </form>
      </div>
    </div>

</div>
  );
}

export default AddPropereties


