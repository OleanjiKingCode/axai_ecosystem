import {
  Button,
  Flex,
  Spacer,
  Text,
  useDisclosure,
  HStack,
  chakra,
  Icon,
  VStack,
  Image,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import NextLink from "next/link";
import { useNetwork, useAccount } from "wagmi";
import ProfileSubMenu from "./ProfileSubMenu";
import WalletConnect from "./WalletConnect";
import { NetworkNotification, SignInWithLens } from "./NetworkNotification";
import { utils } from "ethers";
import { RiMenu3Fill } from "react-icons/ri";
import useLensUser from "@/lib/auth/useLensUser";
import useLogin from "@/lib/auth/useLogin";

export const Navbar = () => {
  const [openWalletConnect, setOpenWalletConnect] = useState<boolean>(false);
  const { chain } = useNetwork();
  const { isSignedInQuery, profileQuery } = useLensUser();
  const { mutate: requestLogin } = useLogin();

  const NETWORK_DATA = [
    {
      name: "Polygon",
      chainId: utils.hexValue(1),
      chainNoHex: 80001,
      chainName: "Polygon Mumbai Testnet",
      nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
      rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
      blockExplorerUrls: ["https://mumbai.polygonscan.com"],
    },
  ];
  const [currentNetwork, setCurrentNetwork] = useState(NETWORK_DATA[0]);
  const [dropdown, setDropdown] = useState(false);
  const { isConnected: isUserConnected } = useAccount();
  const {
    isOpen: isOpenSwitch,
    onOpen: onOpenSwitch,
    onClose: onCloseSwitch,
  } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    CheckNetwork();
    if (isUserConnected && !isSignedInQuery.data) {
      console.log("fhxdhfd");
      onOpen();
    }
  }, [isUserConnected, currentNetwork]);

  const CheckNetwork = () => {
    if (isUserConnected && chain?.id !== currentNetwork.chainNoHex) {
      onOpenSwitch();
    }
  };



  return (
    <VStack bg="#17171a" color="#ffd17cff">
      <Flex
        boxSize="full"
        align="center"
        gap="2.5"
        py="5px"
        px={{ base: "4", lg: "10" }}
        fontSize="sm"
        justifyContent="space-between"
      >
        <NextLink href="/" passHref>
          <Flex
            as="a"
            alignItems="center"
            gap="3"
            w="fit"
            cursor="pointer"
            pl="10"
            pt="1"
          >
            <Image alt="nameLogo" src="/axia.svg" w="30%" />
          </Flex>
        </NextLink>
        <HStack gap="3">
          <NextLink href="/articles" passHref>
            <Text fontWeight="normal" fontSize={{ base: "sm", md: "lg" }}>
              Articles
            </Text>
          </NextLink>
          <NextLink href="/games" passHref>
            <Text fontWeight="normal" fontSize={{ base: "sm", md: "lg" }}>
              Games
            </Text>
          </NextLink>

          <NextLink href="/dex" passHref>
            <Text fontWeight="normal" fontSize={{ base: "sm", md: "lg" }}>
              Dex
            </Text>
          </NextLink>
          <NextLink href="/stake" passHref>
            <Text fontWeight="normal" fontSize={{ base: "sm", md: "lg" }}>
              Stake
            </Text>
          </NextLink>

          {!isUserConnected ? (
            <Button
              size="sm"
              onClick={() => setOpenWalletConnect(true)}
              fontSize="sm"
              px="4"
              fontWeight="medium"
              bg="transparent"
              borderColor="white"
              borderWidth="2px"
              _hover={{
                bg: "#ffd17cff",
                color: "black",
                borderColor: "#ffd17cff",
              }}
            >
              Connect Wallet
            </Button>
          ) : (
            <ProfileSubMenu />
          )}
        </HStack>
        <chakra.div display={{ base: "unset", lg: "none" }}>
          <Button
            bg="transparent"
            _hover={{ bg: "gray.800", color: "white" }}
            _active={{ bg: "gray.800", color: "white" }}
            onClick={() => setDropdown(!dropdown)}
          >
            <Icon as={RiMenu3Fill} />
          </Button>
        </chakra.div>
      </Flex>
      <Flex
        w="full"
        display={dropdown ? { base: "unset", lg: "none" } : "none"}
        bg="white"
        py="5"
        fontSize="md"
        textAlign="center"
      >
        {!isUserConnected ? (
          <Button
            size="sm"
            onClick={() => setOpenWalletConnect(true)}
            fontSize="sm"
            px="4"
            fontWeight="medium"
            _hover={{ bg: "gray.100", color: "black" }}
          >
            Connect Wallet
          </Button>
        ) : (
          <VStack gap={3}>
            <Text fontWeight="600">Your Wallet Details</Text>
            <ProfileSubMenu />
          </VStack>
        )}
      </Flex>

      <WalletConnect
        onClose={() => setOpenWalletConnect(false)}
        isOpen={openWalletConnect}
      />
      <NetworkNotification isOpen={isOpenSwitch} onClose={onCloseSwitch} />
      <SignInWithLens isOpen={isOpen} onClose={onClose} />
    </VStack>
  );
};
