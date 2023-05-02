import React, { useEffect, useState } from 'react'
import { DirectListingV3, ThirdwebSDK } from "@thirdweb-dev/sdk/evm";
import { useRouter } from "next/router";
import { Image } from '@chakra-ui/react';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { useAddress, useContract, useContractWrite, useSDK } from '@thirdweb-dev/react';

function BuyNFT() {
    const router = useRouter();
    // const sdk = new ThirdwebSDK("mumbai");
    const sdk = useSDK()
    const address = useAddress()
    const { contract } = useContract("0x84aeE1c23a5Bc8aF770a5cb330DB17b5eB2e048f", 'marketplace-v3');
    const { id } = router.query;
    const [NFT, setNFT] = useState<DirectListingV3 | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const { mutateAsync: buyFromListing} = useContractWrite(contract, "buyFromListing")
    const buyNFT = async () => {
        if (id === undefined) return;
        setIsLoading(true)
        try {
            console.log("intitiating buying");
            let txResult = await contract?.directListings.buyFromListing(
                id as string,
                1
            );
            console.log(txResult);
            
            alert("Buying suuceful")

        } catch (err) {
            console.error("contract call failure", err);
            alert("Buying failed")
        }
        setIsLoading(false)
    }
    const initiator = async () => {
        if (id === undefined) return;
        setIsLoading(true)
        const listing = await contract?.directListings.getListing(id as string);
        if(listing)setNFT(listing)
        console.log(listing);
        
        setIsLoading(false)

    }

    useEffect(() => {
        initiator()
    }, [id,sdk])
    if (isLoading)
        return (
            <div className={"flex h-screen items-center justify-center black"}>
                Loading ...
            </div>
        );
    return (
        <div className='black'>
            <div className="flex justify-center">
                <div className="flex max-w-[500px] flex-col justify-center gap-y-4 p-2">
                    <div className={"text-2xl font-semibold"}>{NFT?.asset.name}</div>
                    <div className={"flex flex-col rounded-lg border border-[#e8ebe5]"}>
                        {/* <div className={`flex items-center justify-start p-3`}>
                            <Image src='https://altcoinsbox.com/wp-content/uploads/2023/03/polygon-logo.png' height={10} width={10} />
                        </div> */}
                        <img className="rounded-2xl" src={NFT?.asset.image as string} width={500} height={500} />
                    </div>
                    <div className={"flex space-x-1 text-sm"}>
                        <div className={"text-gray-500"}>Owned by</div>
                        <div className="cursor-pointer text-blue-500">
                            {NFT?.creatorAddress}
                        </div>
                    </div>

                    {/*Bottom Section*/}
                    <div className={"flex flex-col rounded-lg border border-[#e8ebe5]"}>
                        <div className={"border-b border-[#e8ebe5] p-3"}>
                            <div
                                className={
                                    "flex items-center space-x-2 text-sm text-gray-200 md:text-base"
                                }
                            >
                                <AiOutlineClockCircle size={24} />
                                <p className='text'>Sale ends November 26, 2022 at 7:39pm GMT+11</p>
                            </div>
                        </div>
                        <div className={"flex flex-col gap-y-2  p-3"}>
                            <div className={"text-sm "}>Current Price</div>
                            <div className={`flex items-center space-x-3`}>
                                <img src='https://altcoinsbox.com/wp-content/uploads/2023/03/polygon-logo.png' height={24} width={24} />
                                <p className={`text-3xl font-semibold`}>
                                    {NFT?.pricePerToken}
                                </p>
                            </div>
                            <button
                                type="button"
                                className="rounded-lg bg-blue-700 px-5 py-4 text-base font-bold text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={buyNFT}
                            >
                                Purchase
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default BuyNFT