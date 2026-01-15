import express from "express";
import cors from "cors";
import timeEntriesRouter from "./routes/timeEntries";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/time-entries", timeEntriesRouter);

app.listen(4000, () => {
  console.log("Backend running on http://localhost:4000");
});
