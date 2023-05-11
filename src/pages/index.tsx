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
  ModalHeader,
  ModalOverlay,
  Box,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Radio,
  useToast,
  RadioGroup,
  ModalCloseButton,
  Tooltip,
  Icon,
  HStack,
} from "@chakra-ui/react";
import Services from "./features";
import Footer from "@/components/footer";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ConnectWallet, useAddress, useDisconnect } from "@thirdweb-dev/react";
import axios from "axios";
import { RiLogoutBoxLine } from "react-icons/ri";
import { config } from "@/Data/config";
import { userData } from "@/components/datatypes";
import { useRouter } from "next/router";

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
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();
  const toast = useToast();
  const options = [
    { value: "writer", label: "./artist.svg", text: "Writers" },
    { value: "gamdev", label: "./gamers.svg", text: "Game Devs" },
    { value: "artists", label: "./music.svg", text: "Artists" },
  ];
  const [selectedValue, setSelectedValue] = useState(null);

  const handleRadioChange = (value: any) => {
    setSelectedValue(value);
  };

  const submitHandler: SubmitHandler<Inputs> = async (data) => {
    try {
      const { name, email } = data;
      const role = selectedValue;
      if (!name || !email || !role || !address) {
        toast({
          title: `Fill in all info`,
          description: "",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
        return;
      }
      await axios.post("/api/user/signup", {
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
  const disconnect = useDisconnect();

  const [userData, setUserData] = useState<userData>();
  const [btnText, setBtnText] = useState("Join Us Today");

  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${config.SiteUrlLink}/api/user/${address}`);
      if (response) {
        const data = await response.json();
        setUserData(data.user);
      }
    };
    fetchData();
  }, [address]);

  const frontLink = () => {
    if (address && userData?.role) {
      router.push("/articles");
    } else {
      onOpen();
    }
  };

  useEffect(() => {
    if (userData?.role) {
      setBtnText("Read Great Stories");
    } else {
      setBtnText("Join Us Today");
    }
  }, [userData, address]);

  return (
    <chakra.div>
      <Head>
        <title>Axia Ecosystem</title>
        <meta name="description" content="Axia Ecosystem" />
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
              onClick={frontLink}
              _hover={{
                color: "#ffd17cff",
                bg: "transparent",
              }}
            >
              {btnText}
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

        <ModalContent bg="#363639" pb="10px" color="white">
          <ModalHeader w="full" textAlign="center">
            Join Axia Ecosystem
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column" w="full" gap="5">
              <form
                onSubmit={handleSubmit(submitHandler)}
                style={{ width: "full" }}
              >
                <Flex
                  flexDirection="column"
                  gap="5"
                  alignItems={{ md: "center" }}
                  w="full"
                >
                  <Box w="full">
                    <FormControl>
                      <FormLabel htmlFor="name">Username</FormLabel>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your any name you would love"
                        {...register("name", {
                          required: "Please enter any Username",
                          minLength: {
                            value: 5,
                            message: "Username should be more than 5 chars",
                          },
                        })}
                        borderColor="#ffd17c"
                        backgroundColor="transparent !important"
                      />
                      {errors.name && (
                        <Text color="red.500" py="1">
                          {errors.name.message?.toString()}
                        </Text>
                      )}
                    </FormControl>
                  </Box>
                  <Box w="full">
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
                        borderColor="#ffd17c"
                        backgroundColor="transparent"
                      />
                      {errors.email && (
                        <Text color="red.500" py="1">
                          {errors.email.message?.toString()}
                        </Text>
                      )}
                    </FormControl>
                  </Box>
                  <Box w="full">
                    <FormControl>
                      <FormLabel htmlFor="address">Wallet Address</FormLabel>
                      <HStack gap="2" w="full">
                        <Input
                          type="text"
                          id="address"
                          placeholder="Connect your wallet"
                          value={address}
                          borderColor="#ffd17c"
                          disabled
                          backgroundColor="transparent"
                          w="90%"
                        />
                        <Icon
                          as={RiLogoutBoxLine}
                          boxSize="6"
                          onClick={disconnect}
                          cursor="pointer"
                          bg="#ffd17c"
                          fontSize="2xl"
                          p="1"
                          rounded="md"
                        />
                      </HStack>
                    </FormControl>
                  </Box>
                  <Box w="full">
                    <FormControl>
                      <FormLabel htmlFor="role">Choose a role:</FormLabel>
                      <RadioGroup
                        onChange={handleRadioChange}
                        colorScheme="yellow"
                      >
                        <Box display="flex" flexDirection="row" w="full">
                          {options.map((option) => (
                            <VStack key={option.value}>
                              <Radio
                                value={option.value}
                                display="flex"
                                flexDir="column-reverse"
                              >
                                <Tooltip label={option.text}>
                                  <Image
                                    src={option.label}
                                    alt={option.value}
                                    w="400px"
                                  />
                                </Tooltip>
                              </Radio>
                            </VStack>
                          ))}
                        </Box>
                      </RadioGroup>
                    </FormControl>
                  </Box>

                  {address ? (
                    <Button
                      type="submit"
                      w="full"
                      bg="#ffd17cff"
                      _hover={{ bg: "gray", color: "black" }}
                      color="white"
                      my="5"
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
                        color: "white",
                        backgroundColor: "#ffd17cff",
                        marginTop: "25px",
                        marginBottom: "10px",
                        padding: "10px",
                        borderRadius: "10px",
                        transition: "background-color 0.3s ease",
                        width: "100%",
                      }}
                    />
                  )}
                </Flex>
              </form>
            </Flex>
          </ModalBody>
          {/* <ModalFooter w="full">
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Join</Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </chakra.div>
  );
}
