import React, { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Flex,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  useClipboard,
  FlexProps,
  chakra,
  ComponentWithAs,
  Icon,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import {
  RiLogoutBoxLine,
  RiExternalLinkLine,
  RiFileCopyLine,
  RiUserFill,
} from "react-icons/ri";
import shortenAccount from "../../utils/shortenAccount";
import { FaChevronDown } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { CheckIcon } from "@chakra-ui/icons";
import useLensUser from "@/lib/auth/useLensUser";
import { useAddress, useDisconnect } from "@thirdweb-dev/react";
import { ipfsToWebLink, omitTypename } from "@/lib/helpers";
import { abbreviateName } from "@/utils/nameAbbreviator";
import { config } from "@/Data/config";
import { userData } from "@/components/datatypes";
import axios from "axios";

type SubMenuItemProps = {
  label?: string;
  action?: () => void;
  icon: IconType | ComponentWithAs<"svg">;
} & FlexProps;

const SubMenuItem = (props: SubMenuItemProps) => {
  const { icon, label, action, ...rest } = props;
  return (
    <Flex
      align="center"
      color="fadedText4"
      onClick={action}
      px="6"
      py="2.5"
      gap="2"
      cursor="pointer"
      {...rest}
    >
      <Icon as={icon} boxSize="6" />
      <Text fontWeight="bold">{label}</Text>
    </Flex>
  );
};

const ProfileSubMenu = () => {
  const address = useAddress();
  const disconnect = useDisconnect();
  const [userData, setUserData] = useState<userData>();
  const [addressId, setAddressId] = useState("");
  const { profileQuery } = useLensUser();

  const profileImage = ipfsToWebLink(
    // @ts-ignore
    profileQuery.data?.defaultProfile?.picture?.original?.url ?? ""
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/user/${address}`);
        const data = await response.data;
        setUserData(data.user);
        setAddressId(abbreviateName(data.user.userId));
      } catch (error: any) {
        setAddressId("ID");
        if (error.response && error.response.status === 404) {
          // Handle the 404 error
          console.log("User not found");
          // Perform any additional actions specific to the 404 error
        }
      }
    };
    fetchData();
  }, [address]);

  const { hasCopied, onCopy: copyAddress } = useClipboard(address as string);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        size="md"
        color="#ffd17cff"
        fontWeight="500"
        py="4"
        variant="outline"
        _hover={{ bg: "blackAlpha.300", color: "white" }}
        fontSize="sm"
        onClick={onOpen}
      >
        {profileImage !== "https://ipfs.io/ipfs/" ? (
          <img
            src={profileImage}
            alt={profileQuery?.data?.defaultProfile?.name || ""}
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
            }}
          />
        ) : (
          <Text
            bg="#363639"
            p="2"
            color="#ffd17cff"
            rounded="full"
            fontWeight="semi-bold"
          >
            {addressId}
          </Text>
        )}
        <Text pl="3"> {address && shortenAccount(address)}</Text>
      </Button>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent
          pt="5"
          pb="6"
          bg="#b1b2b1"
          color="white"
          w="355px"
          mr={{ md: "13", lg: "16" }}
        >
          <chakra.div mx="6" pb="5">
            <Text fontWeight="bold" w="full" textAlign="center">
              My Wallet
            </Text>
            <Flex mt="3" align="center" gap="2.5">
              <chakra.div pos="relative">
                {profileImage !== "https://ipfs.io/ipfs/" ? (
                  <img
                    src={profileImage}
                    alt={profileQuery?.data?.defaultProfile?.name || ""}
                    style={{
                      width: 36,
                      height: 36,
                    }}
                  />
                ) : (
                  <Text
                    bg="#363639"
                    p="2"
                    w="70px"
                    color="#ffd17cff"
                    textAlign="center"
                    rounded="md"
                    fontWeight="semi-bold"
                  >
                    {addressId}
                  </Text>
                )}
              </chakra.div>
              <Flex direction="row" align="space-between">
                <Text fontWeight="bold" maxW="110px" noOfLines={1}>
                  {profileQuery?.data?.defaultProfile
                    ? profileQuery?.data?.defaultProfile?.handle
                    : userData
                    ? userData?.userId
                    : shortenAccount(address ? address : "User")}
                </Text>

                <Icon
                  onClick={copyAddress}
                  color={hasCopied ? "green" : "white"}
                  as={hasCopied ? CheckIcon : RiFileCopyLine}
                  boxSize="4"
                />
              </Flex>
            </Flex>
          </chakra.div>

          <SubMenuItem
            label="View on PolyScan"
            action={() =>
              window.open(`https://polyscan.io/address/${address}`, "_blank")
            }
            icon={RiExternalLinkLine}
          />
          <SubMenuItem
            label="Disconnect"
            action={disconnect}
            icon={RiLogoutBoxLine}
          />
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileSubMenu;
