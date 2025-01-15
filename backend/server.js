import express from 'express';
import bodyParser from 'body-parser';

import authRoutes from './routes/auth.route.js';
import debugRoutes from './routes/debug.route.js';
import movieRoutes from './routes/movie.route.js';
import tvRoutes from './routes/tv.route.js';

import { ENV_VARS } from './config/envVars.js';
import { connectDB } from './config/db.js';

const app = express();
const PORT = ENV_VARS.PORT;

app.use(express.json()); // to use JSON data from req.body()

app.use(bodyParser.urlencoded({ extended: true })); // to use xxx-form-urlencoded data from req.body()

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", movieRoutes);
app.use("/api/v1/tv", tvRoutes);

app.use("/debug", debugRoutes);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
  connectDB();
});