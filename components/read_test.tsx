import { ethers } from 'ethers';
import { useEffect, useState } from 'react'
import { useContractRead } from 'wagmi' // use @wagmi/core instead
import contract_data from '../abi/mintContract_2.json' 


function Read_Test(){

    
    
    const read_get_balance: any = useContractRead({
        address: '0xf16325ecd6d8e5f2ffb652eb621e80e1e0ee3e73',
        abi: contract_data.abi,
        functionName: 'getBalance',
        args:[],
        chainId: 80001
    })
    let balance = read_get_balance.isSuccess? parseInt(read_get_balance.data._hex): null;
    

    return(<>

        <div>Balance in smart contract: {balance} wei</div>
        <p></p>
    
    </>)
}

export default Read_Test

