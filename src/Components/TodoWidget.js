import TodoList from "./TodoList";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import EditTodoPopup from "./EditTodoPopup";
import DeleteTodoPopup from "./DeleteTodoPopup";
import { useState, useEffect } from "react";
import { TaskContext } from "../Contexts/TaskContext";
import SimpleSnackbar from "./SimpleSnackbar";

export default function TodoWidget() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTaskKey, setDeletingTaskKey] = useState(null);
  const [editPopup, setEditPopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [taskFilter, setTaskFilter] = useState("all");
  const [newTask, setNewTask] = useState({
    key: tasks.length + 1,
    text: "",
    description: "",
    done: false,
  });

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);
  const [snack, setSnackbar] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbar(false);
  };

  const onDoneClick = (key) => {
    const updatedTasks = tasks.map((task) =>
      task.key === key ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const saveTaskUpdate = (id, newTask) => {
    const updatedTasks = tasks.map((todo) => {
      if (todo.key === id) {
        return {
          ...todo,
          text: newTask.text,
          description: newTask.description,
        };
      }
      return todo;
    });
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setEditPopup(false);
    setEditingTask(null);
    setSnackbar(true);
  };

  const handleAddNewTask = () => {
    if (!newTask.text) return;
    const lastKey = tasks.length > 0 ? tasks[tasks.length - 1].key : 0;
    const newKey = lastKey + 1;
    const newT = { ...newTask, key: newKey };
    setTasks([...tasks, newT]);
    localStorage.setItem("tasks", JSON.stringify([...tasks, newT]));
    setNewTask({
      key: newKey + 1,
      text: "",
      description: "",
      done: false,
    });
    setSnackbar(true);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.key !== id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setDeletePopup(false);
    setSnackbar(true);
  };

  const onCloseEditClick = (key) => {
    setEditPopup(false);
  };

  const onCloseDeleteClick = (key) => {
    setDeletePopup(false);
  };

  return (
    <>
      <SimpleSnackbar handleClose={handleClose} open={snack} />
      {editPopup && (
        <EditTodoPopup
          task={editingTask}
          onClose={onCloseEditClick}
          onSave={saveTaskUpdate}
        />
      )}
      {deletePopup && (
        <DeleteTodoPopup
          onClose={onCloseDeleteClick}
          onSubmit={deleteTask}
          taskKey={deletingTaskKey}
        />
      )}
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
          <ToggleButtonGroup
            variant="outlined"
            exclusive
            value={taskFilter}
            color="primary"
            aria-label="Basic button group"
            onChange={(e) => {
              setTaskFilter(e.target.value);
            }}
          >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="done">Done</ToggleButton>
            <ToggleButton value="todo">Todo</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "0 16px 16px",
          }}
        >
          <TaskContext.Provider
            value={{
              onDoneClick,
              onDeleteClick: (key) => {
                setDeletePopup(true);
                setDeletingTaskKey(key);
              },
              onEditClick: (task) => {
                setEditingTask(task);
                setEditPopup(true);
              },
            }}
          >
            <TodoList filter={taskFilter} tasks={tasks} />
          </TaskContext.Provider>
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
            value={newTask.text}
            style={{ width: "60%" }}
            onChange={(e) => setNewTask({ ...newTask, text: e.target.value })}
          />
          <Button
            variant="contained"
            style={{ width: "40%" }}
            onClick={() => {
              handleAddNewTask();
            }}
          >
            Add new task
          </Button>
        </div>
      </div>
    </>
  );
}
