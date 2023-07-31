import {
  Box,
  Container,
  Flex,
  Link,
  SimpleGrid,
  Text,
  Button,
  HStack,
  VStack,
} from "@chakra-ui/react";
import React from "react";

const Footer = () => {
  return (
    <Box bg="gray.800" color="white" pt={8}>
      <HStack w="full" px="10%" gap="5">
        <Flex direction="column" justify="space-between" mb={4} gap="3" w="60%">
          <Box>
            <Text fontSize="lg">Axia Ecosystem</Text>
            <Text fontSize="sm" mt={1}>
              This is a revolutionary decentralized application (dApp) that aims
              to bridge the gap between creators, artists, developers, and their
              audience. By incentivizing engagement through quizzes, games, and
              content creation.
            </Text>
          </Box>
          <Button bg="#ffd17c" size="sm">
            <Link href="/">Get Started</Link>
          </Button>
        </Flex>
        {/* Row 2 */}
        <SimpleGrid columns={1} spacing={4} w="20%">
          <VStack>
            <Text>Links</Text>
            <Link href="/">Home</Link>
            <Link href="/articles">Articles</Link>
            <Link href="/games">Games</Link>
          </VStack>
        </SimpleGrid>
        {/* Row 3 */}
        <SimpleGrid columns={1} spacing={4} w="20%">
          <VStack>
            <Text>Follow Us</Text>
            <Link href="#">Twitter</Link>
          </VStack>
        </SimpleGrid>
      </HStack>
      <Flex w="full" pb="2" pt="10" justifyContent="center">
        <Text color="gray.200" fontWeight="thin">
          &copy; Copyright 2023 Adebayo Olamilekan
        </Text>
      </Flex>
    </Box>
  );
};

export default Footer;
