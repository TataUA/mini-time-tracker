import { Request, Response } from "express";
import prisma from "../prisma";
import { TimeEntryDTO, TimeEntryType } from "../types";

export const getTimeEntries = async (
  _req: Request,
  res: Response<TimeEntryType[] | { message: string }>
) => {
  try {
    const entries: TimeEntryType[] = await prisma.timeEntry.findMany({
      orderBy: { date: "desc" },
    });
    res.json(entries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const createTimeEntry = async (
  req: Request<{}, {}, TimeEntryDTO>,
  res: Response<TimeEntryType | { message: string }>
) => {
  try {
    const { date, project, hours, description } = req.body;

    if (!date || !project || !hours || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (hours <= 0) {
      return res.status(400).json({ message: "Hours must be positive" });
    }

    const entry: TimeEntryType = await prisma.timeEntry.create({
      data: {
        date: new Date(date),
        project,
        hours,
        description,
      },
    });

    res.status(201).json(entry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
