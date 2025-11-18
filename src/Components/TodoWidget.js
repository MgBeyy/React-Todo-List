import TodoList from "./TodoList";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import EditTodoPopup from "./EditTodoPopup";
import DeleteTodoPopup from "./DeleteTodoPopup";
import { useState } from "react";

export default function TodoWidget() {
  const todos = [
    {
      key: 1,
      text: "Task 1",
      description: "Description for Task 1",
      done: true,
    },
    {
      key: 2,
      text: "Task 2",
      description: "Description for Task 2",
      done: true,
    },
    {
      key: 3,
      text: "Task 3",
      description: "Description for Task 3",
      done: false,
    },
    {
      key: 4,
      text: "Task 4",
      description: "Description for Task 4",
      done: true,
    },
  ];
  const [tasks, setTasks] = useState(todos);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTaskKey, setDeletingTaskKey] = useState(null);
  const [editPopup, setEditPopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [newTask, setNewTask] = useState({
    key: tasks.length + 1,
    text: "",
    description: "",
    done: false,
  });
  const [taskFilter, setTaskFilter] = useState("all");
  const onDoneClick = (key) => {
    setTasks(
      tasks.map((task) =>
        task.key === key ? { ...task, done: !task.done } : task
      )
    );
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
    setEditPopup(false);
    setEditingTask(null);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.key !== id);
    setTasks(updatedTasks);
    setDeletePopup(false);
  };

  const OnEditClick = (task) => {
    setEditPopup(true);
    setEditingTask(task);
  };

  const OnDeleteClick = (key) => {
    setDeletePopup(true);
    setDeletingTaskKey(key);
  };

  const onCloseEditClick = (key) => {
    setEditPopup(false);
  };

  const onCloseDeleteClick = (key) => {
    setDeletePopup(false);
  };

  return (
    <>
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
          <ButtonGroup variant="outlined" aria-label="Basic button group">
            <Button onClick={() => setTaskFilter("all")}>All</Button>
            <Button onClick={() => setTaskFilter("done")}>Done</Button>
            <Button onClick={() => setTaskFilter("todo")}>Todo</Button>
          </ButtonGroup>
        </Box>
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "0 16px 16px",
          }}
        >
          <TodoList
            filter={taskFilter}
            tasks={tasks}
            onDoneClick={onDoneClick}
            onDeleteClick={OnDeleteClick}
            onEditClick={OnEditClick}
          />
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
              if (!newTask.text) return;
              const lastKey =
                tasks.length > 0 ? tasks[tasks.length - 1].key : 0;
              const newKey = lastKey + 1;
              const newT = { ...newTask, key: newKey };
              console.log(newKey);
              console.log(newT);
              setTasks([...tasks, newT]);
              setNewTask({
                key: newKey + 1,
                text: "",
                description: "",
                done: false,
              });
            }}
          >
            Add new task
          </Button>
        </div>
      </div>
    </>
  );
}
