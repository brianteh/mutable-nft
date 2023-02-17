import dynamic from "next/dynamic";
const Write_Test = dynamic(() => import("../components/write_test"), { ssr: false });

import WagmiProvider from '../components/wagmi_context'
import type { wagmiApiKeyProps } from '../types/api_key_props'

function Write({infura_api_key,alchemy_api_key}:wagmiApiKeyProps){
    
    return (<>
        <WagmiProvider infura_api_key={infura_api_key} alchemy_api_key={alchemy_api_key}>
            <Write_Test></Write_Test>
        </WagmiProvider>
    </>)
    
}

export default Write

export async function getServerSideProps(){ 
    return {
        props:{
            infura_api_key: process.env.infura_api_key,
            alchemy_api_key: process.env.alchemy_api_key
        }
    }
}