import TodoList from "./TodoList";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function TodoWidget() {
  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "10px",
        height: "85vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h1" gutterBottom style={{ textAlign: "center" }}>
        Todo List
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "& > *": {
            m: 1,
          },
        }}
      >
        <ButtonGroup variant="outlined" aria-label="Basic button group">
          <Button>All</Button>
          <Button>Done</Button>
          <Button>Todo</Button>
        </ButtonGroup>
      </Box>
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "0 16px 16px",
        }}
      >
        <TodoList />
      </div>
      <div
        style={{
          padding: "16px",
          display: "flex",
          direction: "row",
          gap: "10px",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Todo Title"
          variant="outlined"
          style={{ width: "60%" }}
        />
        <Button variant="contained" style={{ width: "40%" }}>
          Add new task
        </Button>
      </div>
    </div>
  );
}
