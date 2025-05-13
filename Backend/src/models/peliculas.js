import { Schema,model } from "mongoose";

const peliculaSchema = new Schema({

    titulo: {
        type: String,
        required: true
      },
      descripcion: {
        type: String,
        required: true
      },
      director: {
        type: String,
        required: true
      },
      genero: {
        type: String,
        required: true
      },
      anio: {
        type: Number,
        required: true
      },
      duracion: {
        type: Number,
        required: true
      },
      imagen: {
        type: String,
        required: true
      }
},{
    timestamps:true,
    strict:false
})

export default model("pelicula",peliculaSchema );