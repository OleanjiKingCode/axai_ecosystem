import {
  Box,
  Flex,
  Heading,
  Tag,
  chakra,
  VStack,
  HStack,
  Icon,
  TagLabel,
  Text,
  Image,
  useToast,
  Grid,
  GridItem,
  Button,
  ListItem,
  OrderedList,
  Circle,
  Textarea,
  List,
  ListIcon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import {
  RiThumbUpLine,
  RiThumbUpFill,
  RiMessage3Line,
  RiBookmarkFill,
  RiFileCopyFill,
  RiShareLine,
  RiBookmarkLine,
  RiMoreLine,
} from "react-icons/ri";
import Link from "next/link";

const Bit = () => {
  const [Message, setMessage] = useState(0);
  const [likeLightUp, setLikeLightUp] = useState(false);
  const [markLightUp, setMarkLightUp] = useState(false);
  const [likeAccount, setLikeAccount] = useState("");
  const [markBit, setMarkBit] = useState("");

  return (
    <Grid h="full" templateColumns="repeat(7, 1fr)" py="5" gap={4}>
      <GridItem
        colSpan={1}
        py="40"
        justifyContent="center"
        alignItems="start"
        display="flex"
      >
        <VStack w="fit" gap={6}>
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
            <Popover placement="right">
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
              <PopoverContent>
                <PopoverArrow />
                <PopoverBody alignItems="center">
                  <List spacing={3}>
                    <ListItem>
                      <ListIcon as={RiFileCopyFill} color="#ffd17cff" />
                      Copy
                    </ListItem>
                    <ListItem>
                      <ListIcon as={RiShareLine} color="#ffd17cff" />
                      Share
                    </ListItem>
                  </List>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Box>
        </VStack>
      </GridItem>
      <GridItem colSpan={{ base: 6, md: 4 }} bg="gray.900" rounded="lg">
        <VStack gap="4" w="full" p="4">
          <chakra.div>
            <Heading>The Plisters - [Pilot EP01]</Heading>

            <Text py="9">
              In the year 3248, the world had become a post-apocalyptic
              wasteland, overrun by corrupt politicians who hoarded all the
              resources for themselves. The poor were left to suffer and
              struggle for survival, with no hope for a better future. But a
              group of miscreants known as the Plisters had had enough. <br />{" "}
              <br />
              Jayla, the leader of the Plisters, was a charismatic and fearless
              woman who had seen enough of the politicians' tyranny. She was
              driven by a fierce sense of justice and an unshakable belief in
              the power of collective action. With her piercing gaze and
              commanding presence, she inspired loyalty and respect from
              everyone who followed her.
              <br /> <br />
              The Plisters were a band of rebels who had banded together to
              fight for the rights of the oppressed. They were a motley crew of
              scavengers, drifters, and outcasts who had come together for a
              common cause. Each member brought a unique set of skills to the
              table, from engineering and medicine to combat and survival.{" "}
              <br /> <br /> The Plisters scoured the wasteland for resources and
              weapons, always on the lookout for opportunities to strike against
              the politicians. They were constantly on the move, never staying
              in one place for too long. They lived by a strict code of ethics,
              never stealing from the poor or harming innocents. <br /> <br />
              Their first mission was to infiltrate a heavily guarded government
              facility and steal a cache of supplies that had been hoarded by
              the politicians. It was a risky mission, with a high chance of
              failure. But Jayla and her team were determined to see it through.
              <br /> <br />
              They spent weeks planning and preparing, studying the facility's
              layout, and training for combat. On the day of the mission, they
              donned their armor and set out under cover of darkness. They moved
              swiftly and silently, taking out guards and avoiding detection.
              <br /> <br />
              Once inside, they quickly located the cache of supplies and began
              loading it onto their trucks. But just as they were about to make
              their escape, they were confronted by a squad of heavily armed
              soldiers. A fierce gun battle erupted, with the Plisters fighting
              tooth and nail to defend themselves. <br /> <br /> Despite the
              odds stacked against them, the Plisters fought with all their
              might, refusing to back down in the face of oppression. In the
              end, they emerged victorious, escaping with the supplies and
              leaving the soldiers in their wake.
              <br /> <br /> As word of their rebellion spread, more and more
              people joined the Plisters, inspired by their courage and
              determination to fight for justice. They became a beacon of hope
              in a world overrun by greed and corruption, a symbol of what could
              be achieved when people came together for a common cause. <br />{" "}
              <br /> But the politicians, realizing that they had a real threat
              on their hands, launched a counterattack against the Plisters.
              They sent their most skilled soldiers and deadliest weapons after
              them, determined to crush the rebellion once and for all. <br />{" "}
              <br /> The Plisters were outnumbered and outgunned, but they
              refused to give up. They dug in their heels and fought back with
              all their might, using their knowledge of the terrain and their
              superior tactics to gain the upper hand. <br /> <br /> In the end,
              the Plisters emerged victorious, overthrowing the corrupt
              government and paving the way for a new era of equality and
              justice. They had shown that even in a world where the odds are
              stacked against you, with enough courage and determination,
              anything is possible. <br /> <br /> From that day on, the Plisters
              became legends, celebrated for their bravery and selflessness in
              the face of adversity. They had not only liberated the poor from
              the clutches of the politicians, but also inspired a new
              generation of rebels to rise up and fight for what is right.
            </Text>
          </chakra.div>
          <Button bg="gray.700">
            {" "}
            <Link href="/quizs/1">Take Quiz</Link>
          </Button>
          <VStack w="full">
            <Text
              mt="10"
              w="full"
              fontWeight="bold"
              fontSize={{ base: "19", md: "22" }}
            >
              Comments
            </Text>

            <VStack w="full" px="6" py={3} gap="4">
              <Flex w="full" pb="4">
                <chakra.div alignSelf="start" mr="3">
                  <Circle size="40px" bg="gray.800" />
                </chakra.div>
                <Textarea placeholder="Write in here your comments" rows={3} />
              </Flex>
              <Flex w="full">
                <chakra.div alignSelf="start" mr="3">
                  <Circle size="40px" bg="gray.800" />
                </chakra.div>
                <Text w="full" py="2" px="3" bg="gray.800" rounded="md">
                  {" "}
                  This is a dummy comment
                </Text>
              </Flex>
              <Flex w="full">
                <chakra.div alignSelf="start" mr="3">
                  <Circle size="40px" bg="gray.800" />
                </chakra.div>
                <Text w="full" py="2" px="3" bg="gray.800" rounded="md">
                  {" "}
                  This is a dummy comment
                </Text>
              </Flex>
              <Flex w="full">
                <chakra.div alignSelf="start" mr="3">
                  <Circle size="40px" bg="gray.800" />
                </chakra.div>
                <Text w="full" py="2" px="3" bg="gray.800" rounded="md">
                  {" "}
                  This is a dummy comment
                </Text>
              </Flex>
            </VStack>
          </VStack>
        </VStack>
      </GridItem>
      <GridItem
        colSpan={{ md: 2 }}
        display={{ base: "none", md: "unset" }}
        minHeight="200px"
        h="fit-content"
        py="6"
        bg="gray.900"
        rounded="lg"
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
              src="https://bit.ly/dan-abramov"
              alt="Dan Abramov"
              borderRadius="full"
            />
          </Flex>
          <Text>Oleanji</Text>
          <Button w="full">Follow</Button>
        </VStack>
      </GridItem>
    </Grid>
  );
};

// export const getServerSideProps = async (context) => {
//   const id = context.params?.bit;
//   const response = await fetch(`${config.SiteUrlLink}/api/Bits/${id}`);
//   if (response.status === 200) {
//     const bit = await response.json();
//     let email = bit.ownerEmail;
//     const responseTwo = await fetch(`${config.SiteUrlLink}/api/User/${email}`);
//     const user = await responseTwo.json();

//     return {
//       props: {
//         bit,
//         user,
//       },
//     };
//   }
//   return {
//     props: {
//       statusCode: response.status,
//       statusText: "Invalid ID",
//     },
//   };
// };

export default Bit;
