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
  SlideFade,
  Collapse,
} from "@chakra-ui/react";
import {
  ConnectWallet,
  useAddress,
  useChainId,
  useNetworkMismatch,
} from "@thirdweb-dev/react";
import React, { useState, useEffect } from "react";
import NextLink from "next/link";
import ProfileSubMenu from "./ProfileSubMenu";
import { NetworkNotification, SignInWithLens } from "./NetworkNotification";
import { utils } from "ethers";
import { RiMenu3Fill } from "react-icons/ri";
import useLensUser from "@/lib/auth/useLensUser";
import useLogin from "@/lib/auth/useLogin";

export const Navbar = () => {
  const { isSignedInQuery, profileQuery } = useLensUser();
  const { mutate: requestLogin } = useLogin();
  const address = useAddress(); // Detect the connected address
  const chainId = useChainId();
  const [dropdown, setDropdown] = useState(false);
  const {
    isOpen: isOpenSwitch,
    onOpen: onOpenSwitch,
    onClose: onCloseSwitch,
  } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isOnWrongNetwork = useNetworkMismatch();

  useEffect(() => {
    if (address && chainId !== 80001 && chainId !== 137) {
      onOpenSwitch();
    }
    if (address && !isSignedInQuery.data && !profileQuery) {
      onOpen();
    }
  }, [address, chainId, isOnWrongNetwork]);

  return (
    <VStack bg="#17171a" color="#ffd17cff">
      <Flex
        boxSize="full"
        align="center"
        gap="2.5"
        py="8px"
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
            pl={{ base: "5px", md: "14" }}
            pt="2"
          >
            <Image
              alt="nameLogo"
              src="/logogo.svg"
              w={{ base: "16%", md: "22%", lg: "12%" }}
            />
          </Flex>
        </NextLink>
        <HStack gap="3" display={{ base: "none", md: "flex" }}>
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
          <NextLink href="/mint" passHref>
            <Text fontWeight="normal" fontSize={{ base: "sm", md: "lg" }}>
              Mint
            </Text>
          </NextLink>
          {!address ? (
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
          ) : (
            <ProfileSubMenu />
          )}
        </HStack>
        <chakra.div display={{ base: "block", md: "none" }}>
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
      <Collapse
        startingHeight={0}
        in={dropdown}

        // bg="#17171a"
        // py="5"
        // fontSize="md"
        // w="50"
        // justifyContent="center"
      >
        <NextLink href="/articles" passHref>
          <Text
            fontWeight="normal"
            pb="1"
            textAlign="center"
            fontSize={{ base: "md", md: "lg" }}
          >
            Articles
          </Text>
        </NextLink>
        <NextLink href="/games" passHref>
          <Text
            fontWeight="normal"
            pb="1"
            textAlign="center"
            fontSize={{ base: "md", md: "lg" }}
          >
            Games
          </Text>
        </NextLink>

        <NextLink href="/dex" passHref>
          <Text
            fontWeight="normal"
            pb="1"
            textAlign="center"
            fontSize={{ base: "md", md: "lg" }}
          >
            Dex
          </Text>
        </NextLink>
        <NextLink href="/stake" passHref>
          <Text
            fontWeight="normal"
            pb="1"
            textAlign="center"
            fontSize={{ base: "md", md: "lg" }}
          >
            Stake
          </Text>
        </NextLink>
        <NextLink href="/mint" passHref>
          <Text
            fontWeight="normal"
            pb="1"
            textAlign="center"
            fontSize={{ base: "md", md: "lg" }}
          >
            Mint
          </Text>
        </NextLink>
        {!address ? (
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
        ) : (
          <VStack gap={3}>
            <Text fontWeight="600">Your Wallet Details</Text>
            <ProfileSubMenu />
          </VStack>
        )}
      </Collapse>

      <NetworkNotification isOpen={isOpenSwitch} onClose={onCloseSwitch} />
      <SignInWithLens isOpen={isOpen} onClose={onClose} />
    </VStack>
  );
};
