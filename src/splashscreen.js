import "./App.css";

import { useEffect, useState } from "react"

import { Dapp } from "./dapp.js";

export const Splashscreen = () => {
    const [dappOpened, setDappOpened] = useState(false);
    
    return(
        <>
        { !dappOpened && <>
            <div className=  "header">
            <img className="logo" src="https://cdn-icons-png.flaticon.com/512/126/126472.png"></img>
        <div className= "title">LOGO</div>
        <button onClick={() => setDappOpened(true)} className="openApp" >Open App</button>
        </div>
        
        <div className = "container">
            <div className="splash"> 
            
            <h1>Gimmie yo money</h1>
            <h2>Please gimmie yo money</h2>
            </div>
        </div>
        </>}

        { dappOpened && <Dapp />}

        
        </>
    ) 
}