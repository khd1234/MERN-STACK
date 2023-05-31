require("dotenv").config();

const workoutRoutes = require("./routes/workouts");
const mongoose = require("mongoose");
const express = require("express");

const app = express();

// middleware
app.use(express.json()); //Middleware to access the body of post requests

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts", workoutRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for request
    app.listen(process.env.PORT, () => {
        console.log(`Connected to db & listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));


