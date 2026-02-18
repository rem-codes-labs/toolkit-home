import { createTheme } from "@mui/material/styles";

const ink = "#0F1724";
const paper = "#FBFAF9";
const accent = "#2563EB";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: accent },
    secondary: { main: ink },
    text: { primary: ink },
    background: { default: paper },
  },
  typography: {
    fontFamily: "Inter, system-ui, -apple-system, sans-serif",
    h1: { fontSize: "2.6rem", fontWeight: 600, lineHeight: 1.1 },
    h2: { fontSize: "2rem", fontWeight: 600, lineHeight: 1.2 },
    h3: { fontSize: "1.4rem", fontWeight: 600 },
    body1: { fontSize: "1rem", lineHeight: 1.7 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 12,
          paddingInline: 20,
          paddingBlock: 10,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
});
