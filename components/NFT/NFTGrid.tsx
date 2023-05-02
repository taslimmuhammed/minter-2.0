import type { DirectListingV3, NFT as NFTType } from "@thirdweb-dev/sdk";
import Link from "next/link";
import React,{useEffect} from "react";
import { NFT_COLLECTION_ADDRESS } from "../../const/contractAddresses";
import Skeleton from "../Skeleton/Skeleton";
import NFT from "./NFT";
import styles from "../../styles/Buy.module.css";

type Props = {
  isLoading: boolean;
  data: DirectListingV3[]|undefined;
  overrideOnclickBehavior?: (nft: NFTType) => void;
  emptyText?: string;
};

export default function NFTGrid({
  isLoading,
  data,
  overrideOnclickBehavior,
  emptyText = "No NFTs found for this collection.",
}: Props) {
  
  return (
    <div className={styles.nftGridContainer}>
      {isLoading ? (
        [...Array(20)].map((_, index) => (
          <div key={index} className={styles.nftContainer}>
            <Skeleton key={index} width={"100%"} height="312px" />
          </div>
        ))
      ) : data && data.length > 0 ? (
        data.map((nft) =>
          !overrideOnclickBehavior ? (
            <Link
              href={`/buy/${nft.id}`}
              key={nft.assetContractAddress}
              className={styles.nftContainer}
            >
              <NFT  nft={nft}/>
            </Link>
          ) : (
            <div
              key={nft.assetContractAddress}
              className={styles.nftContainer}
              onClick={() => {console.log(nft);
              }}
            >
              <NFT nft={nft} />
            </div>
          )
        )
      ) : (
        <p>{emptyText}</p>
      )}
    </div>
  );
}


// assetContract
// :
// "0x35F3a8004101B84c4ad6E23d60C7F5562518D299"
// currency
// :
// "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
// endTimestamp
// : 
// BigNumber { _hex: '0xf4865710', _isBigNumber: true }
// listingCreator
// :
// "0xd0cc32348E98f148E769f034A9C79b1C5a0e2A78"
// listingId
// : 
// BigNumber { _hex: '0x00', _isBigNumber: true }
// pricePerToken
// : 
// BigNumber { _hex: '0x038d7ea4c68000', _isBigNumber: true }
// quantity
// : 
// BigNumber { _hex: '0x01', _isBigNumber: true }
// reserved
// :
// false
// startTimestamp
// : 
// BigNumber { _hex: '0x644f8f5e', _isBigNumber: true }
// status
// :
// 1
// tokenId
// : 
// BigNumber { _hex: '0x02', _isBigNumber: true }
// tokenType
// :
0