import {
  Box,
  Flex,
  Text,
  Image,
  Input,
  Grid,
  GridItem,
  Button,
  Textarea,
  Spinner,
  VStack,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useCreatePost } from "@/lib/useCreatePost";
import { GetArticleReward } from "@/components/Nav/NetworkNotification";
import { useChainId, useNetwork, useAddress } from "@thirdweb-dev/react";
import { ChainId } from "@thirdweb-dev/sdk";

const NewArticle = () => {
  const [viewing, setViewing] = useState<string>("");
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const router = useRouter();
  const toast = useToast();
  const { mutateAsync: createPost } = useCreatePost();
  const chainId = useChainId();
  const [, switchNetwork] = useNetwork();
  const address = useAddress();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  const handleInputChange = (e: any) => {
    const inputValue = e.target.value;
    setValue(inputValue);
  };
  const OnFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (file && file.name.length > 10) {
        const newName = `${title}.jpg`;
        const updatedFile = new File([file], newName, {
          type: file.type,
          lastModified: file.lastModified,
        });
        setImage(updatedFile);
        if (updatedFile) {
          const image = URL.createObjectURL(updatedFile);
          setViewing(image);
        }
      } else {
        if (file) {
          setImage(file);
          const image = URL.createObjectURL(file);
          setViewing(image);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createNew = async () => {
    try {
      setLoading(true);
      if (!image) {
        setLoading(false);
        toast({
          title: "Image not attached.",
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
        return;
      }
      if (address && chainId !== 137) {
        switchNetwork?.(ChainId.Polygon);
      }
      const tx = await createPost({
        image,
        title,
        description,
        content,
      });
      setLoading(false);
      onOpen();
    } catch (error) {
      console.log(error);
      setLoading(false);
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
              onChange={(e) => setTitle(e.target.value)}
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
              onChange={(e) => setDescription(e.target.value)}
            />

            <Textarea
              w="full"
              placeholder="In the year 3248, the world had become a post-apocalyptic..."
              rows={17}
              onChange={(e) => setContent(e.target.value)}
            />
            <Button
              onClick={createNew}
              bg="gray.600"
              fontWeight="500"
              _hover={{ bg: "gray.800" }}
            >
              {loading ? <Spinner /> : "Create Post"}
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
      <GetArticleReward isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default NewArticle;
