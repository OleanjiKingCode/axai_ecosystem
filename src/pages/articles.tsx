import {
  Heading,
  VStack,
  Flex,
  Text,
  Image,
  Grid,
  GridItem,
  Button,
  Input,
  Icon,
  HStack,
  Link,
  Box,
  chakra,
  SimpleGrid,
} from "@chakra-ui/react";
import React from "react";
import { FiSearch } from "react-icons/fi";
import {
  RiThumbUpLine,
  RiMessage3Line,
  RiShareForwardFill,
  RiFullscreenLine,
} from "react-icons/ri";

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
          {/* <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing="10px" p="10"> */}
          <Flex direction="row" w="full" p="10">
            <Image
              src="./bg.svg"
              alt="bg"
              rounded="2xl"
              w="30%"
              overflow="hidden"
            />
            <Flex
              bg="#46273d"
              cursor="pointer"
              h="198px"
              ml="-10"
              px="4"
              borderRightRadius="2xl"
              direction="column"
            >
              <VStack gap="1" py="4" w="full" h="inherit">
                <Heading fontSize="20" color="white" minH="30px" w="full">
                  The Plisters
                </Heading>
                <Text fontWeight="300" color="white">
                  Miscreants stand <br /> against politician <br /> overlords in
                  post- <br /> apocalyptic world.
                </Text>
              </VStack>

              <Flex
                gap="3"
                alignItems="center"
                pb="5"
                justifyContent="space-between"
              >
                <Icon as={RiThumbUpLine} />

                <Icon as={RiMessage3Line} />

                <Icon as={RiShareForwardFill} />
              </Flex>
            </Flex>
          </Flex>
          {/* </SimpleGrid> */}
        </GridItem>
      </Grid>
    </VStack>
  );
};

export default Services;
