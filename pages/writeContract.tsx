import dynamic from "next/dynamic";
const Read_Test = dynamic(() => import("../components/read_test"), { ssr: false });

import WagmiProvider from '../components/wagmi_context'
import type { wagmiApiKeyProps } from '../types/api_key_props'

function Read({infura_api_key,alchemy_api_key}:wagmiApiKeyProps){
    
    return (<>
        <WagmiProvider infura_api_key={infura_api_key} alchemy_api_key={alchemy_api_key}>
            <Read_Test></Read_Test>
        </WagmiProvider>
    </>)
    
}

export default Read

export async function getServerSideProps(){ 
    return {
        props:{
            infura_api_key: process.env.infura_api_key,
            alchemy_api_key: process.env.alchemy_api_key
        }
    }
}