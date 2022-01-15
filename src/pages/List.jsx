import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import { getAuth } from "firebase/auth";

// import ListingItem from "../components/ListingItem";

function List() {
  const [tasks, setTasks] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [lastFetchedListing, setLastFetchedListing] = useState(null);

  const auth = getAuth();

  const params = useParams();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Get reference
        const tasksRef = collection(db, "tasks");

        // Create a query
        const q = query(tasksRef, where("userRef", "==", auth.currentUser.uid));

        // Execute query
        const querySnap = await getDocs(q);

        // const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        // setLastFetchedListing(lastVisible);

        const tasks = [];

        querySnap.forEach((doc) => {
          console.log(doc.data());
          // return tasks.push({
          //   id: doc.id,
          //   data: doc.data(),
          // });
        });

        // setTasks(tasks);
        // setLoading(false);
      } catch (error) {
        toast.error("Could not fetch tasks");
        console.log(error);
      }
    };

    fetchTasks();
  }, [params.categoryName]);

  return <div></div>;
}

export default List;
