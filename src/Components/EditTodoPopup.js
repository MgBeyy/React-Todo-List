import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";

export default function EditTodoPopup({ onClose, onSave, task }) {
  const [currentTask, setCurrentTask] = useState(task);
  return (
    <div
      style={{
        backgroundColor: "rgba(48, 48, 48, 0.5)",
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: `white`,
          width: "30vw",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <Typography variant="h4">Edit Todo</Typography>

        <TextField
          id="outlined-basic"
          label="Todo Title"
          defaultValue={currentTask.text}
          variant="standard"
          onChange={(e) =>
            setCurrentTask({ ...currentTask, text: e.target.value })
          }
        />
        <TextField
          id="outlined-basic"
          label="Todo Description"
          defaultValue={currentTask.description}
          variant="standard"
          onChange={(e) =>
            setCurrentTask({ ...currentTask, description: e.target.value })
          }
        />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            flexDirection: "row",
            gap: "10px",
            marginTop: "30px",
          }}
        >
          <Button color="error" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => onSave(task.key, currentTask)}>Save</Button>
        </div>
      </div>
    </div>
  );
}
