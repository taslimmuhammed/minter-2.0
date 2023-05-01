import { useEffect, useState } from "react";
import { ConnectWallet, useAddress, useSDK } from "@thirdweb-dev/react";
import { ContractType } from "@thirdweb-dev/sdk";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import styles from "../styles/Create.module.css";
import Link from "next/link";
import { Center, Heading } from "@chakra-ui/react";

type Collection = {
  name:string;
  address:string;
}
function Collections() {
  const router = useRouter();
  const address = useAddress();
  const sdk = useSDK();

  const [loading, setLoading] = useState(true);
  const [Contracts, setContracts] = useState<Collection[]>([])

  const intiator = async () => {
    if (!address || !sdk) {
      return;
    }
    setLoading(true)
    try {
      const contracts = await sdk.getContractList(address)
      console.log(contracts);
      let temp :Collection[] = []
      for(let i=0;i<contracts.length;i++){
        const contract = contracts[i]
        const contractType = await contract.contractType()
        if (contractType === "nft-collection") {
          const contractName = (await contract.metadata()).name
          const data: Collection = {
            name: contractName,
            address: contract.address
          }
          temp.push(data)
          
        }
      }
      setContracts(temp)
    } catch (e) {
      alert(e)
    }
    setLoading(false)
  }
   useEffect(() => {
     intiator()
   }, [address,sdk])
   
  
  return (
    <div className="black">
      <ConnectWallet />
   
        <Link className={styles.mainButton} href="/deploy">
          Create a collection
        </Link>
      <div className={styles.contractBoxGrid}>
        {loading && <Heading size={"1xl"}>Loading</Heading>}
        {
          Contracts.map((contract, index)=>(
            <div
              className={styles.contractBox}
              key={index}
              onClick={() => router.push(`/mint/${contract.address}`)}
            >
              <div className={styles.contractImage}>
                <img
                  // @ts-ignore
                  src="https://ipfs.thirdwebcdn.com/ipfs/QmWARxASHf4UcWkwxTUDJxAXVDUG5STu5yBePJg35GzqjZ/nft-collection.png"
                  alt="NFT image"
                  className={styles.dropImg}
                />
              </div>
              <b className={styles.cardName}>
                {/* @ts-ignore */}
                {contract.name}
              </b>
              <p className={styles.cardDescription}>
                {contract.address.slice(0, 6) + "..." + contract.address.slice(-4)}
              </p>
              </div>
          ))
        }
      </div>
    </div>
  )
}

export default Collections