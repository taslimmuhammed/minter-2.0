// components/NFTForm.tsx
import React, { useState } from "react";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Center
} from "@chakra-ui/react";
// import styles from "./s";
import { useAddress, useMetamask, useContract, ConnectWallet, useContractWrite, useStorage } from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk/evm";

import { useRouter } from "next/router";
type FormValues = {
    Name: string;
    description: string;
    avatar: File | undefined;
};
function Mint() {
    const router = useRouter();
    const { contractAddress } = router.query;
    const storage = useStorage();
    const address = useAddress();
    const connectUsingMetamask = useMetamask();
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState<FormValues>({
        Name: "",
        description: "",
        avatar: undefined
    });
    if(contractAddress===undefined) { router.back(); return (<div>Contract undefined</div>);}
    const { contract } = useContract(contractAddress as string );
    const { mutateAsync: mintTo, isLoading } = useContractWrite(contract, "mintTo")




    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault()
            const phototURI = await storage?.upload(formValues.avatar)
            const metaData = {
                "name": formValues.Name,
                "description": formValues.description,
                "image": phototURI
            }
            const uri = await storage?.upload(metaData)
            const data = await mintTo({ args: [address, uri] });
            console.info("contract call successs", data);
        } catch (err) {
            console.error("contract call failure", err);
        }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = event.target;
        if (name === "avatar") {
            setFormValues({
                ...formValues,
                [name]: files && files.length > 0 ? files[0] : undefined
            });
        } else {
            setFormValues({
                ...formValues,
                [name]: value
            });
        }
    };

    return (
        <div className="black">
            <Box marginLeft="auto">
                <ConnectWallet
                    theme="light"
                    auth={{
                        loginOptional: false,
                    }}

                />
            </Box>

            <Center h="100vh">

                {address && <Box as="form" onSubmit={handleSubmit}>
                    <h1>Create NFT Form</h1>
                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input
                            type="text"
                            name="Name"
                            value={formValues.Name}
                            onChange={handleInputChange}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>description</FormLabel>
                        <Input
                            type="text"
                            name="description"
                            value={formValues.description}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Avatar</FormLabel>
                        <Input
                            type="file"
                            name="avatar"
                            accept=".png,.jpg,.jpeg"
                            onChange={handleInputChange}
                        />
                    </FormControl>
                    <Button
                        colorScheme="blue"
                        size="md"
                        fontWeight="bold"
                        borderRadius="md"
                        _hover={{ bg: "blue.700" }}
                        _active={{ bg: "blue.800" }}
                        type="submit"
                        disabled={loading}
                    >
                        {loading?"Minting...":"Submit"}
                    </Button>
                </Box>}
            </Center>
        </div>
    );
}

export default Mint