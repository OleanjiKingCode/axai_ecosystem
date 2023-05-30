import { Button, Flex, Text, VStack, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import snake from "../../Data/143202-snake.json";
import NextLink from "next/link";
import axios from "axios";
import { useAddress } from "@thirdweb-dev/react";
import { useRouter } from "next/router";

const Index = () => {
  const [inputValue, setValue] = useState("");
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
        title: "You need to register before taking a quiz",
        status: "warning",
        duration: 2000,
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
      </Flex>
    </VStack>
  );
};

export default Index;
