import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function EditTodoPopup() {
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
          variant="standard"
          style={{}}
        />
        <TextField
          id="outlined-basic"
          label="Todo Description"
          variant="standard"
          style={{}}
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
          <Button color="error" style={{}}>
            Cancel
          </Button>
          <Button>Save</Button>
        </div>
      </div>
    </div>
  );
}
