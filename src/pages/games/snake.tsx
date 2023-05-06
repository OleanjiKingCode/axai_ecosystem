import { useState, useEffect, useRef } from "react";
import {
  Button,
  useInterval,
  Text,
  HStack,
  Icon,
  VStack,
  Flex,
  Box,
  useDisclosure,
  AlertDialog,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { Kbd } from "@chakra-ui/react";
import {
  RiArrowDownLine,
  RiArrowLeftLine,
  RiArrowRightLine,
  RiArrowUpLine,
  RiCloseLine,
  RiStarFill,
  RiTrophyFill,
} from "react-icons/ri";

import { FocusableElement } from "@chakra-ui/utils";
import styles from "../../styles/Home.module.css";

type Apple = {
  x: number;
  y: number;
};

type Velocity = {
  dx: number;
  dy: number;
};

export default function SnakeGame() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const leaderboardData = [
    { name: "John", score: 100 },
    { name: "Jane", score: 95 },
    { name: "Alex", score: 90 },
    // Add more users here
  ];

  const cancelRef = useRef<FocusableElement>(null);
  // Canvas Settings
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasWidth = 1400;
  const canvasHeight = 600;
  const canvasGridSize = 30;

  // Game Settings
  const minGameSpeed = 10;
  const maxGameSpeed = 15;

  // Game State
  const [gameDelay, setGameDelay] = useState<number>(1000 / minGameSpeed);
  const [countDown, setCountDown] = useState<number>(4);
  const [running, setRunning] = useState(false);
  const [isLost, setIsLost] = useState(false);
  const [highscore, setHighscore] = useState(0);
  const [newHighscore, setNewHighscore] = useState(false);
  const [score, setScore] = useState(0);
  const [snake, setSnake] = useState<{
    head: { x: number; y: number };
    trail: Array<any>;
  }>({
    head: { x: 12, y: 9 },
    trail: [],
  });
  const [apple, setApple] = useState<Apple>({ x: -1, y: -1 });
  const [velocity, setVelocity] = useState<Velocity>({ dx: 0, dy: 0 });
  const [previousVelocity, setPreviousVelocity] = useState<Velocity>({
    dx: 0,
    dy: 0,
  });

  const clearCanvas = (ctx: CanvasRenderingContext2D) =>
    ctx.clearRect(-1, -1, canvasWidth + 2, canvasHeight + 2);

  const generateApplePosition = (): Apple => {
    const x = Math.floor(Math.random() * (canvasWidth / canvasGridSize));
    const y = Math.floor(Math.random() * (canvasHeight / canvasGridSize));
    // Check if random position interferes with snake head or trail
    if (
      (snake.head.x === x && snake.head.y === y) ||
      snake.trail.some((snakePart) => snakePart.x === x && snakePart.y === y)
    ) {
      return generateApplePosition();
    }
    return { x, y };
  };

  // Initialise state and start countdown
  const startGame = () => {
    setGameDelay(1000 / minGameSpeed);
    setIsLost(false);
    setScore(0);
    setSnake({
      head: { x: 12, y: 9 },
      trail: [],
    });
    setApple(generateApplePosition());
    setVelocity({ dx: 0, dy: -1 });
    setRunning(true);
    setNewHighscore(false);
    setCountDown(3);
  };

  // Reset state and check for highscore
  const gameOver = () => {
    if (score > highscore) {
      setHighscore(score);
      localStorage.setItem("highscore", score.toString());
      setNewHighscore(true);
    }
    setIsLost(true);
    setRunning(false);
    setVelocity({ dx: 0, dy: 0 });
    setCountDown(4);
  };

  const fillRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number
  ) => {
    ctx.fillRect(x, y, w, h);
  };

  const strokeRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number
  ) => {
    ctx.strokeRect(x + 0.5, y + 0.5, w, h);
  };

  const drawSnake = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "#8f581f";

    fillRect(
      ctx,
      snake.head.x * canvasGridSize,
      snake.head.y * canvasGridSize,
      canvasGridSize,
      canvasGridSize
    );

    strokeRect(
      ctx,
      snake.head.x * canvasGridSize,
      snake.head.y * canvasGridSize,
      canvasGridSize,
      canvasGridSize
    );

    const dotSize = 4;

    ctx.fillStyle = "black";
    ctx.fillRect(
      snake.head.x * canvasGridSize + 2,
      snake.head.y * canvasGridSize + 3,
      dotSize,
      dotSize
    );
    ctx.fillRect(
      snake.head.x * canvasGridSize + 14,
      snake.head.y * canvasGridSize + 3,
      dotSize,
      dotSize
    );

    snake.trail.forEach((snakePart) => {
      ctx.fillStyle = "#d27c24 ";

      fillRect(
        ctx,
        snakePart.x * canvasGridSize,
        snakePart.y * canvasGridSize,
        canvasGridSize,
        canvasGridSize
      );

      strokeRect(
        ctx,
        snakePart.x * canvasGridSize,
        snakePart.y * canvasGridSize,
        canvasGridSize,
        canvasGridSize
      );
    });
  };

  const drawApple = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "red"; // '#38C172' // '#F4CA64'
    ctx.strokeStyle = "transparent";

    if (
      apple &&
      typeof apple.x !== "undefined" &&
      typeof apple.y !== "undefined"
    ) {
      fillRect(
        ctx,
        apple.x * canvasGridSize,
        apple.y * canvasGridSize,
        canvasGridSize,
        canvasGridSize
      );

      strokeRect(
        ctx,
        apple.x * canvasGridSize,
        apple.y * canvasGridSize,
        canvasGridSize,
        canvasGridSize
      );
    }
  };

  // Update snake.head, snake.trail and apple positions. Check for collisions.
  const updateSnake = () => {
    // Check for collision with walls
    const nextHeadPosition = {
      x: snake.head.x + velocity.dx,
      y: snake.head.y + velocity.dy,
    };
    if (
      nextHeadPosition.x < 0 ||
      nextHeadPosition.y < 0 ||
      nextHeadPosition.x >= canvasWidth / canvasGridSize ||
      nextHeadPosition.y >= canvasHeight / canvasGridSize
    ) {
      gameOver();
    }

    // Check for collision with apple
    if (nextHeadPosition.x === apple.x && nextHeadPosition.y === apple.y) {
      setScore((prevScore) => prevScore + 1);
      setApple(generateApplePosition());
    }

    const updatedSnakeTrail = [...snake.trail, { ...snake.head }];
    // Remove trail history beyond snake trail length (score + 2)
    while (updatedSnakeTrail.length > score + 2) updatedSnakeTrail.shift();
    // Check for snake colliding with itsself
    if (
      updatedSnakeTrail.some(
        (snakePart) =>
          snakePart.x === nextHeadPosition.x &&
          snakePart.y === nextHeadPosition.y
      )
    )
      gameOver();

    // Update state
    setPreviousVelocity({ ...velocity });
    setSnake({
      head: { ...nextHeadPosition },
      trail: [...updatedSnakeTrail],
    });
  };

  // Game Hook
  useEffect(() => {
    const canvas = canvasRef?.current;
    const ctx = canvas?.getContext("2d");

    if (ctx && !isLost) {
      clearCanvas(ctx);
      drawApple(ctx);
      drawSnake(ctx);
    }
  }, [snake]);

  // Game Update Interval
  useInterval(
    () => {
      if (!isLost) {
        updateSnake();
      }
    },
    running && countDown === 0 ? gameDelay : null
  );

  // Countdown Interval
  useInterval(
    () => {
      setCountDown((prevCountDown) => prevCountDown - 1);
    },
    countDown > 0 && countDown < 4 ? 800 : null
  );

  // DidMount Hook for Highscore
  useEffect(() => {
    setHighscore(
      localStorage.getItem("highscore")
        ? parseInt(localStorage.getItem("highscore")!)
        : 0
    );
  }, []);

  // Score Hook: increase game speed starting at 16
  useEffect(() => {
    if (score > minGameSpeed && score <= maxGameSpeed) {
      setGameDelay(1000 / score);
    }
  }, [score]);

  // Event Listener: Key Presses
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        [
          "ArrowUp",
          "ArrowDown",
          "ArrowLeft",
          "ArrowRight",
          "w",
          "a",
          "s",
          "d",
        ].includes(e.key)
      ) {
        let velocity = { dx: 0, dy: 0 };

        switch (e.key) {
          case "ArrowRight":
            velocity = { dx: 1, dy: 0 };
            break;
          case "ArrowLeft":
            velocity = { dx: -1, dy: 0 };
            break;
          case "ArrowDown":
            velocity = { dx: 0, dy: 1 };
            break;
          case "ArrowUp":
            velocity = { dx: 0, dy: -1 };
            break;
          case "d":
            velocity = { dx: 1, dy: 0 };
            break;
          case "a":
            velocity = { dx: -1, dy: 0 };
            break;
          case "s":
            velocity = { dx: 0, dy: 1 };
            break;
          case "w":
            velocity = { dx: 0, dy: -1 };
            break;
          default:
            console.error("Error with handleKeyDown");
        }
        if (
          !(
            previousVelocity.dx + velocity.dx === 0 &&
            previousVelocity.dy + velocity.dy === 0
          )
        ) {
          setVelocity(velocity);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [previousVelocity]);

  return (
    <Flex
      px="10%"
      direction="row"
      w="full"
      alignItems="center"
      justifyContent="center"
      py="20"
      mb="-40"
    >
      <VStack>
        <Flex w="65%" justifyContent="space-between" alignItems="center">
          <VStack>
            <HStack w="full">
              <Icon as={RiStarFill} />
              <Text>Score: {score}</Text>
            </HStack>
            <HStack>
              <Icon as={RiTrophyFill} />
              <Text>Highscore: {highscore > score ? highscore : score} </Text>
            </HStack>
          </VStack>
          {!isLost && countDown > 0 ? (
            <Button
              onClick={startGame}
              w="fit"
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
              {countDown === 4 ? "Start Game" : countDown}
            </Button>
          ) : (
            <VStack>
              <p>How to Play?</p>
              <Flex gap={2}>
                <HStack>
                  <Kbd bg="transparent">W</Kbd>
                  <Kbd bg="transparent">A</Kbd>
                  <Kbd bg="transparent">S</Kbd>
                  <Kbd bg="transparent">D</Kbd>
                </HStack>
                <span>OR</span>
                <HStack>
                  <Icon as={RiArrowUpLine} />
                  <Icon as={RiArrowRightLine} />
                  <Icon as={RiArrowDownLine} />
                  <Icon as={RiArrowLeftLine} />
                </HStack>
              </Flex>
            </VStack>
          )}
        </Flex>

        <canvas
          ref={canvasRef}
          width={canvasWidth + 2}
          height={canvasHeight + 2}
          className={styles.canvas}
        />
      </VStack>
      <Box
        maxWidth="500px"
        mx="auto"
        borderWidth="1px"
        borderRadius="lg"
        p={4}
        shadow="md"
      >
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          Highscore Leaderboard
        </Text>
        {leaderboardData.map((user, index) => (
          <Box
            key={index}
            borderWidth="1px"
            borderRadius="md"
            p={4}
            w="100%"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            _notFirst={{ mt: 2 }}
          >
            <Text fontSize="lg" fontWeight={index < 3 ? "bold" : "normal"}>
              {`${index + 1}. ${user.name}`}
            </Text>
            <Text fontSize="lg" fontWeight={index < 3 ? "bold" : "normal"}>
              {user.score}
            </Text>
          </Box>
        ))}
      </Box>
      {isLost && (
        <AlertDialog
          motionPreset="slideInBottom"
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isOpen={isLost}
          isCentered
          size="lg"
        >
          <AlertDialogOverlay />
          <AlertDialogContent bg="#d5a03d">
            <Box p={8} w="full">
              <Flex w="full" justifyContent="center">
                <Text w="full" fontSize="xl" fontWeight="black">
                  Game Over
                </Text>
              </Flex>
              <Flex w="full" p="3" textAlign="center">
                <Text w="full">
                  {newHighscore ? (
                    <>
                      {" "}
                      <span>🎉 New Highscore 🎉</span>{" "}
                      <p> You scored: {score} </p>{" "}
                    </>
                  ) : (
                    `You scored: ${score}`
                  )}{" "}
                </Text>
              </Flex>
              <Flex mt="6" w="full" justifyContent="center" alignItems="center">
                <Button
                  w="fit"
                  py="5"
                  bg="#ffd17cff"
                  fontSize="xl"
                  borderColor="#ffd17cff"
                  borderWidth="1px"
                  _hover={{
                    color: "#ffd17cff",
                    bg: "transparent",
                  }}
                  onClick={startGame}
                >
                  {countDown === 4 ? "Restart Game" : countDown}
                </Button>
              </Flex>
            </Box>
          </AlertDialogContent>
        </AlertDialog>
        // <chakra.div className="game-overlay">
        //   <p className="large">Game Over</p>
        //   <p className="final-score">
        //     {newHighscore ? `🎉 New Highscore 🎉` : `You scored: ${score}`}
        //   </p>
        //   {!running && isLost && (
        //     <Button
        //       w="fit"
        //       py="5"
        //       bg="#ffd17cff"
        //       fontSize="xl"
        //       borderColor="#ffd17cff"
        //       borderWidth="1px"
        //       _hover={{
        //         color: "#ffd17cff",
        //         bg: "transparent",
        //       }}
        //       onClick={startGame}
        //     >
        //       {countDown === 4 ? "Restart Game" : countDown}
        //     </Button>
        //   )}
        // </chakra.div>
      )}
    </Flex>
  );
}
