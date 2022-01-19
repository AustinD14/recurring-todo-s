import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FolderIcon from "@mui/icons-material/Folder";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";

function tasksItem({ tasks, id, onEdit, onDelete }) {
  return (
    <List>
      <ListItem
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => {
              console.log("lol");
            }}
          >
            <CheckCircleIcon />
          </IconButton>
        }
      >
        <ListItemAvatar>
          <IconButton
            onClick={() => {
              console.log(tasks.name);
            }}
          >
            <EditIcon />
          </IconButton>
        </ListItemAvatar>
        <ListItemText primary={tasks.name} secondary={id} />
      </ListItem>
    </List>

    // <li className="categorytasks">
    //   <div className="categorytasksDetails">
    //     <p className="categorytasksName">{tasks.name}</p>
    //   </div>

    //   {onDelete && (
    //     <DeleteIcon
    //       className="removeIcon"
    //       fill="rgb(231, 76,60)"
    //       onClick={() => onDelete(tasks.id, tasks.name)}
    //     />
    //   )}

    //   {onEdit && <EditIcon className="editIcon" onClick={() => onEdit(id)} />}
    // </li>
  );
}

export default tasksItem;
