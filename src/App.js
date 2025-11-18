import { Container } from "@mui/material";
import TodoWidget from "./Components/TodoWidget";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple, green } from "@mui/material/colors";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: green[900],
      },
      secondary: {
        main: purple[500],
      },
    },
    typography: {
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="md" style={{}}>
          <TodoWidget />
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
