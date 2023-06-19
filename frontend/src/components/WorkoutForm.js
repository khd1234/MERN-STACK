import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutForm = ({ formTitle, edit, id, setEdit }) => {
  const { workouts, dispatch } = useWorkoutsContext();

  const obj = workouts && workouts.find((obj) => obj._id === id);
  const titleValue = edit ? obj.title : "";
  const [title, setTitle] = useState(titleValue);

  const loadValue = edit ? obj.load : 0;
  const [load, setLoad] = useState(loadValue);

  const repsValue = edit ? obj.reps : 0;
  const [reps, setReps] = useState(repsValue);

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const workout = { title, load, reps };
    const response = await fetch("api/workouts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(workout),
    });
    const json = await response.json();
    console.log(json);
    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      setError(null);
      setTitle("");
      setLoad("");
      setReps("");
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const workout = { title, load: load, reps: reps };
    const response = await fetch("api/workouts/" + id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(workout),
    });
    const json = await response.json();
    if (response.ok) {
      setEdit((prev) => !prev);
      dispatch({ type: "UPDATE_WORKOUT", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      {formTitle && <h3>{formTitle}</h3>}

      <label>Excersize Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label>Load (in kg):</label>
      <input
        type="number"
        value={load}
        onChange={(e) => setLoad(e.target.value)}
      />

      <label>Reps:</label>
      <input
        type="number"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
      />
      {edit && <button onClick={handleUpdate}>Update</button>}
      {!edit && <button>Add Workout</button>}
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
