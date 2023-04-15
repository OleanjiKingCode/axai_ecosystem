import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogOverlay,
	Box,
	Button,
	Flex,
	Icon,
	Text,
} from "@chakra-ui/react";
import React from "react";
import { FocusableElement } from "@chakra-ui/utils";
import { RiErrorWarningFill, RiCloseLine } from "react-icons/ri";
import { utils } from "ethers";
import { useSwitchNetwork } from "wagmi";

export const NetworkNotification = ({
	onClose,
	isOpen,
}: {
	isOpen: boolean;
	onClose: () => void;
}) => {
	const cancelRef = React.useRef<FocusableElement>(null);

	const NETWORK_DATA = {
		name: "Polygon",
		chainId: utils.hexValue(1),
		chainNoHex: 80001,
		chainName: "Polygon Mumbai Testnet",
		nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
		rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
		blockExplorerUrls: ["https://mumbai.polygonscan.com"],
	};
	const { chainNoHex } = NETWORK_DATA;
	const { switchNetwork, isSuccess } = useSwitchNetwork();

	const handleNetworkSwitch = () => {
		if (switchNetwork) switchNetwork(chainNoHex);
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
						<Text flex="1" fontSize="xl" fontWeight="black">
							Switch Network
						</Text>
						<Icon
							cursor="pointer"
							fontSize="3xl"
							fontWeight={600}
							as={RiCloseLine}
							onClick={() => onClose()}
						/>
					</Flex>
					<Text mt="6" w="90%" lineHeight="2">
						Your wallet is currently connected to an unsupported network. To
						continue with Polygon Mumbai, Switch the network in your wallet to
						Polygon Mumbai Testnet.
					</Text>
					<Text mt="6" w="90%" lineHeight="2">
						Switch wallet if unable to change wallet network.
					</Text>
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
						<Button onClick={handleNetworkSwitch} variant="outline">
							Switch Network
						</Button>
					</Flex>
				</Box>
			</AlertDialogContent>
		</AlertDialog>
	);
};
