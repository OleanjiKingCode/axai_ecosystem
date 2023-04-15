import { useState, useEffect } from "react";
import { Flex, Box } from "@chakra-ui/react";

const ROWS = 20;
const COLS = 20;
const CELL_SIZE = 20;

const createGrid = () => {
	const grid = [];
	for (let row = 0; row < ROWS; row++) {
		const currentRow = [];
		for (let col = 0; col < COLS; col++) {
			currentRow.push(0);
		}
		grid.push(currentRow);
	}
	return grid;
};

const SnakeGame = () => {
	const [grid, setGrid] = useState(createGrid());
	const [snake, setSnake] = useState([
		{ row: Math.floor(ROWS / 2), col: Math.floor(COLS / 2) },
	]);
	const [direction, setDirection] = useState("right");

	useEffect(() => {
		const intervalId = setInterval(() => {
			moveSnake();
		}, 200);
		return () => clearInterval(intervalId);
	}, [snake]);

	const moveSnake = () => {
		const head = snake[0];
		const newHead =
			direction === "right"
				? { row: head.row, col: head.col + 1 }
				: direction === "left"
				? { row: head.row, col: head.col - 1 }
				: direction === "up"
				? { row: head.row - 1, col: head.col }
				: direction === "down"
				? { row: head.row + 1, col: head.col }
				: head;

		if (
			newHead.row < 0 ||
			newHead.col < 0 ||
			newHead.row >= ROWS ||
			newHead.col >= COLS
		) {
			console.log("Game over");
			return;
		}

		const newSnake = [newHead, ...snake.slice(0, -1)];
		setSnake(newSnake);
	};

	return (
		<Flex
			justify="center"
			align="center"
			minH="100vh"
			bg="gray.800"
			color="white"
		>
			<Box
				w={`${CELL_SIZE * COLS}px`}
				h={`${CELL_SIZE * ROWS}px`}
				bg="gray.600"
				border="2px solid white"
				position="relative"
			>
				{snake.map((cell) => (
					<Box
						key={`${cell.row}-${cell.col}`}
						w={`${CELL_SIZE}px`}
						h={`${CELL_SIZE}px`}
						bg="white"
						position="absolute"
						top={`${cell.row * CELL_SIZE}px`}
						left={`${cell.col * CELL_SIZE}px`}
					/>
				))}
			</Box>
		</Flex>
	);
};

export default SnakeGame;
