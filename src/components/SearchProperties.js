import React, {useState} from 'react'
import { useStateContext } from '../contexts/ContextProvider'
import { collection, getDocs, query, where,onSnapshot } from 'firebase/firestore';
import {db} from "./../firebase"

const SearchProperties = () => {
    const {setSearch, search} = useStateContext(); 
    const [pri, setPri] = useState(0)
    const [priMax, setPriMax] = useState("")
    const [typ, setT] = useState("location")
    const [supe, setSupe] = useState(0)
    const [city, setCity] = useState("")
    
    const handleSearch = async (e)=>{
        e.preventDefault()  
        if ((pri=='' & priMax=='') & (supe!='' & typ!='' & city !='')){
            console.log('true 1')
            const q = await query(collection(db, "annonce"), where("surface", ">=", Number(supe)), where('type', "==", typ), where('city', '==', city));
           const unsubscribe= await onSnapshot(q,(snapshot)=>
           setSearch(snapshot.docs.map(doc=>({...doc.data(),id:doc.id,key:doc.id}))))
        }
        
       
        else if ((pri!='' & priMax!='') & (supe=='' & typ==''  & city =='')){
            console.log('true')
            const q = await query(collection(db, "annonce"), where("price", '>=', Number(pri)), where("price", "<=", Number(priMax)));
           const unsubscribe= await onSnapshot(q,(snapshot)=>
           setSearch(snapshot.docs.map(doc=>({...doc.data(),id:doc.id,key:doc.id}))))
       
        }
        else if ((pri=='' & priMax=='' & supe=='' & typ=='') & ( city !='')){
            console.log('true 1')
            const q = await query(collection(db, "annonce"), where('city', '==', city));
           const unsubscribe= await onSnapshot(q,(snapshot)=>
           setSearch(snapshot.docs.map(doc=>({...doc.data(),id:doc.id,key:doc.id}))))
        }
        else if ((pri=='' & priMax=='' & supe=='' & city=='') & ( typ !='')){
            console.log('true 1')
            const q = await query(collection(db, "annonce"), where('type', '==', typ));
           const unsubscribe= await onSnapshot(q,(snapshot)=>
           setSearch(snapshot.docs.map(doc=>({...doc.data(),id:doc.id,key:doc.id}))))
        }
       
        else if ((pri=='' & priMax=='' & typ =='' & city=='') & ( supe!='')){
            console.log('true 1')
            const q = await query(collection(db, "annonce"), where('surface', '>=', Number(supe)));
           const unsubscribe= await onSnapshot(q,(snapshot)=>
           setSearch(snapshot.docs.map(doc=>({...doc.data(),id:doc.id,key:doc.id}))))
        }
       
        else{
            const q = await query(collection(db, "annonce"), where("price", '>=', Number(pri)), where("price", "<=", Number(priMax)), where("surface", "==", Number(supe)), where('type', "==", typ), where('city', '==', city));
            const unsubscribe= await onSnapshot(q,(snapshot)=>
            setSearch(snapshot.docs.map(doc=>({...doc.data(),id:doc.id,key:doc.id})))
        ); 
        }
         
        
    }
   
    console.log('res', search)

  return (
    <section className="search-sec justify-content-center align-items-center">
    <div className="container">
        <form onSubmit={handleSearch} method="get">
            <div className="row">
                <div className="col-lg-12">
                    <div className="row">
                    <div className="col-lg-2 col-md-3 col-sm-12 p-1">
                            <input type="text" pattern="[0-9]*" className="form-control search-slt" placeholder="superfecie de terrain ou appartement" onChange={(e)=>setSupe(e.target.value)} />
                        </div>
                        <div className="col-lg-1 col-md-3 col-sm-12 p-1">
                        <input type="number" className="form-control search-slt" placeholder="prix min" onChange={(e)=>setPri(e.target.value)} />
                        </div>
                        <div className="col-lg-1 col-md-3 col-sm-12 p-1">
                        <input type="number" className="form-control search-slt" placeholder="prix max" onChange={(e)=>setPriMax(e.target.value)} />
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-12 p-1">
                            <input type="text" className="form-control search-slt" placeholder="entrer la ville" onChange={(e)=>setCity(e.target.value)} />
                        </div>
     
                        <div className="col-lg-3 col-md-3 col-sm-12 p-1">
                            <select className="form-control search-slt" onChange={(e)=>setT(e.target.value)}>
                            <option value=''>
                                  <p>vente ou location</p>
                                </option><option value='location'>
                                  <p>location</p>
                                </option>
                                <option value='vente'>
                                    <p>vente</p>
                                </option>
                            </select>
                         </div>
                        <div className="col-lg-3 col-md-3 col-sm-12 p-1">
                            <button type="submit" className="btn btn-danger wrn-btn">Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</section>
  )
}

export default SearchProperties