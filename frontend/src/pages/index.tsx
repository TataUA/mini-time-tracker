import { useState, useEffect } from "react";
import { Container, Typography, Box, Button } from "@mui/material";

import TimeEntryForm from "../components/TimeEntryForm";
import EntryHistory from "../components/EntryHistory";
import { getTimeEntries } from "../api/timeEntries";
import { TimeEntry } from "../types";

interface HomeProps {
  toggleTheme: () => void;
  darkMode: boolean;
}

export default function Home({ toggleTheme, darkMode }: HomeProps) {
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const data = await getTimeEntries();
      setEntries(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" color="primary">
          Mini Time Tracker
        </Typography>
        <Button variant="outlined" onClick={toggleTheme}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </Button>
      </Box>

      <TimeEntryForm onEntryCreated={fetchEntries} />
      <EntryHistory entries={entries} loading={loading} />
    </Container>
  );
}
