import { createTheme } from "@mui/material/styles";

const ink = "#141318";
const ice = "#F5F6F7";
const accent = "#5B7CFF";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: accent },
    secondary: { main: ink },
    text: { primary: ink },
    background: { default: ice },
  },
  typography: {
    fontFamily: "Inter, system-ui, -apple-system, sans-serif",
    h1: {
      fontFamily: "Playfair Display, serif",
      fontSize: "2.6rem",
      fontWeight: 700,
      lineHeight: 1.1,
    },
    h2: {
      fontFamily: "Playfair Display, serif",
      fontSize: "2rem",
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h3: {
      fontFamily: "Playfair Display, serif",
      fontSize: "1.4rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.7,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 999,
          paddingInline: 24,
          paddingBlock: 12,
        },
      },
    },
  },
});
