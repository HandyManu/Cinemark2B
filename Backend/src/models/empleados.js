import { Schema,model } from "mongoose";

const empleadosSchema = new Schema({

    nombre: {
        type: String,
        required: true
      },
      correo: {
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
      puesto: {
        type: String,
        required: true
      },
      fechaContratacion: {
        type: timestamps,
        required: true
      },
      salario: {
        type: Number,
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

export default model("empleados",empleadosSchema );