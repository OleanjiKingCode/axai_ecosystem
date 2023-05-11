import mongoose from "mongoose";

type connection = {
  isConnected: any;
};
const connection: connection = {
  isConnected: undefined,
};

const connect = async () => {
  if (connection.isConnected) {
    return;
  }

  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      return;
    }
  }
  const connectURI = process.env.MONGODB_URI;
  const db = await mongoose.connect(connectURI ?? "");
  connection.isConnected = db.connections[0].readyState;
};

const disConnect = async () => {
  if (connection.isConnected) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (process.env.NODE_ENV === "production") {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log("not disconnected");
    }
  }
};

const db = { connect, disConnect };
export default db;
