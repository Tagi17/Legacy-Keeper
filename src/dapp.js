import '@rainbow-me/rainbowkit/styles.css';

import {
  RainbowKitProvider,
  getDefaultWallets,
} from '@rainbow-me/rainbowkit';
import { WagmiConfig, configureChains, createClient } from 'wagmi';
import { useEffect, useState } from "react"

import { ConnectButton } from '@rainbow-me/rainbowkit';
import abi from './abi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { baseGoerli } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { ethers } = require("ethers");



const { chains, provider } = configureChains(
    [baseGoerli],
    [
      alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
      publicProvider()
    ]
  );
  
  const { connectors } = getDefaultWallets({
    appName: 'Hello Kitty App',
    projectId: 'YOUR_PROJECT_ID',
    chains
  });
  
  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
  })

export const Dapp = () => {
  
    const [manageClicked, setManageClicked] = useState(false);
    const [claimClicked, setClaimClicked] = useState(false);


    
    const Manage = () => {
      const [beneficiaryName, setBeneficiaryName] = useState('');
      const [beneficiaryAddress, setBeneficiaryAddress] = useState('');
      const [beneficiaryAmount, setBeneficiaryAmount] = useState('');
    
      const handleBeneficiaryNameChange = (event) => {
        setBeneficiaryName(event.target.value);
      };
      const handleBeneficiaryAddressChange = (event) => {
        setBeneficiaryAddress(event.target.value);
      };
      const handleBeneficiaryAmountChange = (event) => {
        setBeneficiaryAmount(event.target.value);
      };

      const createWill = async (event) => {
      
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const legacyKeeperAddress = "0xeF35e201aaBEFe47Ff3e01c87ef6D35878588B0C";
        const legacyKeeper = new ethers.Contract(legacyKeeperAddress, abi, provider);
        const legacyKeeperWithSigner = legacyKeeper.connect(signer);
        await legacyKeeperWithSigner.addBeneficiary(beneficiaryName, beneficiaryAddress, beneficiaryAmount,0);
      }
      
      return(
          <div>
              <h1 className="inheritance">Manage Inheritance</h1>
             
          <label htmlFor="beneficiaryName">Beneficiary Name</label>
          <input
            type="text"
            id="beneficiaryName"
            name="beneficiaryName"
            value={beneficiaryName}
            onChange={handleBeneficiaryNameChange}
          />
          <label htmlFor="beneficiaryAddress">Beneficiary Address</label>
          <input
            type="text"
            id="beneficiaryAddress"
            name="beneficiaryAddress"
            value={beneficiaryAddress}
            onChange={handleBeneficiaryAddressChange}
          />
          <label htmlFor="beneficiaryAmount">Beneficiary Amount</label>
          <input
            type="text"
            id="beneficiaryAmount"
            name="beneficiaryAmount"
            value={beneficiaryAmount}
            onChange={handleBeneficiaryAmountChange}
          />
        <button className="buttons" onClick={()=> createWill()}> Submit </button>
        
        <button className="buttons" onClick={()=> setManageClicked(false)}> Back </button>
          </div>
      )
    }


    
    
    const Claim = () => {
      const [inheritorAddress, setInheritorAddress] = useState('');
      const handleInheritorChange = (event) => {
        setInheritorAddress(event.target.value);
      };
      
      return(
          <div>
              <h1>Claim Inheritance</h1>
              <form>
          <label htmlFor="inheritorAddress">Inheritor Address</label>
          <input
            type="text"
            id="inheritorAddress"
            name="inheritorAddress"
            value={inheritorAddress}
            onChange={handleInheritorChange}
          />
          <button className="buttons" onClick={()=> setInheritorAddress(false)}> Claim </button>
          </form>
              <button className="buttons" onClick={()=> setClaimClicked(false)}> Back </button>
          </div>
      )
    }    


    
    return(
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
      <>
    <div className=  "header">
            <a href="/">
            <img className="logo" src="https://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/cdfe8bf57fec8a8.png"></img>
            </a>
        <div className= "title">Legacy Keeper</div>
          <div className="connectWallet">
          <ConnectButton>Connect</ConnectButton>
          </div>
        </div>
     
        { !manageClicked && !claimClicked && <>
        <h1 className="testing"> TESTING TESTING</h1>
        <button className="buttons" onClick={()=> setManageClicked(true)}> Manage Inheritance </button>
        <button className="buttons" onClick={()=> setClaimClicked(true)}> Claim Inheritance </button>
        </> 
        }

        { manageClicked && <Manage />}
        { claimClicked && <Claim />}
        </> 
         
         </RainbowKitProvider>
    </WagmiConfig> )
         
} 