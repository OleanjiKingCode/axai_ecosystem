import {
  Flex,
  Card,
  CardHeader,
  CardBody,
  Input,
  Heading,
  HStack,
  Button,
  chakra,
  VStack,
  Divider,
  Text,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  AXIA_TOKEN_ADDRESS,
  AXIA_CONTRACT_ABI,
  STAKE_REWARDS_AXIA_ABI_TOKENS,
  STAKE_REWARDS_AXIA_TOKENS,
  STAKING_CONTRACT,
  STAKING_CONTRACT_ABI,
} from "@/const/contracts";
import { useAddress, useChainId, useSigner } from "@thirdweb-dev/react";
import { ethers } from "ethers";

export const Stake = () => {
  const signer = useSigner();

  const address = useAddress();

  const toast = useToast();

  const chainId = useChainId();
  const [loading, setLoading] = useState(false);
  const [stakedBal, setStakedBal] = useState(0);
  const [walletBal, setWalletBal] = useState(0);
  const [rewardBal, setRewardBal] = useState(0);
  const [lockAmount, setLockAmount] = useState("0");
  const ogContract = new ethers.Contract(
    AXIA_TOKEN_ADDRESS,
    AXIA_CONTRACT_ABI,
    signer
  );

  const stakingContract = new ethers.Contract(
    STAKING_CONTRACT,
    STAKING_CONTRACT_ABI,
    signer
  );

  const rewardContract = new ethers.Contract(
    STAKE_REWARDS_AXIA_TOKENS,
    STAKE_REWARDS_AXIA_ABI_TOKENS,
    signer
  );
  const getWalletBal = async () => {
    const amount = await ogContract?.balanceOf(address?.toString());
    const realVal = Number(ethers.utils.formatEther(amount));
    setWalletBal(realVal);
  };

  const getStakedBal = async () => {
    const amount = await stakingContract?.s_balances(address?.toString());
    const realVal = Number(ethers.utils.formatEther(amount));
    setStakedBal(realVal);
  };

  const getRewardBal = async () => {
    const amount = await rewardContract?.balanceOf(address?.toString());
    const realVal = Number(ethers.utils.formatEther(amount));
    setRewardBal(realVal);
  };

  const stakeTokens = async () => {
    try {
      if (Number(lockAmount) <= 0) {
        toast({
          title: "You cant stake less than 1 token",
          status: "warning",
          duration: 4000,
          isClosable: true,
        });
      }
      setLoading(true);
      const tx = await stakingContract?.stake(lockAmount);
      tx.wait();

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWalletBal();
    getStakedBal();
    getRewardBal();
  }, [address]);

  return (
    <Flex
      w="full"
      alignItems="center"
      justifyContent="center"
      direction="column"
      gap="5"
      mt="14"
      pb="44"
    >
      <VStack w="full" textAlign="center">
        <Heading py="2" fontSize="2xl">
          Stake Tokens 🪙
        </Heading>
        <Text w="55%">
          Get access to all of Axia services by staking a fraction of your
          balance. Staking is more like a subscription in axia and the minimum
          is 7 days. Learn More.
        </Text>
      </VStack>
      <HStack
        w="full"
        gap="28"
        textAlign="center"
        alignItems="center"
        justifyContent="center"
      >
        <Card w="40%" bg="#897537" color="white">
          <CardHeader>
            <Heading fontSize="lg">LOCK TOKENS</Heading>
          </CardHeader>
          <CardBody>
            <VStack gap="4">
              <chakra.div w="full" textAlign="start">
                Enter how many tokens you would like to stake
              </chakra.div>
              <chakra.div w="full">
                <Input
                  type="number"
                  // dir="rtl"
                  rounded="lg"
                  value={lockAmount}
                  // max={walletBal}
                  onChange={(e) => setLockAmount(e.target.value)}
                />
                <chakra.div w="full" textAlign="end">
                  Balance: {walletBal}
                </chakra.div>
              </chakra.div>
              <Button w="full" color="black">
                {loading ? <Spinner /> : <Text>Lock</Text>}
              </Button>
            </VStack>
          </CardBody>
        </Card>
        <Card w="35%" bg="#897537" color="white">
          <CardHeader>
            <Heading fontSize="xl">DETAILS</Heading>
          </CardHeader>
          <CardBody>
            <Flex direction="column" gap="3">
              <VStack gap="3">
                <Heading fontSize="lg">Staked Tokens</Heading>
                <chakra.span fontSize="md">
                  You Have Staked A Total Of :
                </chakra.span>
                <chakra.span fontSize="md" fontWeight="700">
                  {stakedBal} Tokens
                </chakra.span>
              </VStack>
              <Divider />
              <VStack gap="3">
                <Heading fontSize="lg">Reward Tokens</Heading>
                <chakra.span fontSize="md">
                  You Have Received A Total Of :
                </chakra.span>
                <chakra.span fontSize="md" fontWeight="700">
                  {rewardBal} Reward Tokens
                </chakra.span>
                <Button w="full" color="black">
                  Claim Rewards
                </Button>
              </VStack>
            </Flex>
          </CardBody>
        </Card>
      </HStack>
    </Flex>
  );
};

export default Stake;
