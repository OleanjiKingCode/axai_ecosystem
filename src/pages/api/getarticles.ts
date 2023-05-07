import { spawn } from "child_process";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("here");
  const data_to_python = {
    input_text:
      "Sachin Ramesh Tendulkar is a former international cricketer from India and a former captain of the Indian national team. He is widely regarded as one of the greatest batsmen in the history of cricket. He is the highest run scorer of all time in International cricket.",
  };
  const python_process = spawn("python", [
    "./python.py",
    JSON.stringify(data_to_python),
  ]);
  let refined_data
  python_process.stdout.on("data", (data) => {
    refined_data = data
      .toString()
      .substring(data.indexOf("[{"), data.indexOf(`, "time_taken"`));
    refined_data = JSON.parse(JSON.stringify(refined_data));
    refined_data = refined_data.replace(/'/g, "");
    refined_data = refined_data.replace(/\s{2,}/g, "");
    console.log(refined_data);
  });
  res.status(200).json({ data: refined_data });
}
