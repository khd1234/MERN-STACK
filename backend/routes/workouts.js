const express = require("express");
const Workout = require("../models/workoutModel");
const requireAuth = require("../middleware/requireAuth")
const {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout
} = require("../controllers/workoutController");

const router = express.Router();

// Require auth for all workout routes
router.use(requireAuth)

// GET all workouts
router.get("/", getWorkouts);

// GET single workouts
router.get("/:id", getWorkout);

// POST a new workout
router.post("/", createWorkout);

// DELETE a workout
router.delete("/:id", deleteWorkout);

// UPDATE a workout
router.patch("/:id", updateWorkout);

module.exports = router;
