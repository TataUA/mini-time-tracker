import { Router } from "express";
import {
  getTimeEntries,
  createTimeEntry,
} from "../controllers/timeEntriesController";

const router = Router();

router.get("/", getTimeEntries);
router.post("/", createTimeEntry);

export default router;
