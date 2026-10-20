import { ConnectionObj } from "@/interfaces/db";
import mongoose from "mongoose";

const connection: ConnectionObj = {};

async function connectDB(): Promise<void> {
  if (connection.isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect(process.env.DB_URI || "");
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.error("Database connection error in connectDB:", error);
    throw error;
  }
}

export default connectDB;
