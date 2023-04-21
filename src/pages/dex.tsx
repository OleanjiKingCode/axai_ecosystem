import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Card,
  CardHeader,
  CardBody,
  Input,
  Heading,
  Select,
  HStack,
  Button,
  chakra,
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
      <Heading py="10"> Decntralised Exchange💸</Heading>
      <Tabs w="50%">
        <TabList>
          <Tab w="50%" _hover={{ bg: "none" }}>
            SWAP ♻️
          </Tab>
          <Tab w="50%" _hover={{ bg: "none" }}>
            LIQUIDITY 💦
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Card bg="#897537">
              <CardHeader textAlign="center">
                <Heading size="md">Swap</Heading>
              </CardHeader>
              <CardBody>
                <HStack borderWidth="1px" rounded="lg">
                  <Select
                    w="25%"
                    border="none"
                    focusBorderColor="transparent"
                    rounded="lg"
                  >
                    <option value="option1" selected>
                      Mumbai
                    </option>
                    <option value="option2">MLP</option>
                  </Select>
                  <Input
                    type="number"
                    dir="rtl"
                    border="none"
                    focusBorderColor="transparent"
                    rounded="lg"
                  />
                </HStack>
                <chakra.div mt="2" px="3" mb="10">
                  You will received 20 Mumbai tokens
                </chakra.div>
                <Button w="full">SWAP</Button>
              </CardBody>
            </Card>
          </TabPanel>
          <TabPanel>
            <Card bg="#897537">
              <CardHeader textAlign="center">
                <Heading size="md">Liquidity</Heading>
              </CardHeader>
              <CardBody>
                <HStack gap="4">
                  <Flex direction="column" w="full" gap="4">
                    <HStack borderWidth="1px" rounded="lg">
                      <chakra.span px="3">M</chakra.span>
                      <Input
                        type="number"
                        dir="rtl"
                        border="none"
                        focusBorderColor="transparent"
                        rounded="lg"
                      />
                    </HStack>
                    <HStack borderWidth="1px" rounded="lg">
                      <chakra.span px="3">MLP</chakra.span>
                      <Input
                        type="number"
                        dir="rtl"
                        border="none"
                        focusBorderColor="transparent"
                        rounded="lg"
                      />
                    </HStack>
                    <Button w="full">ADD</Button>
                  </Flex>
                  <Flex direction="column" w="full" gap="4">
                    <chakra.span pb="4">Your MLP Balance : 230</chakra.span>
                    <Input type="number" dir="rtl" py="2" rounded="lg" />
                    <Button w="full">REMOVE</Button>
                  </Flex>
                </HStack>
              </CardBody>
            </Card>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default Dex;
