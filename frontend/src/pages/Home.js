import { useState, useEffect } from "react"

// components
import WorkoutDetails from "../components/WorkoutDetails"

const Home = () => {
  const [workouts, setWorkouts] = useState(null)

  useEffect(() => {
    const fetchWorkOuts = async () => {
      const response = await fetch('/api/workouts')
      const json = await response.json()

      if (response.ok){
        setWorkouts(json)
      }
    } 

    fetchWorkOuts()
  }, [])

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map((workout) => (
          <WorkoutDetails 
            key={workout._id}
            workout={workout}
          />
        ))}
      </div>
    </div>
  )
}

export default Home