import {
  Box,
  Flex,
  Heading,
  VStack,
  HStack,
  Icon,
  Text,
  Image,
  Grid,
  GridItem,
  Button,
  ListItem,
  List,
  ListIcon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Spinner,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  RiThumbUpLine,
  RiThumbUpFill,
  RiMessage3Line,
  RiBookmarkFill,
  RiFileCopyFill,
  RiShareLine,
  RiBookmarkLine,
  RiMoreLine,
  RiLightbulbFlashFill,
} from "react-icons/ri";
import { usePublicationQuery, usePublicationsQuery } from "@/graphql/generated";
import { useRouter } from "next/router";
import { ipfsToWebLink } from "@/lib/helpers";
import { shortenText } from "@/utils/shortenAccount";
import Link from "next/link";
import { FaComments } from "react-icons/fa";
import { FcLike } from "react-icons/fc";

const Publication = () => {
  const [Message, setMessage] = useState(0);
  const [likeLightUp, setLikeLightUp] = useState(false);
  const [markLightUp, setMarkLightUp] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const {
    isLoading: isLoadingPublication,
    data: publicationData,
    error: publicationError,
  } = usePublicationQuery(
    {
      request: {
        publicationId: id,
      },
    },
    {
      enabled: !!id,
    }
  );

  const data = publicationData?.publication?.metadata;
  const ownerData = publicationData?.publication?.profile;
  const {
    isLoading: isLoadingPublications,
    data: publicationsData,
    error: publicationsError,
  } = usePublicationsQuery(
    {
      request: {
        profileId: ownerData?.id,
        sources: ["axia-test-app", "axia-eco"],
      },
    },
    {
      enabled: !!ownerData?.id,
    }
  );
  
  const input_text = data?.content.toString();

  const getQuiz = async () => {
    const response = await fetch("http://localhost:5000/quiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input_text: input_text }),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <Grid h="full" templateColumns="repeat(8, 1fr)" py="5" gap={4} px="4">
      <GridItem
        colSpan={2}
        py="8"
        px="5"
        h="fit-content"
        bg="gray.700"
        rounded="xl"
      >
        <VStack w="fit" gap={6}>
          <Flex alignItems="center" justifyContent="center">
            <Image
              src={ipfsToWebLink(data?.image)}
              alt="Your Image"
              // w="70%"
              rounded="xl"
            />
          </Flex>
          <HStack w="fit" gap={6}>
            <Box display="flex" gap="2" cursor="pointer">
              <Icon
                color="#ffd17cff"
                as={likeLightUp ? RiThumbUpFill : RiThumbUpLine}
                boxSize="5"
              />
              <span>5</span>
            </Box>
            <Box display="flex" gap="2">
              <Icon
                color="#ffd17cff"
                as={RiMessage3Line}
                boxSize="5"
                cursor="pointer"
              />
              <Text>{Message}</Text>
            </Box>
            <Box display="flex" gap="2" cursor="pointer">
              <Icon
                color="#ffd17cff"
                as={markLightUp ? RiBookmarkFill : RiBookmarkLine}
                boxSize="5"
              />
              <Text>6</Text>
            </Box>
            <Box display="flex" gap="2" w="full" textAlign="center">
              <Popover placement="bottom">
                <PopoverTrigger>
                  <Box w="full">
                    <Icon
                      color="#ffd17cff"
                      as={RiMoreLine}
                      boxSize="5"
                      cursor="pointer"
                      w="full"
                    />
                  </Box>
                </PopoverTrigger>
                <PopoverContent w="fit-items">
                  <PopoverArrow />
                  <PopoverBody alignItems="center" color="black">
                    <List spacing={3}>
                      <ListItem cursor="pointer">
                        <ListIcon as={RiFileCopyFill} color="#ffd17cff" />
                        Copy
                      </ListItem>
                      <ListItem cursor="pointer">
                        <ListIcon as={RiShareLine} color="#ffd17cff" />
                        Share
                      </ListItem>
                    </List>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Box>
          </HStack>
        </VStack>
      </GridItem>
      <GridItem
        colSpan={{ base: 6, md: 4 }}
        py="8"
        px="5"
        bg="gray.700"
        rounded="xl"
        h="fit-content"
        w="full"
      >
        <VStack gap="5" w="full">
          <Heading w="full">{data?.name}</Heading>

          <Text w="full" px="3">
            {data?.description}
          </Text>

          <Text w="full" px="3">
            {data?.content}
          </Text>

          <Button
            onClick={getQuiz}
            bg="gray.600"
            fontWeight="500"
            _hover={{ bg: "gray.800" }}
          >
            Take Quiz
          </Button>
        </VStack>
      </GridItem>
      <GridItem
        colSpan={{ md: 2 }}
        display={{ base: "none", md: "unset" }}
        minHeight="200px"
        h="fit-content"
        py="8"
        px="5"
        bg="gray.700"
        rounded="xl"
        position="sticky"
      >
        <VStack w="full" px="3" gap="2" position="sticky">
          <Flex
            direction="column"
            w="full"
            alignItems="center"
            justifyContent="center"
          >
            <Image
              boxSize="100px"
              objectFit="cover"
              // @ts-ignore
              src={ipfsToWebLink(ownerData?.picture.original.url)}
              alt="Dan Abramov"
              borderRadius="full"
            />
          </Flex>
          <Text>{ownerData?.handle}</Text>
          <Text>{shortenText(ownerData?.bio ?? "", 60)}</Text>
          <Button
            w="full"
            bg="gray.600"
            fontWeight="500"
            _hover={{ bg: "gray.800" }}
          >
            Follow
          </Button>
          <Text w="full">From Writers Page</Text>
          <Flex
            direction="column"
            w="full"
            alignItems="center"
            justifyContent="center"
            gap="3"
          >
            {isLoadingPublications ? (
              <Spinner />
            ) : (
              <>
                {publicationsData?.publications.items.map((publication) => (
                  <Box
                    w="full"
                    h={16}
                    key={publication.id}
                    fontSize="sm"
                    color="blue.300"
                    my="2"
                  >
                    <Link href={`./articles/${publication.id}`}>
                      <Text>{publication.metadata.name}</Text>
                    </Link>
                    <Text
                      color="white"
                      opacity="90%"
                      fontSize="xs"
                      letterSpacing="3px"
                    >
                      {publication.metadata.description}
                    </Text>
                    <HStack
                      justifyContent="space-between"
                      w="full"
                      color="white"
                    >
                      <Flex alignItems="center" gap="2">
                        <Icon as={FcLike} />
                        <Text>3</Text>
                      </Flex>
                      <Flex alignItems="center" gap="2">
                        <Icon as={FaComments} />
                        <Text>0</Text>
                      </Flex>
                      <Icon as={RiLightbulbFlashFill} />
                    </HStack>
                  </Box>
                ))}
              </>
            )}
          </Flex>
        </VStack>
      </GridItem>
    </Grid>
  );
};

export default Publication;
