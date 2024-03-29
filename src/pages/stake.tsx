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
  Table,
  Tbody,
  Td,
  Tr,
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
  const [loadingClaim, setLoadingClaim] = useState(false);
  const [stakedBal, setStakedBal] = useState(0);
  const [walletBal, setWalletBal] = useState(0);
  const [rewardBal, setRewardBal] = useState(0);
  const [claimableBal, setClaimabaleBal] = useState("0");
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

  const getClaimableBal = async () => {
    const amount = await stakingContract?.earned(address?.toString());
    const realVal = (Number(amount) / 1e18).toFixed(18);
    console.log(realVal);
    setClaimabaleBal(realVal);
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
      const axiaAmount = ethers.utils.parseEther(lockAmount);
      let tx = await ogContract.approve(STAKING_CONTRACT, axiaAmount);
      await tx.wait();
      tx = await stakingContract?.stake(axiaAmount);
      await tx.wait();
      toast({
        title: "You have successfully staked your tokens",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      getWalletBal();
      getStakedBal();
      getRewardBal();
      getClaimableBal();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const claimTokens = async () => {
    try {
      setLoadingClaim(true);
      let tx = await stakingContract?.claimReward();
      await tx.wait();
      toast({
        title: "You have successfully claimed your tokens",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      getWalletBal();
      getStakedBal();
      getRewardBal();
      getClaimableBal();
      setLoadingClaim(false);
    } catch (error) {
      setLoadingClaim(false);
      console.log(error);
    }
  };

  // const withdrawTokens = async () => {
  //   try {
  //     setLoadingWithdraw(true);
  //     let tx = await stakingContract?.withdraw();
  //     await tx.wait();
  //     toast({
  //       title: "You have successfully claimed your tokens",
  //       status: "success",
  //       duration: 4000,
  //       isClosable: true,
  //     });
  //     getWalletBal();
  //     getStakedBal();
  //     getRewardBal();
  //     getClaimableBal();
  //     setLoadingWithdraw(false);
  //   } catch (error) {
  //     setLoadingWithdraw(false);
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    getWalletBal();
    getStakedBal();
    getRewardBal();
    getClaimableBal();
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
          is 7 days.{" "}
          <chakra.span color="red">Scroll down to learn more.</chakra.span>
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
                  rounded="lg"
                  value={lockAmount}
                  disabled={!address}
                  onChange={(e) => setLockAmount(e.target.value)}
                />
                <chakra.div w="full" textAlign="end">
                  Balance: {walletBal}
                </chakra.div>
              </chakra.div>
              <Button w="full" color="black" onClick={stakeTokens}>
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
                <chakra.span fontSize="md">Claimable Tokens :</chakra.span>
                <chakra.span fontSize="md" fontWeight="700">
                  {claimableBal} Reward Tokens
                </chakra.span>
                <Button w="full" color="black" onClick={claimTokens}>
                  {loadingClaim ? <Spinner /> : <Text>Claim Rewards</Text>}
                </Button>

                {/* <Button w="full" color="black" onClick={claimTokens}>
                  {loadingClaim ? (
                    <Spinner />
                  ) : (
                    <Text>Withdraw Stake Balance</Text>
                  )}
                </Button> */}
              </VStack>
            </Flex>
          </CardBody>
        </Card>
      </HStack>

      <Card w="80%" bg="#897537" mt="20" color="white">
        <CardHeader>
          <Heading fontSize="lg" textAlign="center">
            STAKE INFORMATICS
          </Heading>
        </CardHeader>
        <CardBody
          overflowX="scroll"
          sx={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <Table variant="striped" colorScheme="gray">
            <Tbody>
              <Tr color="black">
                <Td>Amount to stake</Td>
                <Td>Quizes</Td>
                <Td>Games</Td>
                <Td>Both</Td>
              </Tr>
              <Tr textAlign="center" w="full">
                <Td>200</Td>
                <Td>&#10003;</Td>
                <Td>&#10005;</Td>
                <Td>&#10005;</Td>
              </Tr>
              <Tr textAlign="center" w="full" color="black">
                <Td>500</Td>
                <Td>&#10003;</Td>
                <Td>&#10003;</Td>
                <Td>&#10003;</Td>
              </Tr>
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default Stake;
