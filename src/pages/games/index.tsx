import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import snake from "../../Data/143202-snake.json";
import axios from "axios";
import { useAddress } from "@thirdweb-dev/react";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  const address = useAddress();
  const toast = useToast();
  const [userData, setUserData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/user/${address}`);
        const data = await response.data;

        setUserData(data.userId !== "" ? true : false);
      } catch (error: any) {
        setUserData(false);
        if (error.response && error.response.status === 404) {
          console.log("User not found");
        }
      }
    };
    fetchData();
  }, [address]);

  const linkToGames = () => {
    if (userData) {
      router.push("/games/snake");
    } else {
      toast({
        title: "You need to register before playing a game",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack spacing="8" w="full" px={{ base: "0", md: "5", lg: "8" }} py="10">
      <Flex
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
        w="full"
        gap="3"
        direction={{ base: "column", lg: "row" }}
      >
        <VStack
          bg="#e6d3a6"
          w="40%"
          height="500px"
          textAlign="center"
          overflow="hidden"
          rounded="2xl"
          py="4"
        >
          <Text w="full" fontSize={32} fontWeight="500">
            Snake Xenzia
          </Text>
          <Lottie
            loop={true}
            animationData={snake}
            style={{
              height: 360,
            }}
          />
          <Button
            px="4"
            py="2"
            bg="#6d3d0c"
            color="white"
            _hover={{ bg: "#f9bb7b" }}
            onClick={linkToGames}
          >
            Play Now
          </Button>
        </VStack>
        <Card w="80%" bg="#897537" mt="20" color="white">
          <CardHeader>
            <Heading fontSize="lg" textAlign="center">
              GAME INFORMATICS
            </Heading>
          </CardHeader>
          <CardBody>
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
    </VStack>
  );
};

export default Index;
