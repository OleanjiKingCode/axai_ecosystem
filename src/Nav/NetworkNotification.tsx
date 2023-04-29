import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { FocusableElement } from "@chakra-ui/utils";
import { RiErrorWarningFill, RiCloseLine } from "react-icons/ri";
import { ethers, utils } from "ethers";
import useLogin from "@/lib/auth/useLogin";
import useLensUser from "@/lib/auth/useLensUser";
import {
  ChainId,
  useAddress,
  useChainId,
  useNetwork,
  useSigner,
} from "@thirdweb-dev/react";
import { contractAbi, contractAddress } from "@/Data/contractDetails";
import { useRouter } from "next/router";

export const NetworkNotification = ({
  onClose,
  isOpen,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const cancelRef = React.useRef<FocusableElement>(null);
  const [, switchNetwork] = useNetwork();

  const handleNetworkSwitch = () => {
    switchNetwork?.(ChainId.Polygon);
    onClose();
  };

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      size="lg"
    >
      <AlertDialogOverlay />
      <AlertDialogContent bg="#d5a03d">
        <Box p={8}>
          <Flex>
            <Icon
              cursor="pointer"
              fontSize="3xl"
              fontWeight={600}
              as={RiErrorWarningFill}
              mr={5}
            />
            <Text flex="1" fontSize="xl" fontWeight="normal">
              Switch Network To Polygon Mainnet
            </Text>
            <Icon
              cursor="pointer"
              fontSize="3xl"
              fontWeight={600}
              as={RiCloseLine}
              onClick={() => onClose()}
            />
          </Flex>
          <Flex mt="6" alignItems="center" justifyContent="center">
            <Button onClick={handleNetworkSwitch} variant="outline">
              Switch Network
            </Button>
          </Flex>
        </Box>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const SignInWithLens = ({
  onClose,
  isOpen,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const cancelRef = React.useRef<FocusableElement>(null);
  const { mutate: requestLogin } = useLogin();
  const { isSignedInQuery, profileQuery } = useLensUser();

  const handleSignIn = () => {
    requestLogin();
    if (isSignedInQuery.data) {
      onClose();
    }
  };

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      size="lg"
    >
      <AlertDialogOverlay />
      <AlertDialogContent bg="#d5a03d">
        <Box p={8}>
          <Flex>
            <Text flex="1" fontSize="xl" fontWeight="black">
              Sign In With Lens
            </Text>
            <Icon
              cursor="pointer"
              fontSize="3xl"
              fontWeight={600}
              as={RiCloseLine}
              onClick={() => onClose()}
            />
          </Flex>

          <Flex mt="6">
            <Text
              onClick={() => onClose()}
              color="primary"
              cursor="pointer"
              pt={2}
              flex="1"
              fontSize="sm"
              fontWeight="bold"
            >
              Dismiss
            </Text>
            <Button onClick={handleSignIn} variant="outline">
              Sign In
            </Button>
          </Flex>
        </Box>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const GetArticleReward = ({
  onClose,
  isOpen,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const cancelRef = React.useRef<FocusableElement>(null);
  const signer = useSigner();
  const contract = new ethers.Contract(contractAddress, contractAbi, signer);
  const chainId = useChainId();
  const [, switchNetwork] = useNetwork();
  const router = useRouter();
  const toast = useToast();
  const address = useAddress();

  const handleGetReward = async () => {
    if (!address) {
      toast({
        title: "Wallet Not Connected.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }

    if (address && chainId !== 80001) {
      switchNetwork?.(ChainId.Mumbai);
    }
    const amount = await contract?.amountCollected(address?.toString());
    const realVal = Number(ethers.utils.formatEther(amount));
    if (realVal >= 2) {
      toast({
        title: "You have collected before.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      router.push("/articles");
    }
    const collectMumbai = await contract?.collect();
    collectMumbai.wait();
    toast({
      title: "1 Mumbai token is on its way to you",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    router.push("/articles");
  };

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      size="lg"
    >
      <AlertDialogOverlay />
      <AlertDialogContent bg="#d5a03d">
        <Box p={8}>
          <Flex>
            <Text flex="1" fontSize="xl" fontWeight="black">
              Get Post Reward
            </Text>
            <Icon
              cursor="pointer"
              fontSize="3xl"
              fontWeight={600}
              as={RiCloseLine}
              onClick={() => onClose()}
            />
          </Flex>

          <Flex mt="6" py="5" alignItems="center" justifyContent="center">
            <Button onClick={handleGetReward} variant="outline">
              Collect Reward
            </Button>
          </Flex>
        </Box>
      </AlertDialogContent>
    </AlertDialog>
  );
};
