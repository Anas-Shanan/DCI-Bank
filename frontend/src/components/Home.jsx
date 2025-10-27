import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import { registerApi, loginApi } from './api';

export default function Home() {
   const navigate = useNavigate();
   const [modal, setModal] = useState(false);
   const [register, setRegister] = useState(false);
   const [name, setName] = useState("");
   const [customerId, setCustomerId] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const handleSubmit = async (evt)=>{
      evt.preventDefault();
      const data = {name, customerId, email, password};
      console.log(data);
      setRegister(false);
      setName("");
      setCustomerId("");
      setEmail("");
      setPassword("");
      if (!register){
         const user = await loginApi(data);
         if (user) {
            setModal(false);
            navigate("/members");
            return;
         }
         return;
      }
      await registerApi(data)
      setModal(false);
   }

  return (
   <div className="contentWrapper">
      <Navigation setModal={setModal} />
      <div className="teaser">
      <div className="teaser__box">
         <h2>Passgenau finanziert. Mit dem ausgezeichneten DCI Bank BaufinanzFinder.</h2>
         <p>Beste Beratung bei der Baufinanzierung mit dem "Finanzprodukt des Jahres": Mit uns über 300 Baufinanzierer vergleichen und das beste Angebot mit den besten Zinsen sichern. Finden Sie die Immobilienfinanzierung, die zu Ihnen passt! <br/><span>Jetzt beraten lassen.</span></p>
         <button>Mehr erfahren</button>
      </div>
      </div>
      {modal && <div className="modal">
         <form action="">
            <span onClick={()=>setModal(false)}>Schliessen</span>
            <h3>{register ? "Registrieren" : "Melden Sie sich an!"}</h3>
            {register && <><label>Name
               <input type="text" value={name} onChange={(evt)=>setName(evt.target.value)} />
            </label>
            <label>Kundennummer
               <input type="text" value={customerId} onChange={(evt)=>setCustomerId(evt.target.value)} />
            </label></>}
            <label>E-Mail
               <input type="email" value={email} onChange={(evt)=>setEmail(evt.target.value)}/>
            </label>
            <label >Passwort
               <input type="password" value={password} onChange={(evt)=>setPassword(evt.target.value)} />
            </label>
            <button onClick={handleSubmit}>{register ? "Registrieren" : "Anmelden"}</button>
            {register ? <p className='register'><span onClick={()=>setRegister(false)}>Zur Anmeldung</span></p> : <p className='register'>Noch kein Konto? <span onClick={()=>setRegister(true)}>Jetzt registrieren!</span></p>}
            <div className="footerWrapper">
               <span>Sicherheitshinweise</span>
               <span className='divider'></span>
               <span>Anmeldedaten vergessen?</span>
            </div>
         </form>
     </div>}
 </div>
  )
}
