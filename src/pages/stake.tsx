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
} from "@chakra-ui/react";
import React from "react";
import {
  AXIA_TOKEN_ADDRESS,
  AXIA_CONTRACT_ABI,
  STAKE_REWARDS_AXIA_ABI_TOKENS,
  STAKE_REWARDS_AXIA_TOKENS,
  STAKING_CONTRACT,
  STAKING_CONTRACT_ABI,
} from "@/const/contracts";

export const Stake = () => {
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
                <Input type="number" dir="rtl" rounded="lg" />
                <chakra.div w="full" textAlign="end">
                  Balance: 450.00
                </chakra.div>
              </chakra.div>
              <Button w="full" color="black">
                Lock
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
                  560 Tokens
                </chakra.span>
              </VStack>
              <Divider />
              <VStack gap="3">
                <Heading fontSize="lg">Reward Tokens</Heading>
                <chakra.span fontSize="md">
                  You Have Received A Total Of :
                </chakra.span>
                <chakra.span fontSize="md" fontWeight="700">
                  15 Reward Tokens
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
