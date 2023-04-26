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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import {
  RiThumbUpLine,
  RiMessage3Line,
  RiShareForwardFill,
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

export const Services = () => {
  const [inputValue, setValue] = useState("");

  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  const handleSearchInputChange = (e: any) => {
    const input = e.target.value;
    setValue(input);
  };

  const { isLoading, error, data } = useExplorePublicationsQuery(
    {
      request: {
        sortCriteria: PublicationSortCriteria.Latest,
        sources: ["banji-app", "axia-test-app"],
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
  return (
    <VStack w="full" gap="3" px="5" minH="89vh">
      <Flex
        w="full"
        alignItems="start"
        direction="column"
        justifyContent="flex-start"
        px="28"
        textAlign="center"
      >
        <Heading py="3" color="#ffeeb9" w="full">
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

      <VStack
        gap="4"
        w="full"
        mt="4"
        borderTopWidth="1px"
        borderColor="whiteAlpha.300"
      >
        <Flex w="full" alignItems="center" justifyContent="space-between" p="2">
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
              w="full"
              fontWeight="normal"
              color="gray.900"
              outline="none"
              fontSize="sm"
            />
          </Flex>
          <HStack gap="4">
            <Button bg="gray.700" fontWeight="500" _hover={{ bg: "gray.800" }}>
              <Link href="./articles/new">Create New Article</Link>
            </Button>
            <Button bg="gray.700" fontWeight="500" _hover={{ bg: "gray.800" }}>
              <Link href="/quizs/1">Take Random Quiz</Link>
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
            gap={4}
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
                          w="full"
                          minH="233px"
                          maxH="233px"
                          overflow="hidden"
                        />
                      </Link>
                      <VStack
                        bg="#46273d"
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

                        <Text w="full">
                          ⚪{" "}
                          {publication.profile.handle ||
                            publication.profile.name}
                        </Text>
                        <HStack
                          w="full"
                          gap="3"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Button
                            bg="whiteAlpha.100"
                            border="none"
                            leftIcon={<RiThumbUpLine />}
                            _hover={{ bg: "whiteAlpha.200" }}
                          >
                            204
                          </Button>
                          <Button
                            bg="whiteAlpha.100"
                            border="none"
                            leftIcon={<RiMessage3Line />}
                            _hover={{ bg: "whiteAlpha.200" }}
                          >
                            4
                          </Button>
                          <Button
                            bg="whiteAlpha.100"
                            border="none"
                            _hover={{ bg: "whiteAlpha.200" }}
                          >
                            <Icon as={RiShareForwardFill} />
                          </Button>
                          <Button
                            bg="whiteAlpha.100"
                            border="none"
                            _hover={{ bg: "whiteAlpha.200" }}
                          >
                            <Icon as={RxPlus} />
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
