import { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  Alert,
  IconButton,
  Collapse,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { createTimeEntry } from "../api/timeEntries";
import { PROJECTS } from "@/constants/projects";
import { TimeEntryDTO } from "../types";

interface TimeEntryFormProps {
  onEntryCreated?: () => void;
}

export default function TimeEntryForm({ onEntryCreated }: TimeEntryFormProps) {
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [project, setProject] = useState("");
  const [hours, setHours] = useState<number | "">("");
  const [description, setDescription] = useState("");

  const [errors, setErrors] = useState<{
    date?: string;
    project?: string;
    hours?: string;
    description?: string;
  }>({});

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setErrors({});
    setError("");
    setSuccess("");

    const newErrors: typeof errors = {};

    if (!date) newErrors.date = "Date is required";
    if (!project) newErrors.project = "Project is required";
    if (!hours && hours !== 0) newErrors.hours = "Hours is required";
    else if (hours <= 0) newErrors.hours = "Hours must be positive";
    else if (hours > 24) newErrors.hours = "Maximum 24 hours per day";
    if (!description) newErrors.description = "Description is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const entry: TimeEntryDTO = {
      date: date!.format("YYYY-MM-DD"),
      project,
      hours: Number(hours),
      description,
    };

    setLoading(true);
    try {
      await createTimeEntry(entry);
      setSuccess("Time entry saved!");

      setProject("");
      setHours("");
      setDescription("");
      setDate(dayjs());

      if (onEntryCreated) onEntryCreated();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Error saving entry");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box mb={4}>
      <Typography variant="h5" mb={2}>
        Add Time Entry
      </Typography>

      <Collapse in={!!error}>
        <Alert
          severity="error"
          sx={{ mb: 2 }}
          action={
            <IconButton size="small" onClick={() => setError("")}>
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {error}
        </Alert>
      </Collapse>

      <Collapse in={!!success}>
        <Alert
          severity="success"
          sx={{ mb: 2 }}
          action={
            <IconButton size="small" onClick={() => setSuccess("")}>
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {success}
        </Alert>
      </Collapse>

      <Box display="flex" flexDirection="column" gap={2}>
        <DatePicker
          label="Date"
          value={date}
          onChange={(newValue) => setDate(newValue)}
          slotProps={{
            textField: {
              fullWidth: true,
              error: !!errors.date,
              helperText: errors.date,
              onFocus: () =>
                setErrors((prev) => ({ ...prev, date: undefined })),
            },
          }}
        />

        <TextField
          select
          label="Project"
          value={project}
          onChange={(e) => setProject(e.target.value)}
          fullWidth
          error={!!errors.project}
          helperText={errors.project}
          onFocus={() => setErrors((prev) => ({ ...prev, project: undefined }))}
        >
          {PROJECTS.map((p) => (
            <MenuItem key={p} value={p}>
              {p}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Hours"
          type="number"
          value={hours}
          onChange={(e) =>
            setHours(e.target.value === "" ? "" : Number(e.target.value))
          }
          fullWidth
          error={!!errors.hours}
          helperText={errors.hours}
          onFocus={() => setErrors((prev) => ({ ...prev, hours: undefined }))}
        />

        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={3}
          fullWidth
          error={!!errors.description}
          helperText={errors.description}
          onFocus={() =>
            setErrors((prev) => ({ ...prev, description: undefined }))
          }
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </Button>
      </Box>
    </Box>
  );
}
