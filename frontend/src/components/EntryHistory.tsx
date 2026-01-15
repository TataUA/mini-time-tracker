import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import dayjs from "dayjs";
import { TimeEntry } from "../types";

interface EntryHistoryProps {
  entries?: TimeEntry[];
  loading: boolean;
}

type GroupedEntries = {
  [date: string]: TimeEntry[];
};

export default function EntryHistory({ entries, loading }: EntryHistoryProps) {
  const grouped: GroupedEntries = {};
  entries?.forEach((entry) => {
    if (!grouped[entry.date]) grouped[entry.date] = [];
    grouped[entry.date].push(entry);
  });

  const grandTotal = entries?.reduce((sum, e) => sum + e.hours, 0);

  if (loading) return <Typography align="center">Loading...</Typography>;

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Time Entries
      </Typography>

      {Object.keys(grouped)
        .sort((a, b) => dayjs(b).unix() - dayjs(a).unix())
        .map((date) => {
          const totalPerDay = grouped[date].reduce(
            (sum, e) => sum + e.hours,
            0
          );

          return (
            <Box key={date} mb={4}>
              <Typography variant="h6">
                {dayjs(date).format("DD MMM YYYY")}
              </Typography>
              <TableContainer component={Paper} sx={{ mt: 1 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          width: "30%",
                          color: (theme) => theme.palette.primary.main,
                          fontWeight: "bold",
                        }}
                      >
                        Project
                      </TableCell>
                      <TableCell
                        sx={{
                          width: "20%",
                          color: (theme) => theme.palette.primary.main,
                          fontWeight: "bold",
                        }}
                      >
                        Hours
                      </TableCell>
                      <TableCell
                        sx={{
                          width: "50%",
                          color: (theme) => theme.palette.primary.main,
                          fontWeight: "bold",
                        }}
                      >
                        Description
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {grouped[date].map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell>{entry.project}</TableCell>
                        <TableCell>{entry.hours}</TableCell>
                        <TableCell>{entry.description}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell>
                        <strong>Total:</strong>
                      </TableCell>
                      <TableCell>
                        <strong>{totalPerDay}</strong>
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          );
        })}

      <Typography variant="h6" color="primary">
        Grand Total: {grandTotal}
      </Typography>
    </Box>
  );
}
