import { Inter } from "next/font/google";
import {
	Text,
	VStack,
	Image,
	Heading,
	chakra,
	Flex,
	Button,
} from "@chakra-ui/react";
import Services from "./features";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	return (
		<>
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
							_hover={{
								color: "#ffd17cff",
								bg: "transparent",
							}}
						>
							Join Us Today
						</Button>
					</Flex>
					<Flex w="full" alignItems="center" justifyContent="center" px="12">
						<Image src="./logo.svg" alt="Logo" w="80%" />
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
		</>
	);
}
