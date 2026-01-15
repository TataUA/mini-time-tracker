import axios from "axios";
import { TimeEntry, TimeEntryDTO } from "../types";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const getTimeEntries = async (): Promise<TimeEntry[]> => {
  const { data } = await api.get("/time-entries");
  return data;
};

export const createTimeEntry = async (
  entry: TimeEntryDTO
): Promise<TimeEntry> => {
  try {
    const { data } = await api.post("/time-entries", entry);
    return data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const message = err.response?.data?.message || "Error saving entry";
      throw new Error(message);
    } else if (err instanceof Error) {
      throw err;
    } else {
      throw new Error("Error saving entry");
    }
  }
};
