import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutEditForm = ({ id, setEdit }) => {
  const { workouts, dispatch } = useWorkoutsContext();

  const obj = workouts && workouts.find((obj) => obj._id === id);
  const [title, setTitle] = useState(obj.title);
  const [load, setLoad] = useState(obj.load);
  const [reps, setReps] = useState(obj.reps);

  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const workout = { title, load, reps };
    const response = await fetch("api/workouts/" + id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(workout),
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setEdit((prev) => !prev);
      dispatch({ type: "UPDATE_WORKOUT", payload: json });
    }
  };

  return (
    <form className="update" onSubmit={handleUpdate}>
      <label>Excersize Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "input is-small is-danger" : "input is-small is-primary"}
        autoFocus
      />

      <label>Load (in kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes("load") ? "input is-small is-danger" : "input is-small is-primary"}
      />

      <label>Number of Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes("reps") ? "input is-small is-danger" : "input is-small is-primary"}
      />

      <button>Update</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutEditForm;
