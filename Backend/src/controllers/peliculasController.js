import peliculasModel from "../models/peliculas.js";
import {v2 as cloudinary} from "cloudinary";
import { config } from "../config.js";

cloudinary.config({
    cloud_name: config.cloudinary.CLOUDINARY_CLOUD_NAME,
    api_key: config.cloudinary.CLOUDINARY_API_KEY,
    api_secret: config.cloudinary.CLOUDINARY_API_SECRET
});

const PeliculasController = {};

PeliculasController.getAllPeliculas = async (req, res) => {
  const peliculas = await peliculasModel.find();
  res.json(peliculas);

}

PeliculasController.createPelicula = async (req, res) => {
  try {
    const {  titulo,descripcion,director,genero,anio,duracion} = req.body;
    let imagenUrl = "";
    if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path
                , {
                    folder: "public",
                    allowed_formats: ["jpg", "png", "jpeg"]
                }
            );
            imagenUrl = result.secure_url;
          }
    const newPelicula = new peliculasModel({
      titulo,
      descripcion,
      director,
      genero,
      anio,
      duracion,
      imagen: imagenUrl
    })
    newPelicula.save()
    res.status(201).json({message: "Pelicula creada correctamente"}); 
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Error al crear la pelicula"});
    
  }
  
};

PeliculasController.updatePelicula = async (req, res) => {
  try {
    const { titulo,descripcion,director,genero,anio,duracion} = req.body;
    let imagenUrl = "";
    if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path
                , {
                    folder: "public",
                    allowed_formats: ["jpg", "png", "jpeg"]
                }
            );
            imagenUrl = result.secure_url;
          }

          await peliculasModel.findByIdAndUpdate(req.params.id, {
            titulo,
            descripcion,
            director,
            genero,
            anio,
            duracion,
            imagen: imagenUrl
          },{new: true});

          res.status(200).json({message: "Pelicula actualizada correctamente"});
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Error al actualizar la pelicula"});
    
  }
}


export default PeliculasController;




