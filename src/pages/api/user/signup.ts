import User from "../../../models/userSchema";
import db from "../../../utils/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method !== "POST") {
    return;
  }
  const { name, email, address, role } = req.body;
  if (!name || !email || !email.includes("@") || !address || !role) {
    res.status(422).json({
      message: "Validation Error",
    });
    return;
  }

  await db.connect();

  const alreadyAUser = await User.findOne({ email: email });

  if (alreadyAUser) {
    res.status(422).json({
      message: "This user already exists",
    });
    await db.disConnect();
    return;
  }

  const newUser = new User({
    userId: name,
    email,
    address,
    role,
    handle: name,
  });

  const user = await newUser.save();
  await db.disConnect();

  return res.status(200).json({
    status: true,
    message: "Created User Successfully",
  });
}
export default handler;
