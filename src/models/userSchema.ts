import mongoose from "mongoose";

enum Roles {
  "Artists",
  "Devs",
  "Writers",
}
const userSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    email: { type: String, required: true },
    handle: { type: String, required: true },
    role: { type: Roles, required: true },
    address: { type: String, required: true },
    games: [
      {
        id: String,
        slug: String,
        datePlayed: Date,
        duration: Number,
        score: Number,
        tokens_collected: Number,
      },
    ],
    articles: [
      {
        id: String,
        slug: String,
        dateTaken: Date,
        score: Number,
        tokens_Collected: Number,
        duration: Number,
      },
    ],
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
