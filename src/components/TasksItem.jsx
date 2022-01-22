import * as React from "react";
import List from "@mui/material/List";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import { useState } from "react";

function TasksItem({ tasks, id, onEdit }) {
  function calculateDaysSince(date) {
    let startingDate = new Date(date);
    startingDate = new Date(
      startingDate.getTime() + startingDate.getTimezoneOffset() * 60000
    );

    const currentDate = new Date();

    const Difference_In_Time =
      (startingDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24);

    return Difference_In_Time > 0
      ? Math.ceil(Difference_In_Time)
      : Math.ceil(Difference_In_Time);
  }
  // const daysSince = calculateDaysSince();
  const [daysSince, setDaysSince] = useState(calculateDaysSince(tasks.date));


  const onClick = async (e) => {
    const currentDate = new Date().toDateString();
    e.preventDefault();
    const dateRef = doc(db, "tasks", id);
    await updateDoc(dateRef, {
      date: currentDate,
    });

    const docSnap = await getDoc(dateRef);
    if (docSnap.exists()) {
      setDaysSince(calculateDaysSince(docSnap.data().date));

    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }

    toast.success("Task Done!");
  };

  return (
    <List>
      <ListItem
        secondaryAction={
          <IconButton edge="end" aria-label="delete" onClick={onClick}>
            <CheckCircleIcon />
          </IconButton>
        }
      >
        <ListItemAvatar>
          <IconButton
            onClick={() => {
              onEdit(id);
            }}
          >
            <EditIcon />
          </IconButton>
        </ListItemAvatar>
        <ListItemText
          primary={tasks.title}
          secondary={
            daysSince > 0
              ? daysSince === 1
                ? daysSince + " day left."
                : daysSince + " days left."
              : Math.abs(daysSince) === 1 || Math.abs(daysSince) === 0
              ? Math.abs(daysSince) + " day since job last done."
              : Math.abs(daysSince) + " days since job last done."
          }
        />
      </ListItem>
    </List>
  );
}

export default TasksItem;
