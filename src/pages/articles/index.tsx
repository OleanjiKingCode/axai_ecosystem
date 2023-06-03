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
  Spinner,
  Box,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FcLike } from "react-icons/fc";
import { FaComments } from "react-icons/fa";
import {
  RiThumbUpLine,
  RiMessage3Line,
  RiShareForwardFill,
  RiLightbulbFlashFill,
} from "react-icons/ri";
import { RxPlus } from "react-icons/rx";
import Link from "next/link";
import {
  PublicationMainFocus,
  PublicationSortCriteria,
  useExplorePublicationsQuery,
  PublicationQueryRequest,
  usePublicationsQuery,
} from "../../graphql/generated";
import { ipfsToWebLink } from "@/lib/helpers";
import { useAddress } from "@thirdweb-dev/react";
import axios from "axios";
import { useRouter } from "next/router";

export const Services = () => {
  const [inputValue, setValue] = useState("");
  const router = useRouter();
  const address = useAddress();
  const toast = useToast();
  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  const handleSearchInputChange = (e: any) => {
    const input = e.target.value;
    setValue(input);
  };
  const [userData, setUserData] = useState(false);
  const { isLoading, error, data } = useExplorePublicationsQuery(
    {
      request: {
        sortCriteria: PublicationSortCriteria.Latest,
        sources: ["axia-test-app", "axia-eco"],
      },
    },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    }
  );
  data?.explorePublications.items.sort(
    (a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))
  );

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

  const linkToArticle = () => {
    console.log(userData);
    if (userData) {
      router.push("/quizs/0x019ded-0x16");
    } else {
      toast({
        title: "You need to register before taking a quiz",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack w="full" gap="3" px="5" minH="89vh">
      <Flex
        w="full"
        alignItems="start"
        direction="column"
        justifyContent="flex-start"
        px={{ base: "8", md: "20", lg: "28" }}
        textAlign="center"
      >
        <Heading py="3" color="#ffeeb9" w="full">
          Articles
        </Heading>
        <Text w="full">
          The Axia Ecosystem Articles Page offers a wide variety of content
          created by talented individuals from around the world. Users can
          engage with the content, take quizzes, and earn rewards. The filtering
          system makes it easy to discover new and interesting topics. Join us
          to be a part of a community that values creativity, knowledge sharing,
          and lifelong learning.
        </Text>
      </Flex>

      <VStack
        gap="4"
        w="full"
        mt="4"
        borderTopWidth="1px"
        borderColor="whiteAlpha.300"
      >
        <Flex
          w="full"
          alignItems="center"
          justifyContent="space-between"
          p="2"
          direction={{ base: "column", md: "row" }}
        >
          <Flex gap="3" rounded="md" borderWidth="1px" borderColor="#ffffff29">
            <Flex pl={3} alignItems="center" justifyContent="center">
              <Icon as={FiSearch} w={5} h={5} color="gray.300" />
            </Flex>
            <Input
              type="text"
              value={inputValue}
              onChange={handleSearchInputChange}
              placeholder="Search"
              variant="unstyled"
              roundedRight="6px"
              bg="transparent"
              py="2"
              pl="1"
              pr="3"
              w="500px"
              fontWeight="normal"
              color="white"
              outline="none"
              fontSize="sm"
            />
          </Flex>
          <HStack
            gap="4"
            px="2"
            pt={{ base: "10", md: "0" }}
            w={{ base: "full" }}
          >
            <Button
              bg="gray.700"
              fontWeight="500"
              _hover={{ bg: "gray.800" }}
              w={{ base: "full" }}
            >
              Create New Article
            </Button>
            <Button
              bg="gray.700"
              fontWeight="500"
              _hover={{ bg: "gray.800" }}
              w={{ base: "full" }}
              onClick={linkToArticle}
            >
              <Text>Take Random Quiz</Text>
            </Button>
          </HStack>
        </Flex>
        {data ? (
          <Grid
            templateColumns={{
              sm: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap={14}
            pb="10"
          >
            <>
              {data?.explorePublications.items.map((publication) => {
                return (
                  <GridItem
                    colSpan={1}
                    rowSpan={1}
                    w="full"
                    key={publication.id}
                    py="3"
                    minH="358px"
                  >
                    <Flex
                      gap="0"
                      direction="column"
                      _hover={{ textDecoration: "none" }}
                    >
                      <Link href={`./articles/${publication.id}`}>
                        <Image
                          src={
                            ipfsToWebLink(publication.metadata.image) ||
                            ipfsToWebLink(
                              publication.metadata?.media[0]?.original.url
                            )
                          }
                          alt={publication.metadata.name || ""}
                          borderTopRadius="2xl"
                          w="340px"
                          minH="233px"
                          maxH="233px"
                          overflow="hidden"
                        />
                      </Link>
                      <VStack
                        bg="#413921 "
                        cursor="pointer"
                        py="3"
                        px="4"
                        borderBottomRadius="2xl"
                        direction="column"
                      >
                        <Heading fontSize="18" color="white" w="full">
                          <Link href={`./articles/${publication.id}`}>
                            {publication.metadata.name}
                          </Link>
                        </Heading>
                        <HStack w="full">
                          <Image
                            boxSize="30px"
                            objectFit="cover"
                            src={ipfsToWebLink(
                              // @ts-ignore
                              publication.profile?.picture?.original?.url
                            )}
                            alt="Dan Abramov"
                            borderRadius="full"
                          />
                          <Text w="full">
                            {publication.profile.handle ||
                              publication.profile.name}
                          </Text>
                        </HStack>

                        <HStack
                          w="full"
                          gap="3"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Button
                            bg="whiteAlpha.100"
                            border="none"
                            leftIcon={<FcLike />}
                            _hover={{ bg: "whiteAlpha.200" }}
                            px="6"
                          >
                            2
                          </Button>
                          <Button
                            bg="whiteAlpha.100"
                            border="none"
                            leftIcon={<FaComments />}
                            _hover={{ bg: "whiteAlpha.200" }}
                            px="6"
                          >
                            4
                          </Button>
                          <Button
                            bg="whiteAlpha.100"
                            border="none"
                            _hover={{ bg: "whiteAlpha.200" }}
                            px="6"
                          >
                            <Icon as={RiLightbulbFlashFill} />
                          </Button>
                        </HStack>
                      </VStack>
                    </Flex>
                  </GridItem>
                );
              })}
            </>
          </Grid>
        ) : (
          <Flex w="full" h="300px" alignItems="center" justifyContent="center">
            <Spinner />
          </Flex>
        )}
      </VStack>
    </VStack>
  );
};

export default Services;
