import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Dar from './../assets/dar.jpeg'
import { useStateContext } from '../contexts/ContextProvider';
import {addDoc, collection, doc, serverTimestamp, setDoc} from "firebase/firestore" 
import {db} from "./../firebase"




function AddPropereties() {
  const {show, setShow} = useStateContext()
  const [title, setTitle] = useState("")
  const [type, setType] = useState("")
  const [price, setPrice] = useState("")
  const [desc, setDesc] = useState("")
  const [location, setLocation] = useState("")
  const [surface, setSurface] = useState("")
  const [d, setD] = useState([])

  const pos = async(e)=>{
    e.preventDefault()
     await navigator.geolocation.getCurrentPosition(
        (position) => {setD([position.coords.latitude, position.coords.longitude])}
     )
     console.log(d)
  }

  const handleClose = () => {
    setShow(false);
    };


 const handleAdd =  async(e)=>{
  e.preventDefault()
    try {
        const res = await addDoc(collection(db, "annonce"), {
            type : type,
            title : title,
            price : price,
            description : desc,
            location : location,
            image:Dar,
            surface : surface,
            position: d})
      } catch (error) {
          console.log(error)
      }
      console.log("zzzz")
    
 }
 
  return (
    <>

      <Modal show={show} onHide={handleClose}  size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header closeButton>
          <Modal.Title>Add a property</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleAdd}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>title</Form.Label>
              <Form.Control
                type="text"
                placeholder="appart at casa"
                autoFocus
                onChange={(e)=>setTitle(e.target.value)}
                required
              />
              <Form.Label>type</Form.Label>
              <Form.Control
                type="text"
                placeholder="appart at casa"
                autoFocus
                onChange={(e)=>setType(e.target.value)}
                required
              />
              <Form.Label>price</Form.Label>
              <Form.Control
                type="text"
                placeholder="appart at casa"
                autoFocus
                onChange={(e)=>setPrice(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="description"
              onChange={(e)=>setDesc(e.target.value)}
            >
              <Form.Label>description</Form.Label>
              <Form.Control as="textarea" rows={3} />
              
            </Form.Group>
            <Form.Label>location</Form.Label>
              <Form.Control
                type="text"
                placeholder="appart at casa"
                autoFocus
                onChange={(e)=>setLocation(e.target.value)}
                required
              />
                  <Form.Label>surface</Form.Label>
              <Form.Control
                type="text"
                placeholder="appart at casa"
                autoFocus
                onChange={(e)=>setSurface(e.target.value)}
                required
              />
              <button className='btn btn-primary p-2 m-2' onClick={pos}>add location</button>
            <button className='btn btn-primary p-2 m-2' type="submit" onClick={handleClose}>
                Add</button>

          </form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddPropereties