import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function DeleteTodoPopup({ onClose, onSubmit, taskKey }) {
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
        <Typography variant="h4">Delete Todo</Typography>

        <Typography variant="subtitle1">
          Are you sure you want to delete this todo?
        </Typography>

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
          <Button onClick={() => onSubmit(taskKey)}>Delete</Button>
        </div>
      </div>
    </div>
  );
}
