export interface TimeEntryDTO {
  date: string;
  project: string;
  hours: number;
  description: string;
}

export type TimeEntryType = {
  id: number;
  date: Date;
  project: string;
  hours: number;
  description: string;
  createdAt: Date;
};
