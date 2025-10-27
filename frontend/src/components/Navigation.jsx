import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bank from "../assets/bank-icon.svg";
import menu from "../assets/menu.svg";

export default function Navigation({setModal}) {
   const navigate = useNavigate();
  return (
    <>
    <nav>
     <div className='navBarTop'>
       <div className="wrapperLeft">
         <span>Privatkunden</span>
         <span>Firmenkunden</span>
       </div>
       <div className="wrapperRight">
         <img src={menu} alt="" />
       </div>
     </div>
     <div className='navBarBottom'>
       <div className="logoWrapper" onClick={()=>navigate("/")}><img src={bank} alt="" /> DCI Bank</div>
       <div className="links">
         <ul>
           <li>Produkte</li>
           <li>Girokonto</li>
           <li>Online-Banking</li>
           <li>Service-Center</li>
           <li>Firmenkunden</li>
           <li>Private Banking</li>
           <li>Ihre DCI Bank</li>
         </ul>
       </div>
       <div className="buttons"><span>Suche</span><span onClick={()=>setModal(true)}>Anmelden</span></div>
     </div>
   </nav>
    </>
  )
}
