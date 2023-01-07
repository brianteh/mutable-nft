
import { Connector, useAccount, useBalance, useConnect, useDisconnect } from "wagmi";

function Login(){
    const {connectAsync, connectors} = useConnect()
    const { address, connector, isConnected } = useAccount()
    const {disconnect} = useDisconnect()
    const {data, isError, isLoading} = useBalance({address:address})

    //console.log(connectors)

    const handleWalletConnect = async (connector: any)=>{
        const {account, chain} = await connectAsync({connector})
        //console.log(account,chain)
        if(chain.unsupported){
            alert("Connect with Polygon Mumbai")
            disconnect()
        }
    }

    const handleWalletDisconnect = () =>{
        disconnect();
        //console.log("disconnect")
    }

    return (
        <>
        {
            !isConnected && connectors.map((connector: any)=>{
                const {id,name} = connector
                return <button onClick={()=>{handleWalletConnect(connector)}} key={id}>{name}</button>
            })
        }
        {
            isConnected && <button onClick={handleWalletDisconnect}>Disconnect</button>
        }
        {   
            !isConnected && <h1>Wallet Not Connected</h1>
        }
        {
            isConnected && 
            <div>
                <h1>Account Info:</h1>
                <p>Wallet address: {address}</p>
                <p>Balance: {data?.formatted} MATIC</p>
            </div>
        }
        </>
    )
}

export default Login