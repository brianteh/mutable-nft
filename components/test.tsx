
import { Connector, useAccount, useBalance, useConnect, useDisconnect } from "wagmi";

function Test(){
    const { address, connector, isConnected } = useAccount()
    const {data, isError, isLoading} = useBalance({address:address})
    return (
    <div>
        {
            !isConnected && <h1>Wallet Not Connected</h1>
        }
        {
            isConnected && 
            <div>
                <h1>Account Info:</h1>
                <p>Address: {address}</p>
                <p>Balance: {data?.formatted} MATIC</p>
            </div>
        }
    </div>)
}

export default Test