import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

export default function Todo({ text }) {
  return (
    <Accordion
      style={{
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
      }}
    >
      <AccordionSummary
        // expandIcon={<ExpandMoreIcon />}
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
            <Typography variant="h4">{text}</Typography>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <IconButton aria-label="done">
              <CheckCircleOutlinedIcon />
            </IconButton>
            <IconButton aria-label="edit">
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete">
              <HighlightOffIcon />
            </IconButton>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="subtitle1">Description</Typography>
      </AccordionDetails>
    </Accordion>
  );
}
