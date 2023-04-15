import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { pipeType } from "./pipe";

const Pipe = dynamic(() => import("./pipe"));

const Game = () => {
	const [playerY, setPlayerY] = useState(250);
	const [score, setScore] = useState(0);
	const [gameOver, setGameOver] = useState(false);
	const [pipes, setPipes] = useState<pipeType[]>([]);

	const addPipe = () => {
		const topPipeHeight = Math.floor(Math.random() * 250) + 50;
		const bottomPipeHeight = 500 - topPipeHeight - 150;
		const newPipe = {
			topHeight: topPipeHeight,
			bottomHeight: bottomPipeHeight,
			x: 800,
		};
		setPipes([...pipes, newPipe]);
	};

	useEffect(() => {
		const intervalId = setInterval(addPipe, 2000);
		return () => clearInterval(intervalId);
	}, [pipes]);

	useEffect(() => {
		const checkCollision = () => {
			const playerTop = playerY;
			const playerBottom = playerY + 50;
			const playerRight = 100;
			const playerLeft = 0;

			pipes.forEach((pipe) => {
				const pipeTop = pipe.topHeight;
				const pipeBottom = pipe.topHeight + 150;
				const pipeRight = pipe.x + 100;
				const pipeLeft = pipe.x;

				if (
					playerRight > pipeLeft &&
					playerLeft < pipeRight &&
					(playerTop < pipeTop || playerBottom > pipeBottom)
				) {
					setGameOver(true);
				}
			});
		};

		const intervalId = setInterval(checkCollision, 10);
		return () => clearInterval(intervalId);
	}, [playerY, pipes]);

	const jump = () => {
		if (!gameOver) {
			setPlayerY(playerY - 50);
		}
	};

	useEffect(() => {
		// rome-ignore lint/suspicious/noExplicitAny: <explanation>
		const handleSpace = (event: any) => {
			if (event.code === "Space") {
				jump();
			}
		};

		window.addEventListener("keydown", handleSpace);

		return () => {
			window.removeEventListener("keydown", handleSpace);
		};
	}, [gameOver]);

	return (
		<div>
			<div>Score: {score}</div>
			<div
				style={{
					position: "absolute",
					top: playerY,
					left: "50px",
					width: "50px",
					height: "50px",
					backgroundColor: "red",
				}}
			/>
			{pipes.map((pipe, index) => (
				<Pipe
					// rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					key={index}
					x={pipe.x}
					topHeight={pipe.topHeight}
					bottomHeight={pipe.bottomHeight}
				/>
			))}
			{gameOver && <div>Game Over</div>}
		</div>
	);
};

export default Game;
