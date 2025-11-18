import { createContext } from "react";

export let TaskContext = createContext({
  onDoneClick: () => {},
  onDeleteClick: () => {},
  onEditClick: () => {},
});
