
import './App.css';
import Home from './components/Home';
import NavBar from './components/NavBar';
import ProfilePage from './components/ProfilePage';
import SignUp from './components/SignUp';
import { BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {auth} from './firebase'
import { collection, getDocs, docs, query, where,onSnapshot, limit } from 'firebase/firestore';
import {db} from "./firebase"
import Login from "./components/Login"
import ProductInfo from './components/ProductInfo';
import { useStateContext } from './contexts/ContextProvider';
import AddPropereties from './components/AddPropereties';
import UpdateAppr from './components/UpdateAppr';
import SideNavbar from './components/admin/SideNavbar';
import { useEffect } from 'react';

function App() {
  const {logged, setLogged, setUserRole, setUserName} = useStateContext()

  useEffect(()=>{
    if (auth.currentUser){
      const u = query(collection(db, "users"), where("email", "==",auth.currentUser.email));
      const unsub = onSnapshot(u, (querySnapshot) => {
         const uData = [];
         querySnapshot.forEach((doc) => {
               uData.push(doc.data());
         });
         setUserName(uData[0].username)
         setUserRole(uData[0].role)
         });}  
  })

  const RequireAuth = ({children})=>{
    return logged ? children : <Navigate to="/login"/> }


    if (localStorage.getItem('authUser')!=null){
      setLogged(true)
    }
     
    console.log('tst', localStorage.getItem("authUser"))
  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/profile" element={<RequireAuth> <ProfilePage/></RequireAuth>}/>
      <Route path='/product' element={<ProductInfo/>}/>
        <Route path="/ajouterannonce" element={<AddPropereties/>}></Route>
        <Route path="/Profile" element={<ProfilePage/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/admin" element={<SideNavbar/>}></Route>
        <Route path='/updater' element={<UpdateAppr/>}></Route>
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
