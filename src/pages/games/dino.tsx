import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import styles from "../../styles/Game.module.css";

const Game = () => {
	const [gameOver, setGameOver] = useState(false);
	const [score, setScore] = useState(0);
	const [playerTop, setPlayerTop] = useState(250);
	const [obstacles, setObstacles] = useState<number[]>([]);

	const gameRef = useRef<HTMLDivElement>(null);
	const playerRef = useRef<HTMLDivElement>(null);

	const handleSpace = () => {
		if (!gameOver) {
			setPlayerTop(playerTop - 100);
		} else {
			resetGame();
		}
	};

	const resetGame = () => {
		setGameOver(false);
		setScore(0);
		setPlayerTop(250);
		setObstacles([]);
	};

	const addObstacle = () => {
		const newObstacle = Math.floor(Math.random() * 400) + 400;
		setObstacles([...obstacles, newObstacle]);
	};

	useEffect(() => {
		if (!gameOver) {
			const intervalId = setInterval(addObstacle, 1500);
			return () => clearInterval(intervalId);
		}
	}, [obstacles, gameOver]);

	const dataFetching = async () => {
		const response = await fetch("/api/getarticles");
		const data = await response.json();
		console.log(data);
	};

	useEffect(() => {
		dataFetching();
	}, []);

	useEffect(() => {
		if (!gameOver) {
			const checkCollision = () => {
				const playerBottom = playerTop + 50;
				obstacles.forEach((obstacle) => {
					if (
						playerTop <= obstacle + 50 &&
						playerTop >= obstacle - 50 &&
						playerRef.current?.offsetLeft === 200
					) {
						setGameOver(true);
					}
				});
			};
			const intervalId = setInterval(checkCollision, 10);
			return () => clearInterval(intervalId);
		}
	}, [playerTop, obstacles, gameOver]);

	useEffect(() => {
		if (!gameOver) {
			const increaseScore = () => {
				setScore((prevScore) => prevScore + 1);
			};
			const intervalId = setInterval(increaseScore, 500);
			return () => clearInterval(intervalId);
		}
	}, [score, gameOver]);

	return (
		<div className={styles.container} ref={gameRef}>
			<Head>
				<title>Chrome Dinosaur Game</title>
				<meta name="description" content="Chrome Dinosaur Game clone" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div
				className={`${styles.player} ${gameOver ? styles.gameOver : ""}`}
				style={{ top: playerTop }}
				ref={playerRef}
			/>
			{obstacles.map((obstacle, index) => (
				<div
					// rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					key={index}
					className={`${styles.obstacle}`}
					style={{ left: `${obstacle}px` }}
				/>
			))}
			{gameOver && (
				<div className={styles.gameOverText}>Game Over! Score: {score}</div>
			)}
			<div className={styles.scoreText}>Score: {score}</div>
			<div className={styles.instructionsText}>
				Press space to jump over the boxes!
			</div>
			<div className={styles.restartText}>
				{gameOver && "Press space to restart"}
			</div>
		</div>
	);
};

export default Game;
