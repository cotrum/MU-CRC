import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

let dbConnection;

export async function connectToServer() {
  try {
    await client.connect();
    dbConnection = client.db(process.env.DB_NAME || 'test'); // use your DB name
    console.log("Successfully connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  }
}

export function getDb() {
  return dbConnection;
}
