import '@rainbow-me/rainbowkit/styles.css';

import {
  RainbowKitProvider,
  getDefaultWallets,
} from '@rainbow-me/rainbowkit';
import { WagmiConfig, configureChains, createClient } from 'wagmi';
import { arbitrum, mainnet, optimism, polygon } from 'wagmi/chains';
import { useEffect, useState } from "react"

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
    [mainnet, polygon, optimism, arbitrum],
    [
      alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
      publicProvider()
    ]
  );
  
  const { connectors } = getDefaultWallets({
    appName: 'My RainbowKit App',
    projectId: 'YOUR_PROJECT_ID',
    chains
  });
  
  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
  })

export const Dapp = () => {
    return(
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
      <>
    <div className=  "header">
            <img className="logo" src="https://cdn-icons-png.flaticon.com/512/126/126472.png"></img>
        <div className= "title">LOGO</div>
        <div className="connectWallet">
        <ConnectButton>Connect</ConnectButton>
        </div>


        
        </div>
        <h1> TESTING TESTING</h1>
        
         </> 
         
    
         </RainbowKitProvider>
    </WagmiConfig> )
         
} 
