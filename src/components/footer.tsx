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
        {/* Row 1 */}
        <Flex
          direction="column"
          align="center"
          justify="space-between"
          mb={4}
          w="full"
        >
          <Box>
            <Text fontSize="lg">Website Title</Text>
            <Text fontSize="sm" mt={1}>
              A little description about the website.
            </Text>
          </Box>
          <Button colorScheme="blue" size="sm">
            Button
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
            <Link href="#">Facebook</Link>
            <Link href="#">Twitter</Link>
            <Link href="#">Instagram</Link>
          </VStack>
        </SimpleGrid>
      </Container>
      <Flex w="full" py="6" justifyContent="center">
        <Text color="gray.200" fontWeight="thin">
          Copyright 2023 Adebayo Olamilekan
        </Text>
      </Flex>
    </Box>
  );
};

export default Footer;
