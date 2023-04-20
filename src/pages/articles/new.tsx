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
  Input,
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

const NewArticle = () => {
  const [viewing, setViewing] = useState<string>("");
  const [value, setValue] = useState("");

  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  const handleInputChange = (e: any) => {
    const inputValue = e.target.value;
    setValue(inputValue);
  };
  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  const OnFileChange = (e: any) => {
    try {
      const file = e.target.files[0];

      if (file) {
        const image = URL.createObjectURL(file);
        setViewing(image);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex w="full" gap="2" direction="column" py="7">
      <Text px="5" color="#efd8af" fontSize="3xl" w="full" textAlign="end">
        New Article
      </Text>

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
              <Flex
                w={56}
                h={36}
                bg={viewing ? "transparent" : "gray.300"}
                rounded="lg"
                color="black"
                justifyContent="center"
                alignItems="center"
              >
                {!viewing ? (
                  <Text>IMAGE HERE</Text>
                ) : (
                  <Image src={viewing} alt="Your Image" w="70%" />
                )}
              </Flex>
            </Flex>

            <VStack w="full">
              <Text w="full">File:</Text>
              <Input
                type="file"
                variant="outline"
                onChange={OnFileChange}
                py={1}
                px={3}
                borderWidth={1} // adds border
                borderColor="gray.300" // sets border color
                borderRadius="md" // sets border radius
                _hover={{ borderColor: "gray.400" }} // changes border color on hover
                _focus={{ outline: "none", boxShadow: "outline" }} // removes default focus styling and adds custom box shadow
                accept="image/*" // restricts file selection to image files
              />
            </VStack>
            <VStack w="full">
              <Text w="full">Summary:</Text>
              <Textarea
                w="full"
                value={value}
                onChange={handleInputChange}
                rows={7}
              />
            </VStack>
          </VStack>
        </GridItem>
        <GridItem
          colSpan={{ base: 6, md: 4 }}
          py="8"
          px="5"
          bg="gray.700"
          rounded="xl"
          h="fit-content"
          justifyContent="start"
        >
          <VStack gap="5" w="full" justifyContent="start">
            <Input
              type="text"
              variant="outline"
              placeholder="Title"
              fontSize="2xl"
              py={4}
              px={3}
              border="none"
              borderRadius="md"
            />

            <Input
              type="text"
              variant="outline"
              placeholder="Highlight in a sentence"
              fontSize="md"
              py={4}
              px={3}
              borderWidth={1}
              borderColor="gray.300"
              borderRadius="md"
              border="none"
            />

            <Textarea
              w="full"
              placeholder="In the year 3248, the world had become a post-apocalyptic..."
              value={value}
              onChange={handleInputChange}
              rows={17}
            />
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
            <Text>From your Page</Text>
            <Flex
              direction="column"
              w="full"
              alignItems="center"
              justifyContent="center"
              gap="3"
            >
              <Box w={56} h={56} rounded="xl" bg="gray.300" />
              <Box w={56} h={56} rounded="xl" bg="gray.300" />
              <Box w={56} h={56} rounded="xl" bg="gray.300" />
            </Flex>
          </VStack>
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default NewArticle;
