import dynamic from "next/dynamic";
const Info_Test = dynamic(() => import("../components/info_test"), { ssr: false });

import WagmiProvider from "../components/wagmi_context";
import type { wagmiApiKeyProps } from "../types/api_key_props";

function Hub({infura_api_key,alchemy_api_key}:wagmiApiKeyProps){
  
  return (
    <>
      <WagmiProvider infura_api_key={infura_api_key} alchemy_api_key={alchemy_api_key}>
        <Info_Test></Info_Test>
      </WagmiProvider>
      
    </>
  )
}
export default Hub

export async function getServerSideProps(){ 
  return {
    props:{
      infura_api_key: process.env.infura_api_key,
      alchemy_api_key: process.env.alchemy_api_key
    }
  }
}