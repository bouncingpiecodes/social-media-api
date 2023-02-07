import express from "express";
const router = express.Router();
// import all of the API routes from /api/index.js
import apiRoutes from "./api/index.js";
// add prefix of `/api` to all of the api routes imported from the `api` directory
router.use("/api", apiRoutes);

router.use((req, res) => res.send("wrong route!"));

export default router;
