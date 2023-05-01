// components/NFTForm.tsx
import React, { useState } from "react";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    VStack,
    HStack,
    Grid,
    GridItem,
    Heading,
    Center
} from "@chakra-ui/react";
// import styles from "./s";
import axios from "axios";
import { useAddress, useMetamask, useContract, ConnectWallet, useContractWrite, useStorage, useSDK } from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk/evm";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
type FormValues = {
    Name: string;
    description: string;
};

const Deploy: React.FC = () => {
    const storage = useStorage();
    const sdk = useSDK();
    const address = useAddress();
    const router = useRouter()
    const connectUsingMetamask = useMetamask();
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState<FormValues>({
        Name: "",
        description: "",
    });
    
    async function deployContract(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        if (!address || !sdk) {
            return;
        }

        const contractAddress = await sdk.deployer.deployBuiltInContract(
            // @ts-ignore - we're excluding custom contracts from the demo
            "nft-collection",
            {
                name: formValues.Name,
                primary_sale_recipient: address,
                voting_token_address: address,
                description: formValues.description,
                // Recipients are required when trying to deploy a split contract
                recipients: [
                    {
                        address,
                        sharesBps: 100 * 100,
                    },
                ],
            }
        );

        // This is the contract address of the contract you just deployed
        console.log(contractAddress);

        alert(`Succesfully deployed nft-collection at ${contractAddress}`);
        setLoading(false)
        router.push(`/`);
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

            setFormValues({
                ...formValues,
                [name]: value
            });
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
            
        <Center>
            
            { address && <Box as="form" onSubmit={deployContract}>
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
                        {loading ? "Minting..." : "Submit"}
                </Button>
            </Box>}
        </Center>
        </div>
    );
};

export default Deploy;