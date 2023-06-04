export type userData = {
	userId: string;
	email: string;
	handle: string;
	role: string;
	address: string;
	games: [
		{
			id: string;
			slug: string;
			datePlayed: Date;
			duration: Number;
			score: Number;
			tokens_collected: Number;
		},
	];
	articles: [
		{
			id: string;
			slug: string;
			dateTaken: Date;
			score: Number;
			tokens_Collected: Number;
			duration: Number;
		},
	];
	date: Date;
};
