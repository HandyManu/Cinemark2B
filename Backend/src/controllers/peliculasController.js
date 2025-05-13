const peliculasController = {};

import PeliculaModel from '../models/peliculas.js';

//SELECT
peliculasController.getPeliculas = async (req, res) => {
  const peliculas = await PeliculaModel.find();
  res.json(peliculas);
};

//insert
peliculasController.createPelicula = async (req, res) => {
  const { titulo,descripcion,director,genero,anio,duracion,imagen } =
    req.body;
  const newPelicula = new PeliculaModel({
    titulo,
    descripcion,
    director,
    genero,
    anio,
    duracion,
    imagen
  });
  await newPelicula.save();
  res.json({ message: 'Pelicula created' });
};

//delete
peliculasController.deletePelicula = async (req, res) => {
  await PeliculaModel.findByIdAndDelete(req.params.id);
  res.json({ message: 'Pelicula deleted' });
};

//update
peliculasController.updatePelicula = async (req, res) => {
  const { titulo,descripcion,director,genero,anio,duracion,imagen } =
    req.body;
  const updatePelicula = await PeliculaModel.findByIdAndUpdate(
    req.params.id,
    { titulo,descripcion,director,genero,anio,duracion,imagen },
    { new: true }
  );
  res.json({ message: 'Pelicula updated' });
};


export default peliculasController;