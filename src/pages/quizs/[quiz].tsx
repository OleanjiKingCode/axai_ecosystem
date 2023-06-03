import { contractAbi, contractAddress } from "@/Data/contractDetails";
import { Questions, quest } from "../../Data/realQuestions";
import {
  Box,
  Heading,
  ListItem,
  Stack,
  OrderedList,
  Text,
  Button,
  chakra,
  VStack,
  Radio,
  useToast,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  useDisclosure,
  ModalOverlay,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import { config } from "@/Data/config";
import Loading from "../../Data/Loading.json";
import Lottie from "lottie-react";
import { RiInformationFill } from "react-icons/ri";
import { useAddress, useChainId, useSigner } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { ChainId, useNetwork } from "@thirdweb-dev/react";
import { extractArrayFromText } from "@/utils/extracttext";
import axios from "axios";
import { usePublicationQuery, usePublicationsQuery } from "@/graphql/generated";
import { id } from "ethers/lib/utils";
import {
  AXIA_TOKEN_ADDRESS,
  AXIA_CONTRACT_ABI,
  STAKE_REWARDS_AXIA_ABI_TOKENS,
  STAKE_REWARDS_AXIA_TOKENS,
  STAKING_CONTRACT,
  STAKING_CONTRACT_ABI,
} from "@/const/contracts";

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
const QuizPage = () => {
  const router = useRouter();
  const { quiz } = router.query;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [timeLeft, setTimeLeft] = useState(600);
  const [score, setScore] = useState(0);

  const address = useAddress();
  const [checked, setChecked] = useState("none");
  const [questionNumber, setQuestionNumber] = useState(1);
  const [startQuiz, setStartQuiz] = useState(false);
  const [endQuiz, setEndQuiz] = useState(false);
  const [reviewAnswers, setReviewAnswers] = useState(false);
  const [disableNext, setDisableNext] = useState(true);
  const [buttonText, setButtonTest] = useState("Continue");
  const [answers, setAnswers] = useState<string[]>([]);
  const [RealAnswers, setRealAnswers] = useState<string[]>([]);
  const [timeUsed, setTimeUsed] = useState("");
  const [questions, setQuestions] = useState<quest | any>();
  const [aiQuestions, setAIQuestions] = useState<quest[]>([]);
  const [isQuizReady, setQuizReady] = useState<boolean>(false);
  const signer = useSigner();
  const contract = new ethers.Contract(contractAddress, contractAbi, signer);
  const stakingContract = new ethers.Contract(
    STAKING_CONTRACT,
    STAKING_CONTRACT_ABI,
    signer
  );

  const chainId = useChainId();
  const initialRender = useRef(true);
  const [, switchNetwork] = useNetwork();

  const {
    isLoading: isLoadingPublication,
    data: publicationData,
    error: publicationError,
  } = usePublicationQuery(
    {
      request: {
        publicationId: quiz,
      },
    },
    {
      enabled: !!quiz,
    }
  );

  const shuffleAnswerOptions = (quizArray: any) => {
    for (let i = 0; i < quizArray.length; i++) {
      const options = quizArray[i].options;
      const originalAnswer = quizArray[i].answer;
      const randomIndex = Math.floor(Math.random() * options.length);

      // Swap the original answer option with the random option
      const temp = options[randomIndex];
      options[randomIndex] = options[originalAnswer.charCodeAt(0) - 65];
      options[originalAnswer.charCodeAt(0) - 65] = temp;

      // Update the answer to the new position
      quizArray[i].answer = String.fromCharCode(randomIndex + 65);

      // Update the option keys
      for (let j = 0; j < options.length; j++) {
        const optionKey = String.fromCharCode(j + 65);
        const optionValue = Object.values(options[j])[0];

        options[j] = { [optionKey]: optionValue };
      }
    }

    return quizArray;
  };

  const convertAItextToJson = (quest: any) => {
    let transformedQuest = quest.map(
      (
        item: { options: string[]; question: string; answerOption: string },
        index: number
      ) => {
        let transformedOptions = item.options.map((option, optionIndex) => {
          let optionKey = String.fromCharCode(65 + optionIndex); // Convert index to character starting from 'A'
          return { [optionKey]: option };
        });

        return {
          id: index + 1,
          question: item.question,
          answer: String.fromCharCode(
            65 + item.options.indexOf(item.answerOption)
          ), // Convert index of answerOption to character
          options: transformedOptions,
        };
      }
    );

    return transformedQuest;
  };
  const getQuiz = async () => {
    try {
      const data3 = publicationData?.publication?.metadata;
      const input_text = data3?.content.toString();
      if (input_text !== undefined) {
        const response = await axios.post("/api/getquizs", {
          input_text,
        });
        const responseData = response.data.toString();
        let trimmedString = responseData.trim();
        const jsonString = trimmedString.replace(/(\w+):/g, '"$1":');
        const json = JSON.parse(extractArrayFromText(jsonString));
        const jsonArray = JSON.parse(json);
        const result = convertAItextToJson(jsonArray);
        const rearrangedAns = shuffleAnswerOptions(result);
        setAIQuestions(rearrangedAns);
        setQuestions(rearrangedAns[0]);
        setQuizReady(true);
      }
    } catch (error) {
      console.log("error", error);
      setQuizReady(false);
    }
  };

  useEffect(() => {
    if (!isQuizReady) {
      getQuiz();
    }
  }, [publicationData, isQuizReady]);

  useEffect(() => {
    if (quiz) {
      const dataOne = window.localStorage.getItem("QUESTIONS");
      if (dataOne !== null) {
        setQuestions(JSON.parse(dataOne));
      }

      const dataTwo = window.localStorage.getItem("TIME_USED");
      if (dataTwo !== null) {
        setTimeUsed(JSON.parse(dataTwo));
      }
      const dataThree = window.localStorage.getItem("ANSWERS");
      if (dataThree !== null) {
        setAnswers(JSON.parse(dataThree));
      }
      const dataFour = window.localStorage.getItem("BTN_TEXT");
      if (dataFour !== null) {
        setButtonTest(JSON.parse(dataFour));
      }
      const dataFive = window.localStorage.getItem("DISABLE_NEXT");
      if (dataFive !== null) {
        setDisableNext(JSON.parse(dataFive));
      }
      const dataSix = window.localStorage.getItem("REVIEW_ANS");
      if (dataSix !== null) {
        setReviewAnswers(JSON.parse(dataSix));
      }
      const dataSeven = window.localStorage.getItem("END_QUIZ");
      if (dataSeven !== null) {
        setEndQuiz(JSON.parse(dataSeven));
      }
      const dataEight = window.localStorage.getItem("START_QUIZ");
      if (dataEight !== null) {
        setStartQuiz(JSON.parse(dataEight));
      }
      const dataNine = window.localStorage.getItem("QUESTION_NO");
      if (dataNine !== null) {
        setQuestionNumber(JSON.parse(dataNine));
      }
      const dataTen = window.localStorage.getItem("CHECKED");
      if (dataTen !== null) {
        setChecked(JSON.parse(dataTen));
      }
      const data = window.localStorage.getItem("TIME_LEFT");
      if (data !== null) {
        setTimeLeft(JSON.parse(data));
      }
      const real = window.localStorage.getItem("REAL_ANS");
      if (real !== null) {
        setRealAnswers(JSON.parse(real));
      }
      const score_ = window.localStorage.getItem("SCORE");
      if (score_ !== null) {
        setScore(JSON.parse(score_));
      }
    }
  }, []);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    window.localStorage.setItem("QUESTIONS", JSON.stringify(questions));
    window.localStorage.setItem("TIME_USED", JSON.stringify(timeUsed));
    window.localStorage.setItem("ANSWERS", JSON.stringify(answers));
    window.localStorage.setItem("BTN_TEXT", JSON.stringify(buttonText));
    window.localStorage.setItem("DISABLE_NEXT", JSON.stringify(disableNext));
    window.localStorage.setItem("REVIEW_ANS", JSON.stringify(reviewAnswers));
    window.localStorage.setItem("REAL_ANS", JSON.stringify(RealAnswers));
    window.localStorage.setItem("END_QUIZ", JSON.stringify(endQuiz));
    window.localStorage.setItem("START_QUIZ", JSON.stringify(startQuiz));
    window.localStorage.setItem("QUESTION_NO", JSON.stringify(questionNumber));
    window.localStorage.setItem("CHECKED", JSON.stringify(checked));
    window.localStorage.setItem("TIME_LEFT", JSON.stringify(timeLeft));
    window.localStorage.setItem("SCORE", JSON.stringify(score));
  }, [
    questions,
    timeUsed,
    answers,
    buttonText,
    disableNext,
    reviewAnswers,
    endQuiz,
    startQuiz,
    questionNumber,
    checked,
    timeLeft,
    score,
  ]);

  const options = ["A", "B", "C", "D"];

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const ContiueandNext = () => {
    if (!isQuizReady) {
      setButtonTest("Loading...");
      onOpen();
    } else {
      if (!startQuiz) {
        setStartQuiz(true);
        setButtonTest("Next");
      } else if (startQuiz && questionNumber !== 10) {
        nextQuestion();
      } else if (startQuiz && questionNumber === 10) {
        setAnswers((answers) => [...answers, checked]);
        setRealAnswers((RealAnswers) => [...RealAnswers, questions.answer]);
        setQuestionNumber(questionNumber + 1);
        setTimeUsed(formatTime(600 - timeLeft));
      }
    }
  };

  const nextQuestion = () => {
    setAnswers((answers) => [...answers, checked]);
    setRealAnswers((RealAnswers) => [...RealAnswers, questions.answer]);
    const num = questionNumber + 1;
    setChecked("none");
    setQuestionNumber(num);
    setDisableNext(true);
    setQuestions(aiQuestions[num - 1]);
  };

  useEffect(() => {
    if (isQuizReady) {
      onClose();
      setButtonTest("Continue");
    }
  }, [isQuizReady]);

  useEffect(() => {
    if (startQuiz && !endQuiz) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, startQuiz, endQuiz]);

  useEffect(() => {
    if (timeLeft < 0) {
      toast({
        title: "Timer Ended.",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
      nextQuestion();
    }
    if (questionNumber > 10) {
      ///we send in the data for the answers and get the results
      setEndQuiz(true);
      setQuestionNumber(1);
      const count = RealAnswers.reduce((acc, val, index) => {
        if (val === answers[index]) {
          acc += 1;
        }
        return acc;
      }, 0);
      setScore(count);
    }
  }, [timeLeft, questionNumber]);

  const ReviewNext = () => {
    setButtonTest("Next");
    if (questionNumber !== 10) {
      const num = questionNumber + 1;
      setQuestionNumber(num);
      setQuestions(aiQuestions[num - 1]);
    } else {
      setEndQuiz(true);
      setQuestionNumber(1);
      setQuestions(aiQuestions[0]);
      setReviewAnswers(false);
      setStartQuiz(true);
    }
  };

  const BgColor = (i: number, id: string) => {
    if (RealAnswers[i] === answers[i] && id === RealAnswers[i]) {
      return "green.300";
    } else if (RealAnswers[i] !== answers[i] && id === RealAnswers[i]) {
      return "green.300";
    } else if (RealAnswers[i] !== answers[i] && id === answers[i]) {
      return "red.300";
    }
  };

  const getReward = async () => {
    if (!address) {
      toast({
        title: "Wallet Not Connected.",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
    }
    if (address && chainId !== 80001) {
      switchNetwork?.(ChainId.Mumbai);
    }
    const stakedAmount = await stakingContract?.s_balances(address?.toString());
    const stakedAmountVal = Number(ethers.utils.formatEther(stakedAmount));
    if (stakedAmountVal < 200) {
      toast({
        title:
          "You are not Qualified to collect Quiz rewards as you have not staked",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
      return;
    }
    const valueToCollect = ethers.utils.parseEther(
      (Number(score) * 50).toString()
    );
    const tx = await contract?.mint(address?.toString(), valueToCollect);
    await tx.wait();

    toast({
      title: "SAXE reward tokens are on the way to you",
      status: "warning",
      duration: 4000,
      isClosable: true,
    });
    FinishQuiz();
  };

  const FinishQuiz = () => {
    window.localStorage.removeItem("QUESTIONS");
    window.localStorage.removeItem("TIME_USED");
    window.localStorage.removeItem("ANSWERS");
    window.localStorage.removeItem("BTN_TEXT");
    window.localStorage.removeItem("DISABLE_NEXT");
    window.localStorage.removeItem("REVIEW_ANS");
    window.localStorage.removeItem("REAL_ANS");
    window.localStorage.removeItem("END_QUIZ");
    window.localStorage.removeItem("START_QUIZ");
    window.localStorage.removeItem("QUESTION_NO");
    window.localStorage.removeItem("CHECKED");
    window.localStorage.removeItem("TIME_LEFT");
    window.localStorage.removeItem("SCORE");
    router.push("/articles");
  };

  const Checked = (i: number, id: string) => {
    if (RealAnswers[i] === answers[i] && id === RealAnswers[i]) {
      return true;
    } else if (RealAnswers[i] !== answers[i] && id === RealAnswers[i]) {
      return false;
    } else if (RealAnswers[i] !== answers[i] && id === answers[i]) {
      return true;
    }
  };

  return (
    <Box w="full" px="20" pt="8" pb="5">
      {startQuiz && (
        <Flex
          color="black"
          bg="#ffefd5 "
          py="2"
          px="6"
          gap="4"
          rounded="lg"
          alignItems="center"
          lineHeight="23px"
        >
          <Text fontSize={{ base: "sm", lg: "md" }} fontWeight="semibold">
            Note:
          </Text>
          <VStack w="full" alignItems="start" fontWeight="400">
            {reviewAnswers ? (
              <Text fontSize={{ base: "xs", lg: "sm" }}>
                The Option outlined red, is your answer, that was wrong. <br />
                The right answer will be outlined with green.
                <br />
                An absence of the red outline, means you got that question
                correctly.
              </Text>
            ) : (
              <Flex w="full" justifyContent="space-between">
                <Text fontSize={{ base: "xs", lg: "sm" }}>
                  All questions must be answered. <br />
                  Your answers will automatically be submitted, if time elapses.
                </Text>
                <Button
                  bg="orange.500"
                  color="white"
                  _hover={{ bg: "orange.200", color: "black" }}
                  alignSelf="flex-end"
                  onClick={FinishQuiz}
                >
                  Finish Quiz
                </Button>
              </Flex>
            )}
          </VStack>
        </Flex>
      )}
      <Flex justifyContent="space-between" alignItems="center" pt="6">
        <Heading
          textAlign={{ base: "center", lg: "left" }}
          fontSize={{ base: "xl", lg: "2xl" }}
          pb="5"
        >
          QUIZ -{" "}
          <chakra.span fontWeight="normal">
            {publicationData?.publication?.metadata.name}
          </chakra.span>
        </Heading>
        {startQuiz && !endQuiz && (
          <Text>
            Remaining time :
            <chakra.span color="red.500" px="2" fontWeight="bold">
              {formatTime(timeLeft)}
            </chakra.span>
          </Text>
        )}
      </Flex>
      <Flex
        gap={{ lg: "15" }}
        p={{ base: 4, md: 7 }}
        bg="#ffefd5 "
        color="black"
        h="fit-content"
        rounded="lg"
        direction={{ base: "column", lg: "row" }}
      >
        <Stack order={{ base: 1, lg: 0 }} px="10" w="full" gap="2" pb="5">
          {!startQuiz && !endQuiz && (
            <>
              <HStack>
                <RiInformationFill color="#9b6706" fontSize={20} />{" "}
                <Text fontSize={{ base: "md", lg: "lg" }} fontWeight="medium">
                  Instructions
                </Text>
              </HStack>

              <OrderedList>
                <ListItem py="1">
                  <Text fontSize={{ base: "sm", lg: "md" }} fontWeight="normal">
                    Total Number of Questions: <b>10</b>
                  </Text>
                </ListItem>
                <ListItem py="2">
                  <Text fontSize={{ base: "sm", lg: "md" }} fontWeight="normal">
                    Total time limit of <b>{formatTime(timeLeft)}</b>
                  </Text>
                </ListItem>
                <ListItem py="1">
                  <Text fontSize={{ base: "sm", lg: "md" }} fontWeight="normal">
                    Must be finished at a sitting, cannot be saved for later
                  </Text>
                </ListItem>
                <ListItem py="1">
                  <Text fontSize={{ base: "sm", lg: "md" }} fontWeight="normal">
                    Each question gives a total of <b>1 point</b>
                  </Text>
                </ListItem>
                <ListItem py="1">
                  <Text fontSize={{ base: "sm", lg: "md" }} fontWeight="normal">
                    Will not let you finish without attempting all questions
                    except in the case where your time elapses
                  </Text>
                </ListItem>
                <ListItem py="1">
                  <Text fontSize={{ base: "sm", lg: "md" }} fontWeight="normal">
                    There is a timer at the top of each question, ensure not to
                    lose track of time
                  </Text>
                </ListItem>
                <ListItem py="1">
                  <Text fontSize={{ base: "sm", lg: "md" }} fontWeight="normal">
                    One question will be displayed per page
                  </Text>
                </ListItem>
                <ListItem py="1">
                  <Text fontSize={{ base: "sm", lg: "md" }} fontWeight="normal">
                    You have to have Staked atleast 200 tokens to benefit from
                    this quiz
                  </Text>
                </ListItem>
              </OrderedList>
            </>
          )}
          {startQuiz && !endQuiz && (
            <>
              <Text fontSize={{ base: "md", lg: "lg" }} fontWeight="400">
                {`Question ${questionNumber} out of 10`}
              </Text>
              <Text
                fontSize={{ base: "md", lg: "lg" }}
                pt="2"
                fontWeight="semibold"
              >
                {`${questionNumber}. ${questions.question}`}
              </Text>
              {/* rome-ignore lint/suspicious/noExplicitAny: <explanation> */}
              {questions.options.map((item: any, i: number) => (
                <chakra.div
                  w="full"
                  // rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  key={i}
                  px="2"
                  border="2px"
                  borderColor="black"
                  rounded="md"
                >
                  <Radio
                    onChange={() => {
                      setChecked(options[i]);
                      setDisableNext(false);
                    }}
                    w="full"
                    colorScheme="orange"
                    isChecked={checked === options[i]}
                    py={2}
                    value={item.id}
                  >
                    <chakra.span px="2" fontWeight="bold">
                      {options[i]}
                    </chakra.span>
                    {item[options[i]]}
                  </Radio>
                </chakra.div>
              ))}
            </>
          )}
          {startQuiz && endQuiz && !reviewAnswers && (
            <Flex w="full" direction="column" gap="4" py="2" px="3">
              <Text
                fontSize={{ base: "sm", lg: "xl" }}
                fontWeight="medium"
                alignSelf="center"
              >
                Quiz Summary
              </Text>
              <VStack
                w="full"
                color="black"
                fontSize={{ base: "sm", lg: "md" }}
                fontWeight="400"
                spacing="2"
                alignItems="start"
              >
                <HStack w="full" justifyContent="space-between" fontSize="md">
                  <Text> Number of Questions : </Text>
                  <b>10</b>
                </HStack>
                <HStack w="full" justifyContent="space-between" fontSize="md">
                  <Text>Total TimeSpent:</Text>
                  <b>{timeUsed}</b>
                </HStack>
                <HStack w="full" justifyContent="space-between" fontSize="md">
                  <Text>Total points gotten :</Text>
                  <b>{score} </b>
                </HStack>
                <HStack w="full" justifyContent="space-between" fontSize="md">
                  <Text>Mumbai Reward:</Text>
                  <b>{score > 4 ? 1 : 0}</b>
                </HStack>
                <HStack w="full" justifyContent="space-between" fontSize="md">
                  <Text>Percentage:</Text>
                  <b>{(score / 10) * 100} %</b>
                </HStack>
                <Flex
                  w="full"
                  alignItems="center"
                  direction="column"
                  gap="3"
                  justifyContent="center"
                >
                  {score > 4 && (
                    <Button
                      py="2"
                      // cursor={!address ? "no-drop" : "pointer"}
                      fontSize="lg"
                      bg="gray.200"
                      rounded="lg"
                      px="4"
                      disabled={true}
                      color="green.500"
                      fontWeight="medium"
                      _hover={{ color: "gray.200", bg: "green.500" }}
                      onClick={() => getReward()}
                    >
                      Collect Your Rewards
                    </Button>
                  )}
                  <chakra.div
                    py="2"
                    cursor="pointer"
                    fontSize="lg"
                    bg="gray.200"
                    rounded="lg"
                    px="4"
                    color="green.500"
                    fontWeight="medium"
                    _hover={{ color: "gray.200", bg: "green.500" }}
                    onClick={() => {
                      setQuestions(aiQuestions[0]);
                      setReviewAnswers(true);
                    }}
                  >
                    Review Your Answers
                  </chakra.div>
                  <Button
                    bg="orange.500"
                    color="white"
                    _hover={{ bg: "orange.200", color: "black" }}
                    alignSelf="flex-end"
                    onClick={FinishQuiz}
                  >
                    Finish Quiz
                  </Button>
                </Flex>
              </VStack>
            </Flex>
          )}
          {reviewAnswers && (
            <>
              <Text fontSize={{ base: "md", lg: "lg" }} fontWeight="400">
                {`Question ${questionNumber} out of 10`}
              </Text>
              <Text
                fontSize={{ base: "md", lg: "lg" }}
                pt="2"
                fontWeight="semibold"
              >
                {`${questionNumber}. ${questions.question}`}
              </Text>
              {/* rome-ignore lint/suspicious/noExplicitAny: <explanation> */}
              {questions.options.map((item: any, i: number) => (
                <chakra.div
                  w="full"
                  // rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  key={i}
                  px="2"
                  border="2px"
                  borderColor={
                    BgColor(questionNumber - 1, options[i]) ?? "gray.300"
                  }
                  rounded="md"
                >
                  <Radio
                    color="black"
                    colorScheme="orange"
                    py={2}
                    w="full"
                    isChecked={Checked(questionNumber - 1, options[i])}
                    isReadOnly
                  >
                    <chakra.span px="2" fontWeight="bold">
                      {options[i]}
                    </chakra.span>
                    {item[options[i]]}
                  </Radio>
                </chakra.div>
              ))}
            </>
          )}
        </Stack>
      </Flex>
      {!endQuiz && (
        <chakra.div w="full" pt="8">
          <Button
            size="lg"
            fontSize="lg"
            rounded="md"
            px="7"
            isDisabled={startQuiz && disableNext}
            color="white"
            fontWeight="medium"
            bg="#875402"
            _hover={{ bg: "white", color: "#875402" }}
            onClick={ContiueandNext}
          >
            {buttonText}
          </Button>
        </chakra.div>
      )}

      {reviewAnswers && (
        <chakra.div w="full" pt="8">
          <Button
            size="lg"
            fontSize="lg"
            rounded="md"
            px="7"
            color="white"
            fontWeight="medium"
            bg="#875402"
            _hover={{ bg: "white", color: "#875402" }}
            onClick={ReviewNext}
          >
            {buttonText}
          </Button>
        </chakra.div>
      )}

      <Modal
        isCentered
        isOpen={isOpen}
        motionPreset="slideInBottom"
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent bg="#e9962a " color="white">
          <ModalCloseButton />
          <ModalBody>
            <Lottie
              loop={true}
              animationData={Loading}
              style={{
                height: 360,
              }}
            />
            <Text w="full" textAlign="center" fontWeight="500">
              AI is generating your Quiz <br /> Please Wait
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default QuizPage;
