import { Flex, Text } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
	return (
		<Flex w="full" bg="#3d3d41" py="3" justifyContent="center">
			<Text color="gray.200" fontWeight="thin">
				Copyright 2023 Adebayo Olamilekan
			</Text>
		</Flex>
	);
};

export default Footer;
