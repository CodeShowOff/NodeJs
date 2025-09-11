import dotenv from "dotenv";

if (process.env.NODE_ENV === "test") {
  dotenv.config({ path: ".env.test" });
} else {
  dotenv.config({ quiet: true }); // defaults to .env
}


// note: { quiet: true } in dotenv.config(); is not required it was just used to stop dotenv from advertising.