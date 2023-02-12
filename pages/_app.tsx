import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import WagmiProvider  from "../components/wagmi_context"


export default function App({ Component, pageProps}: AppProps) {

    return (<>

            <Component {...pageProps} />
  
    </>)

}

