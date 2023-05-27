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
      <Container maxW="container.lg" flexDirection="row" display="flex">
        <Flex direction="column" justify="space-between" mb={4} w="full">
          <Box>
            <Text fontSize="lg">Axia Ecosystem</Text>
            <Text fontSize="sm" mt={1}></Text>
          </Box>
          <Button colorScheme="blue" size="sm">
            Get Started
          </Button>
        </Flex>
        {/* Row 2 */}
        <SimpleGrid columns={1} spacing={4} w="full">
          <VStack>
            <Text>Links</Text>
            <Link href="#">Home</Link>
            <Link href="#">About</Link>
            <Link href="#">Services</Link>
          </VStack>
        </SimpleGrid>
        {/* Row 3 */}
        <SimpleGrid columns={1} spacing={4} w="full">
          <VStack>
            <Text>Follow Us</Text>
            <Link href="#">Twitter</Link>
          </VStack>
        </SimpleGrid>
      </Container>
      <Flex w="full" pb="2" pt="10" justifyContent="center">
        <Text color="gray.200" fontWeight="thin">
          &copy; Copyright 2023 Adebayo Olamilekan
        </Text>
      </Flex>
    </Box>
  );
};

export default Footer;
