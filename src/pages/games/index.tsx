import {
	Box,
	Flex,
	Heading,
	Link,
	SimpleGrid,
	VStack,
	chakra,
} from "@chakra-ui/react";
import React from "react";

const index = () => {
	return (
		<VStack spacing="8" w="full" px={{ base: "0", md: "5", lg: "8" }} py="6">
			<Heading>AXIA ECOSYSTEM GAMES</Heading>
			<Flex
				alignItems="center"
				justifyContent="center"
				flexWrap="wrap"
				w="full"
				gap="3"
				direction={{ base: "column", lg: "row" }}
			>
				<Link
					href="/bird"
					target="_blank"
					w={{ base: "80%", lg: "30%" }}
					mx={{ base: "0", lg: "10" }}
				>
					<Box
						bg="tomato"
						w="full"
						height="250px"
						overflow="hidden"
						rounded="2xl"
					>
						<Flex
							fontSize="xl"
							transition="transform 0.2s ease-in-out"
							_hover={{
								transform: "scale(1.2)",
							}}
							alignItems="center"
							justifyContent="center"
							textAlign="center"
							height="full"
						>
							<chakra.div>GAME ONE</chakra.div>
						</Flex>
					</Box>
				</Link>
				<Link
					href="/bird"
					target="_blank"
					w={{ base: "80%", lg: "30%" }}
					mx={{ base: "0", lg: "10" }}
				>
					<Box
						bg="pink"
						height="250px"
						w="full"
						overflow="hidden"
						rounded="2xl"
					>
						<Flex
							fontSize="xl"
							transition="transform 0.2s ease-in-out"
							_hover={{
								transform: "scale(1.2)",
							}}
							alignItems="center"
							justifyContent="center"
							textAlign="center"
							height="full"
						>
							<chakra.div>GAME TWO</chakra.div>
						</Flex>
					</Box>
				</Link>
				<Link
					href="/bird"
					target="_blank"
					w={{ base: "80%", lg: "30%" }}
					mx={{ base: "0", lg: "10" }}
				>
					<Box
						bg="yellow"
						w="full"
						height="250px"
						overflow="hidden"
						rounded="2xl"
					>
						<Flex
							fontSize="xl"
							transition="transform 0.2s ease-in-out"
							_hover={{
								transform: "scale(1.2)",
							}}
							alignItems="center"
							justifyContent="center"
							textAlign="center"
							height="full"
						>
							<chakra.div>GAME THREE</chakra.div>
						</Flex>
					</Box>
				</Link>
			</Flex>
		</VStack>
	);
};

export default index;
