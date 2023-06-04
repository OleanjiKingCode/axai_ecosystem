import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
	const { input_text } = req.body;

	const configuration = new Configuration({
		apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
	});

	const openai = new OpenAIApi(configuration);

	const templateText =
		"generate 10 quiz questions for where each question has misleading options with one randomly assigned as the correct option \nin JSON form of this type\n\ntype quest = {\n\tquestion: string;\nanswerOption:string;\n\toptions: {\n\tstring;\n\t}[];\n}[];\n\n\n";
	const prompt = templateText + input_text;
	const response = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: prompt,
		temperature: 0.7,
		max_tokens: 2857,
		top_p: 1,
		frequency_penalty: 0,
		presence_penalty: 0,
	});
	res.status(200).json(response.data.choices[0].text);
	return;
};
