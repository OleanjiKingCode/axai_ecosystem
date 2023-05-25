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

      <VStack w="full" px={{ base: "10", md: "20" }} gap="10">
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
            <Text lineHeight="40px" fontSize={{ base: "15px", md: "20px" }}>
              From classic, fictional stories to simple DIY tricks, we help
              content writers through the use of web3 technologies to showcase
              thier work to an engaging audience movtivated by incentive quizes.
            </Text>
          </chakra.div>
        </Flex>
      </VStack>

      <VStack
        w="full"
        px={{ base: "10", md: "20" }}
        gap="10"
        py={{ base: "10", md: "32" }}
      >
        <Flex
          w="full"
          gap={{ lg: "10" }}
          alignItems="center"
          direction={{ base: "column", lg: "row" }}
        >
          <chakra.div
            w="full"
            textAlign={{ base: "center", lg: "start" }}
            mt={{ lg: "-50" }}
          >
            <Heading w="full" py="5" color="#fff3cc">
              Game Devs
            </Heading>
            <Text lineHeight="40px" fontSize={{ base: "15px", md: "20px" }}>
              A small time game dev? struggle no more looking for users, as we
              provide a platfrom that entises users to engage / play your games
              by bringing your little world into Axia verse.
            </Text>
          </chakra.div>
          <Image
            src="./gamers.svg"
            alt="artist"
            w={{ base: "60%", md: "40%" }}
          />
        </Flex>
      </VStack>

      <VStack w="full" px={{ base: "10", md: "20" }} gap="10">
        <Flex
          w="full"
          gap={{ lg: "10" }}
          alignItems="center"
          direction={{ base: "column", lg: "row" }}
        >
          <Image
            src="./music.svg"
            alt="artist"
            w={{ base: "60%", md: "40%" }}
          />
          <chakra.div
            w="full"
            textAlign={{ base: "center", lg: "end" }}
            mt={{ lg: "-50" }}
          >
            <Heading w="full" py="5" color="#fff3cc">
              Artists
            </Heading>
            <Text lineHeight="40px" fontSize={{ base: "15px", md: "20px" }}>
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
