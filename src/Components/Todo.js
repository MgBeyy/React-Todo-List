import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useContext } from "react";
import { TaskContext } from "../Contexts/TaskContext";

export default function Todo({ task }) {
  const { onDoneClick, onDeleteClick, onEditClick } = useContext(TaskContext);
  return (
    <Accordion
      key={task.key}
      style={{
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
      }}
    >
      <AccordionSummary
        component="div"
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div>
            <Typography
              variant="h4"
              sx={{ textDecoration: task.done ? "line-through" : "none" }}
            >
              {task.text}
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <IconButton
              aria-label="done"
              onClick={(event) => {
                event.stopPropagation();
                onDoneClick(task.key);
              }}
            >
              {task.done ? (
                <CheckCircleOutlinedIcon color="success" />
              ) : (
                <CheckCircleOutlinedIcon />
              )}
            </IconButton>
            <IconButton
              aria-label="edit"
              onClick={(event) => {
                event.stopPropagation();
                onEditClick(task);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={(event) => {
                event.stopPropagation();
                onDeleteClick(task.key);
              }}
            >
              <HighlightOffIcon />
            </IconButton>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <Typography
          variant="subtitle1"
          sx={{ textDecoration: task.done ? "line-through" : "none" }}
        >
          {task.description}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}
