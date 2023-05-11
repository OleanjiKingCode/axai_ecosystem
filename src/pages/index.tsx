import { Inter } from "next/font/google";
import {
  Text,
  VStack,
  Image,
  Heading,
  chakra,
  Flex,
  Button,
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Box,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Stack,
  Radio,
  useToast,
  RadioGroup,
} from "@chakra-ui/react";
import Services from "./features";
import Footer from "@/components/footer";
import Head from "next/head";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import axios from "axios";

type Inputs = {
  name: string;
  email: string;
};

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);
  const address = useAddress();
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();
  const toast = useToast();
  const options = [
    { value: "writer", label: "./artist.svg" },
    { value: "gamdev", label: "./gamers.svg" },
    { value: "artists", label: "./music.svg" },
  ];
  const [selectedValue, setSelectedValue] = useState(null);

  const handleRadioChange = (value: any) => {
    setSelectedValue(value);
  };

  const submitHandler: SubmitHandler<Inputs> = async (data) => {
    try {
      const { name, email } = data;
      const role = selectedValue;
      await axios.post("/api/User/signup", {
        name,
        email,
        address,
        role,
      });
    } catch (error: any) {
      toast({
        title: `${error.response.data.message}`,
        description: "",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  //useeffect to check if the connected address has detail in our db
  return (
    <chakra.div>
      <Head>
        <title>Axia Ecosystem</title>
        <meta name="description" content="EASTER INU" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <VStack w="full" pt="20" color="white">
        <Flex gap="" w="full" pl="20" textAlign="start">
          <Flex
            w="full"
            alignItems="center"
            justifyContent="center"
            direction="column"
            gap="2"
          >
            <Heading w="full" fontSize="7xl" fontWeight="bold">
              Engage ·<chakra.span color="#ffdda0ff">Learn</chakra.span> · Earn
            </Heading>
            <Text fontSize="lg">
              We at axia ecosystem serve as the bridge between creators and a
              global audience. Revolutionizing the way they share their work
              with the world through innovative incentives.
            </Text>
            <Button
              w="full"
              mt="5"
              py="5"
              bg="#ffd17cff"
              fontSize="xl"
              borderColor="#ffd17cff"
              borderWidth="1px"
              onClick={onOpen}
              _hover={{
                color: "#ffd17cff",
                bg: "transparent",
              }}
            >
              Join Us Today
            </Button>
          </Flex>
          <Flex w="full" alignItems="center" justifyContent="center" px="12">
            <Image src="./sideLogo.svg" alt="Logo" w="80%" />
          </Flex>
        </Flex>
        <Flex
          w="full"
          alignItems="center"
          px="40px"
          justifyContent="space-between"
        >
          <Image src="./lens.svg" alt="lens-protocol" w="3%" />
          <Image src="./polygon.svg" alt="polygon" w="10%" />
          <Image src="./link.svg" alt="chainlink" w="8%" />
        </Flex>
      </VStack>
      <Services />
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Join Axia Ecosystem</ModalHeader>
          <ModalBody>
            <Flex>
              <Text>Create an account</Text>
              <form
                onSubmit={handleSubmit(submitHandler)}
                style={{ width: "inherit" }}
              >
                <Flex
                  flexDirection="column"
                  gap="5"
                  alignItems={{ md: "center" }}
                  w="full"
                >
                  <Box w={{ sm: "full", md: "50%" }}>
                    <FormControl>
                      <FormLabel htmlFor="name">Username</FormLabel>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your any name you would love to use for yourself "
                        {...register("name", {
                          required: "Please enter any Username",
                          minLength: {
                            value: 5,
                            message: "Username should be more than 5 chars",
                          },
                        })}
                        autoFocus
                      />
                      {errors.name && (
                        <Text color="red.500" py="1">
                          {errors.name.message?.toString()}
                        </Text>
                      )}
                    </FormControl>
                  </Box>
                  <Box w={{ sm: "full", md: "50%" }}>
                    <FormControl>
                      <FormLabel htmlFor="email">
                        Email{" "}
                        <chakra.span fontStyle="italic">
                          (optional){" "}
                        </chakra.span>
                      </FormLabel>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        {...register("email", {
                          pattern: {
                            value:
                              /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                            message: "Please enter valid email",
                          },
                        })}
                      />
                      {errors.email && (
                        <Text color="red.500" py="1">
                          {errors.email.message?.toString()}
                        </Text>
                      )}
                    </FormControl>
                  </Box>
                  <Box w={{ sm: "full", md: "50%" }}>
                    <FormControl>
                      <FormLabel htmlFor="address">Wallet Address</FormLabel>
                      <Input
                        type="text"
                        id="address"
                        placeholder="Connect your wallet"
                        value={address && address}
                      />
                    </FormControl>
                  </Box>
                  <Box w={{ sm: "full", md: "50%" }}>
                    <FormControl>
                      <FormLabel htmlFor="role">Choose Role</FormLabel>
                      <RadioGroup onChange={handleRadioChange}>
                        <Box display="flex" flexDirection="row">
                          {options.map((option) => (
                            <Radio key={option.value} value={option.value}>
                              <Image
                                src={option.label}
                                alt={option.value}
                                w="4%"
                              />
                            </Radio>
                          ))}
                        </Box>
                      </RadioGroup>
                    </FormControl>
                  </Box>
                  {address ? (
                    <Button
                      type="submit"
                      w={{ sm: "full", md: "50%" }}
                      bg="#4ed879"
                      _hover={{ bg: "gray", color: "black" }}
                      color="white"
                    >
                      <Text>
                        {isSubmitting ? (
                          <Spinner size="sm" color="white" />
                        ) : (
                          "Register"
                        )}
                      </Text>
                    </Button>
                  ) : (
                    <ConnectWallet
                      style={{
                        fontSize: "16px",
                        fontWeight: "thin",
                        color: "#ffd17cff",
                        backgroundColor: "transparent",
                        border: "white 2px solid",
                        padding: "10px",
                        borderRadius: "10px",
                        transition: "background-color 0.3s ease",
                      }}
                    />
                  )}
                </Flex>
              </form>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Join</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </chakra.div>
  );
}
