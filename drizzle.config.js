import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config(); // Load .env variables

console.log("Database URL from .env:", process.env.DRIZZLE_DB_URL);

export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DRIZZLE_DB_URL,
    ssl: true, 
  },
});
