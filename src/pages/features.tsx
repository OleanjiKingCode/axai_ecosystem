import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Card,
  CardHeader,
  CardBody,
  Input,
  Heading,
  Select,
  chakra,
  Text,
  Image,
  VStack,
} from "@chakra-ui/react";
import React from "react";

export const Services = () => {
  return (
    <Flex
      w="full"
      alignItems="center"
      justifyContent="center"
      direction="column"
      gap="5"
      py="10"
    >
      <Heading py="10" color="#ffd17cff">
        Our Services
      </Heading>

      <VStack w="full" px="20" gap="10">
        <Flex
          w="full"
          gap={{ lg: "10" }}
          alignItems="center"
          direction={{ base: "column", lg: "row" }}
        >
          <Image
            src="./artist.svg"
            alt="artist"
            w={{ base: "60%", md: "40%" }}
          />
          <chakra.div
            w="full"
            textAlign={{ base: "center", lg: "end" }}
            mt={{ lg: "-50" }}
          >
            <Heading w="full" py={{ md: "5" }} color="#fff3cc">
              Content Writers
            </Heading>
            <Text
              lineHeight="40px"
              fontSize="20px"
              display={{ base: "none", md: "block" }}
            >
              We help content writers throught the use of web3 technologies to
              showcase thier work (from classic fictional stories to simple DIY
              tricks) to an engaging audience movtivated by incentive quizes.
            </Text>
          </chakra.div>
        </Flex>
      </VStack>

      <VStack w="full" px="20" gap="10" py="32">
        <Flex w="full" gap="10" alignItems="center">
          <chakra.div w="full" textAlign="start" mt="-50">
            <Heading w="full" py="5" color="#fff3cc">
              Game Devs
            </Heading>
            <Text lineHeight="40px" fontSize="20px">
              A small time game dev? struggle no more looking for users, as we
              provide a platfrom that entises users to engage / play your games
              by bringing your little world into Axia verse.
            </Text>
          </chakra.div>
          <Image src="./gamers.svg" alt="artist" w="40%" />
        </Flex>
      </VStack>

      <VStack w="full" px="20" gap="10">
        <Flex w="full" gap="10" alignItems="center">
          <Image src="./music.svg" alt="artist" w="40%" />
          <chakra.div w="full" textAlign="end" mt="-50">
            <Heading w="full" py="5" color="#fff3cc">
              Artists
            </Heading>
            <Text lineHeight="40px" fontSize="20px">
              We&apos;ve got you covered, music, art, animations, etc. Bring
              your little idea into our ecosystem and be amazed by the results.
            </Text>
          </chakra.div>
        </Flex>
      </VStack>
    </Flex>
  );
};

export default Services;
