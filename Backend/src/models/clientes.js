import { Schema,model } from "mongoose";

const clientesSchema = new Schema({

    nombre: {
        type: String,
        required: true
      },
      correo: {
        type: String,
        required: true
      },
      contraseña: {
        type: String,
        required: true
      },
      telefono: {
        type: String,
        required: true
      },
      direccion: {
        type: String,
        required: true
      },
      activo: {
        type: Boolean,
        required: true
      }
},{
    timestamps:true,
    strict:false
})

export default model("clientes",clientesSchema );