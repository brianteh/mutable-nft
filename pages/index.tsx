import dynamic from "next/dynamic";
const Login = dynamic(() => import("../components/login"), { ssr: false });

import WagmiProvider from "../components/wagmi_context";
import type { wagmiApiKeyProps } from "../types/api_key_props";

function Index({infura_api_key,alchemy_api_key}:wagmiApiKeyProps){
  
  return (
    <>
      <WagmiProvider infura_api_key={infura_api_key} alchemy_api_key={alchemy_api_key}>
        <Login></Login>
      </WagmiProvider>
      
    
    </>
  )
}
export default Index

export async function getServerSideProps(){ 
  return {
    props:{
      infura_api_key: process.env.infura_api_key,
      alchemy_api_key: process.env.alchemy_api_key
    }
  }
}