import { ConnectionObj } from "@/interfaces/db";
import mongoose from "mongoose";

const connection: ConnectionObj = {};

async function connectDB(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to db");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.DB_URI || "");
    connection.isConnected = db.connections[0].readyState;
    console.log("Connected to the db");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

export default connectDB;
