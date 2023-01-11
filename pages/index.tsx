import dynamic from "next/dynamic";
const Login = dynamic(() => import("../components/login"), { ssr: false });

import WagmiProvider  from "../components/wagmi_context"

function App(){
   return (
    <>
    <WagmiProvider>
      <Login></Login>
    </WagmiProvider>
    </>
   )
}
export default App