import { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, updateDoc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

function EditTask() {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
  });
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState(null);
  const { title, date } = formData;

  const auth = getAuth();
  const navigate = useNavigate();
  const params = useParams();
  const isMounted = useRef(true);

  useEffect(() => {
    if (task && task.userRef !== auth.currentUser.uid) {
      toast.error("You can not edit that task");
      navigate("/list");
    }
  });

  useEffect(() => {
    setLoading(true);
    const fetchTask = async () => {
      const docRef = doc(db, "tasks", params.taskId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setTask(docSnap.data());
        setFormData({ ...docSnap.data() });
        setLoading(false);
      } else {
        navigate("/list");
        toast.error("Listing does not exist");
      }
    };

    fetchTask();
  }, [params.taskId, navigate]);

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid });
        } else {
          navigate("/sign-in");
        }
      });
    }

    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formDataCopy = {
      ...formData,
    };

    const docRef = doc(db, "tasks", params.taskId);
    await updateDoc(docRef, formDataCopy);
    setLoading(false);
    toast.success("Listing saved");
    navigate(`/list`);
  };

  const onMutate = (e) => {
    let boolean = null;

    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }

    // Text/Booleans/Numbers
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };

  if (loading) {
    return "Loading...";
  }

  const onDelete = async () => {
    if (window.confirm("Are you sure you want to delete?")) {
      await deleteDoc(doc(db, "tasks", params.taskId));
      toast.success("Successfully deleted listing");
      navigate("/list");
    }
  };

  return (
    <div className="profile">
      <header className="taskHeader">
        <p className="pageHeader">Edit Task</p>
        <IconButton onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </header>

      <main>
        <form onSubmit={onSubmit}>
          <label className="formLabel">Title</label>
          <input
            className="formInputName"
            type="text"
            id="title"
            value={title}
            onChange={onMutate}
            maxLength="32"
            minLength="1"
            required
          />

          <label className="formLabel">Date</label>
          <input
            className="formInputName"
            type="date"
            id="date"
            value={date}
            onChange={onMutate}
          />

          <button type="submit" className="primaryButton createListingButton">
            Create Task
          </button>
        </form>
      </main>
    </div>
  );
}

export default EditTask;
