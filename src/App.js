
import './App.css';
import Home from './components/Home';
import NavBar from './components/NavBar';
import ProfilePage from './components/ProfilePage';
import SignUp from './components/SignUp';
import { BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

import Login from "./components/Login"
import ProductInfo from './components/ProductInfo';
import { useStateContext } from './contexts/ContextProvider';
import { useState } from 'react';
import AddPropereties from './components/AddPropereties';

function App() {
  const {logged} = useStateContext()
  const RequireAuth = ({children})=>{
    return logged ? children : <Navigate to="/login"/> }
  return (
    <BrowserRouter >
      <NavBar/>
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/profile" element={<RequireAuth> <ProfilePage/></RequireAuth>}/>
      <Route path='/product' element={<ProductInfo/>}/>
        <Route path="/Profile" element={<ProfilePage/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
