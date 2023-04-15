import {
  Heading,
  VStack,
  Flex,
  Text,
  chakra,
  Grid,
  GridItem,
  Button,
  Input,
  Icon,
  HStack,
  Link,
} from "@chakra-ui/react";
import React from "react";
import { FiSearch } from "react-icons/fi";

export const Services = () => {
  return (
    <VStack w="full" gap="5" px="5" minH="89vh">
      <Flex
        w="full"
        alignItems="start"
        direction="column"
        justifyContent="flex-start"
        px="28"
        textAlign="center"
      >
        <Heading py="5" color="#ffeeb9" w="full">
          Articles
        </Heading>
        <Text>
          The Axia Ecosystem Articles Page offers a wide variety of content
          created by talented individuals from around the world. Users can
          engage with the content, take quizzes, and earn rewards. The filtering
          system makes it easy to discover new and interesting topics. Join us
          to be a part of a community that values creativity, knowledge sharing,
          and lifelong learning.
        </Text>
      </Flex>

      <Grid minH="inherit" templateColumns="repeat(5, 1fr)" gap={4} w="full">
        <GridItem colSpan={1} borderRightWidth="1px" borderTopWidth="1px" />
        <GridItem
          colSpan={4}
          borderLeftWidth="1px"
          w="full"
          borderTopWidth="1px"
        >
          <Flex
            w="full"
            alignItems="center"
            justifyContent="space-between"
            p="2"
            gap="10"
          >
            <Flex
              gap="3"
              rounded="md"
              borderWidth="1px"
              borderColor="#ffffff29"
              w="full"
            >
              <Flex pl={3} alignItems="center" justifyContent="center">
                <Icon as={FiSearch} w={5} h={5} color="gray.300" />
              </Flex>
              <Input
                type="text"
                // value={searchQuery}
                // onChange={handleSearchInputChange}
                placeholder="Search"
                variant="unstyled"
                roundedRight="6px"
                bg="transparent"
                py="2"
                pl="1"
                pr="3"
                w="full"
                fontWeight="normal"
                color="gray.900"
                outline="none"
                fontSize="sm"
              />
            </Flex>
            <HStack w="full" gap="4">
              <Button>Create New Article</Button>
              <Button>
                <Link href="/quizs/1">Take Random Quiz</Link>
              </Button>
            </HStack>
          </Flex>
        </GridItem>
      </Grid>
    </VStack>
  );
};

export default Services;
