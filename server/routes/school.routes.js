import express from "express";
import { getCurrentLocation, getNearbySchools,searchLocationCoordinates } from "../controllers/find.controller.js";
const router = express.Router();
router.get("/schools",getNearbySchools);
router.get("/location",getCurrentLocation);
router.post("/search",searchLocationCoordinates);

export default router;