import express from "express";
import multer from 'multer'

import peliculasController from "../controllers/peliculasController.js";

const router = express.Router();

const upload = multer({
  dest: "public/"
});

router.route("/")
.get(peliculasController.getAllPeliculas)
.post(upload.single("imagen"),peliculasController.createPelicula);


export default router;