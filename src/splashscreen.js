import "./App.css";

import { useEffect, useState } from "react"

import { Dapp } from "./dapp.js";

export const Splashscreen = () => {
    const [dappOpened, setDappOpened] = useState(false);
    
    return(
        
        <div className = "font">
        
        { !dappOpened && <>
            <div className=  "header">
            <img className="logo" src="https://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/cdfe8bf57fec8a8.png"></img>
        <div onClick={() => setDappOpened(false)} className= "title">Legacy Keeper</div>
        <button onClick={() => setDappOpened(true)} className="openApp" >Open App</button>
        </div>
        
        <div className = "container">
            <div className="splash"> 
                <h1 className="header">Welcome to Legacy Keeper</h1>
                <h2>Please gimmie yo money</h2>
            </div>
        </div>
        </>}

        { dappOpened && <Dapp />}

        
        </div>
    ) 
}