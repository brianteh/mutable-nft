import { WagmiConfig, createClient, configureChains} from 'wagmi'

import {alchemyProvider} from 'wagmi/providers/alchemy'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
import {polygonMumbai} from 'wagmi/chains'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { FC, ReactNode } from 'react'


interface WagmiProviderProps{
    children: ReactNode,
    infura_api_key: string,
    alchemy_api_key: string
}

function WagmiProvider({children,infura_api_key,alchemy_api_key}:WagmiProviderProps){

    // Configure chains & providers with the Alchemy provider.
    // Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
    const { chains, provider, webSocketProvider } = configureChains(
        [polygonMumbai],
        [infuraProvider({ apiKey: infura_api_key, priority: 0}), alchemyProvider({apiKey: alchemy_api_key, priority:0}), publicProvider({priority: 1})],
    )
    
    // Set up client
    const client = createClient({
        autoConnect: true,
        connectors: [
        new MetaMaskConnector({ chains , options :{
            shimDisconnect: true,
            UNSTABLE_shimOnConnectSelectAccount: true
        }}),
        ],
        provider,
        webSocketProvider,
    })
    
    return (<><WagmiConfig client={client}>{children}</WagmiConfig></>)
}

export default WagmiProvider

// export const WagmiProvider: FC<WagmiProviderProps> = ({children}) => {
//     return <WagmiConfig client={client}>{children}</WagmiConfig>
// }



