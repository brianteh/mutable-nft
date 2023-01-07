import dynamic from "next/dynamic";
const Test = dynamic(() => import("../components/test"), { ssr: false });

import WagmiProvider from "../components/wagmi_context"

function Hub(){
   return (
    <>
    <WagmiProvider>
      <Test></Test>
    </WagmiProvider>
    </>
   )
}
export default Hub