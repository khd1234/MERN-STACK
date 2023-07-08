import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import WorkoutEditForm from "./WorkoutEditForm";

import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();

  const [edit, setEdit] = useState(false);

  const handleClick = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirmDelete) {
      return;
    }
    const response = await fetch("api/workouts/" + workout._id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <button onClick={() => setEdit((prev) => !prev)}>
        {edit ? "Hide" : "Edit"}
      </button>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>

      {edit && <WorkoutEditForm id={workout._id} setEdit={setEdit} />}
    </div>
  );
};

export default WorkoutDetails;
