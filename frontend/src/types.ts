export interface TimeEntryDTO {
  date: string;
  project: string;
  hours: number;
  description: string;
}

export interface TimeEntry extends TimeEntryDTO {
  id: number;
  createdAt: string;
}
