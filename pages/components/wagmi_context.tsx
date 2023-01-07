import { WagmiConfig, createClient, configureChains} from 'wagmi'

import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
import {polygonMumbai} from 'wagmi/chains'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { FC, ReactNode } from 'react'

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, provider, webSocketProvider } = configureChains(
 [polygonMumbai],
 [infuraProvider({ apiKey: process.env.infura_api_key || ""}), publicProvider()],
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

interface WagmiProviderProps{
    children: ReactNode
}
function WagmiProvider({children}:WagmiProviderProps){
    return (<><WagmiConfig client={client}>{children}</WagmiConfig></>)
}
export default WagmiProvider
// export const WagmiProvider: FC<WagmiProviderProps> = ({children}) => {
//     return <WagmiConfig client={client}>{children}</WagmiConfig>
// }


