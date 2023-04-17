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
} from "@chakra-ui/react";
import React from "react";
import { FiSearch } from "react-icons/fi";
import {
  RiThumbUpLine,
  RiMessage3Line,
  RiShareForwardFill,
  RiFullscreenLine,
} from "react-icons/ri";
import { RxPlus } from "react-icons/rx";
import Link from "next/link";

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
        <GridItem
          colSpan={1}
          borderRightWidth="1px"
          borderTopWidth="1px"
          borderColor="whiteAlpha.300"
        />
        <GridItem
          colSpan={4}
          borderLeftWidth="1px"
          w="full"
          borderTopWidth="1px"
          borderColor="whiteAlpha.300"
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
              <Button bg="gray.700">Create New Article</Button>
              <Button bg="gray.700">
                <Link href="/quizs/1">Take Random Quiz</Link>
              </Button>
            </HStack>
          </Flex>
          <Flex direction="column" w="full" p="3">
            <Link href="./articles/1">
              <Flex
                w="30%"
                gap="0"
                direction="column"
                _hover={{ textDecoration: "none" }}
              >
                <Image
                  src="./bg.svg"
                  alt="bg"
                  borderTopRadius="2xl"
                  w="full"
                  overflow="hidden"
                />
                <VStack
                  bg="#46273d"
                  cursor="pointer"
                  py="3"
                  px="4"
                  borderBottomRadius="2xl"
                  direction="column"
                >
                  <Heading fontSize="20" color="white" minH="30px" w="full">
                    EP-01 <i>The Pilot </i>
                  </Heading>
                  <Text w="full">⚪ Oleanji</Text>
                  <HStack
                    w="full"
                    gap="3"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Button
                      bg="transparent"
                      border="1px"
                      borderColor="#230a1b "
                      leftIcon={<RiThumbUpLine />}
                    >
                      204
                    </Button>
                    <Button
                      bg="transparent"
                      border="1px"
                      borderColor="#230a1b "
                      leftIcon={<RiMessage3Line />}
                    >
                      4
                    </Button>
                    <Button bg="transparent" border="1px" borderColor="#230a1b">
                      <Icon as={RiShareForwardFill} />
                    </Button>
                    <Button bg="transparent" border="1px" borderColor="#230a1b">
                      <Icon as={RxPlus} />
                    </Button>
                  </HStack>
                </VStack>
              </Flex>
            </Link>
          </Flex>
        </GridItem>
      </Grid>
    </VStack>
  );
};

export default Services;
