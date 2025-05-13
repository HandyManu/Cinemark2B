import express from "express";
import peliculasController from "../controllers/peliculasController.js";

const router = express.Router();

router.route("/").get(peliculasController.getPeliculas)
.post(peliculasController.createPelicula)

router.route("/:id").delete(peliculasController.deletePelicula)
.put(peliculasController.updatePelicula);

export default router;