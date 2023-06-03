import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  VStack,
  chakra,
  Text,
  Button,
  Flex,
  Image,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  AXIA_TOKEN_ADDRESS,
  AXIA_CONTRACT_ABI,
  STAKE_REWARDS_AXIA_ABI_TOKENS,
  STAKE_REWARDS_AXIA_TOKENS,
  STAKING_CONTRACT,
  STAKING_CONTRACT_ABI,
} from "@/const/contracts";

import {
  useAddress,
  useChainId,
  useNetwork,
  ChainId,
  useSigner,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

const Mint = () => {
  const signer = useSigner();
  const address = useAddress();
  const toast = useToast();
  const chainId = useChainId();
  const contract = new ethers.Contract(
    AXIA_TOKEN_ADDRESS,
    AXIA_CONTRACT_ABI,
    signer
  );
  const [loading, setLoading] = useState(false);

  const [, switchNetwork] = useNetwork();

  const getAxiaTokens = async () => {
    setLoading(true);
    if (!address) {
      toast({
        title: "Wallet Not Connected.",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }
    if (address && chainId !== 80001) {
      switchNetwork?.(ChainId.Mumbai);
    }
    // const amount = await contract?.balanceOf(address?.toString());
    // const realVal = Number(ethers.utils.formatEther(amount));
    // if (realVal >= 0) {
    //   toast({
    //     title: "You have minted before.",
    //     status: "warning",
    //     duration: 4000,
    //     isClosable: true,
    //   });
    // }
    const axiaAmount = ethers.utils.parseEther("200");
    const collectMumbai = await contract?.mint(address?.toString(), axiaAmount);
    await collectMumbai.wait();
    toast({
      title: "200 Axia Tokens is on its way",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    setLoading(false);
  };

  return (
    <Flex
      w="full"
      alignItems="center"
      justifyContent="center"
      direction="column"
      gap="5"
      mt="14"
      pb="44"
      textAlign="center"
    >
      <Card w="40%" bg="#e6d3a6" color="white">
        <CardHeader>
          <Heading fontSize="lg">MINT TEST AXIA TOKENS</Heading>
        </CardHeader>
        <CardBody>
          <VStack gap="4" w="full">
            <Image src="/axiaLogo.svg" alt="logo" w="40%" />
            <chakra.div w="full">Mint 200 Axia Tokens</chakra.div>
            <Button w="full" color="black" onClick={getAxiaTokens}>
              {loading ? <Spinner /> : <Text> Mint </Text>}
            </Button>
          </VStack>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default Mint;
