import React from "react";
import { Outlet } from "react-router-dom";
import Header from './components/Header.jsx'
import Footer from "./components/Footer.jsx";

export default function Layout(){
     return(
          <div className="bg-peach">
          <Header/>
          <Outlet/>
          <Footer/>
         </div>
     )
}