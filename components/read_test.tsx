import { useContractRead } from 'wagmi'
import contract_data from '../abi/mintContract.json' 

function Read_Test(){
    const contractRead = useContractRead({
        address: '0xC035477D5F7E6DeAd418365e0E6403Cc8B0277c0',
        abi: contract_data.abi,
        functionName: 'tokenURI',
        args: ['1'],
        chainId:80001
    })
    console.log(contractRead)

    let tokenURI :any = contractRead.isSuccess? contractRead.data : "No tokenId";


    return(<>

        <div>{tokenURI}</div>
    
    </>)
}

export default Read_Test