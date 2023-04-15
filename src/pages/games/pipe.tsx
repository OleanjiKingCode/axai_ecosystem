import React from "react";

export type pipeType = {
	x: number;
	topHeight: number;
	bottomHeight: number;
};
const Pipe = ({ x, topHeight, bottomHeight }: pipeType) => {
	return (
		<div style={{ position: "relative", width: "100px", height: "500px" }}>
			<div
				style={{
					position: "absolute",
					top: 0,
					left: x,
					width: "100px",
					height: topHeight,
					backgroundColor: "green",
				}}
			/>
			<div
				style={{
					position: "absolute",
					bottom: 0,
					left: x,
					width: "100px",
					height: bottomHeight,
					backgroundColor: "green",
				}}
			/>
		</div>
	);
};

export default Pipe;
