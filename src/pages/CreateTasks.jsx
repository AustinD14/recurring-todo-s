import { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreateTasks() {
  //TODO: ADD RECURRING TYPE
  const [formData, setFormData] = useState({
    title: "",
    date: "",
  });
  const [loading, setLoading] = useState(false);

  const { title, date } = formData;
  const auth = getAuth();
  const isMounted = useRef(true);
  const navigate = useNavigate();

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

    const docRef = await addDoc(collection(db, "tasks"), formDataCopy);
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


  return (
    <div className="profile">
      <header>
        <p className="pageHeader">Create Task</p>
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
            required
          />

          <button type="submit" className="primaryButton createListingButton">
            Create Task
          </button>
        </form>
      </main>
    </div>
  );
}

export default CreateTasks;
