import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import React from "react";
import AppRouter from "./routes/AppRouter";
import { theme } from "./theme/theme";

export default function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>  
  );
}