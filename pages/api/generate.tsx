import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";
import { SigningKey } from "ethers/lib/utils";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if (req.method !== "POST")
        return res.status(400).json({ message: "Invalid request method" });

    const {
        body: { name, description, image },
    } = req;

    const sdk = new ThirdwebSDK(
        new ethers.Wallet(
            process.env.WALLET_PRIVATE_KEY as unknown as SigningKey,
            ethers.getDefaultProvider("https://matic-mumbai.chainstacklabs.com")
        )
    );

    const collection = await sdk.getContract(
        "0x4Dc185181394E62e3813107F09028f752cb8A7F2", "nft-collection"
    );

    const signature = await collection.signature.generate({
        metadata: {
            name,
            description,
            image,
        },
        to: ""
    });

    res.json({ message: "Signature generated successfully", signature });
}