import { prepareWriteContract, writeContract } from '@wagmi/core';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { useBalance, useAccount, useWatchPendingTransactions } from 'wagmi';
import contract_data from '../abi/mintContract_2.json' 

function Write_Test(){
    const { address, connector, isConnected } = useAccount()
    const {data, isError, isLoading} = useBalance({address:address})
    
    async function mint() {
            
        const tokenURI = 'https://gateway.pinata.cloud/ipfs/Qmazfy3w35vpdPC7ZvrLEyRRPmHgkQqGp5DX2p2F4fqAib';

        const config = await prepareWriteContract({
            address: '0xf16325ecd6d8e5f2ffb652eb621e80e1e0ee3e73',
            abi: contract_data.abi,
            functionName: 'mintNFT',
            args:[tokenURI],
            chainId:80001
        }).then(async (config)=>{
            const {hash} = await writeContract(config)
        }).catch((success)=>{
            if(!success) console.log("mint action rejected")
        }) 
            
    }

    async function tip(){
        
        const config = await prepareWriteContract({
            address: '0xf16325ecd6d8e5f2ffb652eb621e80e1e0ee3e73',
            abi: contract_data.abi,
            functionName: 'tip',
            overrides: {
              from: address,
              value: ethers.utils.parseEther('0.01'),
            },
            chainId:80001
        }).then(async(config)=>{
            const {hash} = await writeContract(config)
        }).catch((success)=>{
            if(!success) console.log('tip action rejected')
        })

    }

    return(<>

        <br />
        <button onClick={mint}> MINT NFT </button>
        <br />
        <button onClick={tip}> TIP </button>
    
    </>)
}

export default Write_Test