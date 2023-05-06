import {
  Button,
  Flex,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import Lottie from "lottie-react";
import snake from "../../Data/143202-snake.json";
import NextLink from "next/link";
const index = () => {
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
          >
            <NextLink href="/games/snake" target="_blank" passHref>
              Play Now
            </NextLink>
          </Button>
        </VStack>
      </Flex>
    </VStack>
  );
};

export default index;
