import { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreateTasks() {
  //TODO: ADD RECURRING TYPE
  const [formData, setFormData] = useState({
    name: "",
  });
  const [loading, setLoading] = useState(false);

  const { name, time } = formData;
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
      timestamp: serverTimestamp(),
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
          <label className="formLabel">Name</label>
          <input
            className="formInputName"
            type="text"
            id="name"
            value={name}
            onChange={onMutate}
            maxLength="32"
            minLength="1"
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
