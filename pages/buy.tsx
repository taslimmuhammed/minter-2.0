import { RequiredParam, useActiveListings, useContract, useContractRead, useValidDirectListings } from "@thirdweb-dev/react";
import React , {useState, useEffect}from "react";
import Container from "../components/Container/Container";
import NFTGrid from "../components/NFT/NFTGrid";
import { MARKETPLACE_ADDRESS } from "../const/contractAddresses";
import { Marketplace, ThirdwebSDK } from "@thirdweb-dev/sdk/evm";


export default function Buy(){
    const {contract}  = useContract(
        MARKETPLACE_ADDRESS,
        'marketplace-v3'
    )
    const { data: nfts, isLoading } = useValidDirectListings(contract )
    useEffect(() => {
      console.log(nfts);
      
    }, [nfts])
    
    return (
        <div className="black -mt-32">
        {<Container maxWidth="lg">
                 <h1 className="text-3xl font-bold underline text-white">Buy NFTs</h1>
             <p className="text-white">Browse which NFTs are available from the collection.</p>
             <NFTGrid
                 data={nfts}
                 isLoading={isLoading}
                 emptyText={
                     "Looks like there are no NFTs in this collection."
                 }
             />
         </Container> }
         </div>
    )
}
// export default function Buy() {
//     // Load all of the NFTs from the NFT Collection
//     const { contract } = useContract(MARKETPLACE_ADDRESS);
//     const [data, setData] = useState([])
//     const [loading, setLoading] = useState(true)
//     const sdk = new ThirdwebSDK("mumbai");
//     useEffect(() => {
//         initiator()
//     }, [])
//     const initiator=async()=>{
//         setLoading(true)
//         try{
//             const listings = await contract?.directListings.getAll();
//             if(listings===undefined) return;
//             for (let i = 0; i < listings.length; i++) {
//                 const NFT = listings[i]
//                 const NFTContract = await sdk.getContract(NFT.assetContractAddress);
//                 const uri = await NFTContract.call("tokenURI", [NFT.id])
//                 console.log(uri);
                
//                // const metaData = await 
//             }
            
//         }catch(e){
//          console.log(e);
//         }
//         setLoading(false)
//     }
    
//     return (
//         <div className="black -mt-32">
//         {/* <Container maxWidth="lg">
//                 <h1 className="text-3xl font-bold underline text-white">Buy NFTs</h1>
//             <p className="text-white">Browse which NFTs are available from the collection.</p>
//             <NFTGrid
//                 data={data}
//                 isLoading={loading}
//                 emptyText={
//                     "Looks like there are no NFTs in this collection."
//                 }
//             />
//         </Container> */}
//         </div>
//     );
// }
