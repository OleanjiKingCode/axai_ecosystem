import {
	Flex,
	Card,
	CardHeader,
	CardBody,
	Input,
	Heading,
	HStack,
	Button,
	chakra,
	VStack,
	Divider,
} from "@chakra-ui/react";
import React from "react";

export const Dex = () => {
	return (
		<Flex
			w="full"
			alignItems="center"
			justifyContent="center"
			direction="column"
			gap="5"
		>
			<Heading py="10"> Stake Tokens 🪙</Heading>
			<HStack
				w="full"
				gap="28"
				textAlign="center"
				alignItems="center"
				justifyContent="center"
			>
				<Card w="40%" bg="#897537">
					<CardHeader>
						<Heading fontSize="xl">STAKE</Heading>
					</CardHeader>
					<CardBody>
						<VStack gap="4">
							<chakra.div w="full" textAlign="start">
								Enter how many tokens you would like to stake
							</chakra.div>
							<chakra.div w="full">
								<Input type="number" dir="rtl" rounded="lg" />
								<chakra.div w="full" textAlign="end">
									Balance: 450.00
								</chakra.div>
							</chakra.div>
							<Button w="full">Stake Tokens</Button>
						</VStack>
					</CardBody>
				</Card>
				<Card w="35%" bg="#897537">
					<CardHeader>
						<Heading fontSize="xl">DETAILS</Heading>
					</CardHeader>
					<CardBody>
						<Flex direction="column" gap="3">
							<VStack gap="3">
								<Heading fontSize="lg">Staked Tokens</Heading>
								<chakra.span fontSize="md">
									You Have Staked A Total Of :
								</chakra.span>
								<chakra.span fontSize="md" fontWeight="700">
									560 Tokens
								</chakra.span>
							</VStack>
							<Divider />
							<VStack gap="3">
								<Heading fontSize="lg">Reward Tokens</Heading>
								<chakra.span fontSize="md">
									You Have Received A Total Of :
								</chakra.span>
								<chakra.span fontSize="md" fontWeight="700">
									15 Reward Tokens
								</chakra.span>
								<Button w="full">Claim Rewards</Button>
							</VStack>
						</Flex>
					</CardBody>
				</Card>
			</HStack>
		</Flex>
	);
};

export default Dex;
