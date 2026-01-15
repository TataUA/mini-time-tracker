import { ThemeProvider, CssBaseline } from "@mui/material";
import type { AppProps } from "next/app";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { lightTheme, darkTheme } from "../utils/theme";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Component
          {...pageProps}
          toggleTheme={toggleTheme}
          darkMode={darkMode}
        />
      </LocalizationProvider>
    </ThemeProvider>
  );
}
