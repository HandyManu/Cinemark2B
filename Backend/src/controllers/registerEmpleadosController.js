import empleadoModelo from "../models/empleados.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken"; 
import { config } from "../config.js";

const registerEmpleadosController = {};

//Funcion para el registro de los empleados
registerEmpleadosController.register = async (req, res) => {
    const { nombre,correo,contraseña,telefono,direccion,puesto,fechaContratacion,salario , activo } = req.body;
    try {
        const existingEmployee = await employeeModel.findOne({ correo });
        if (existingEmployee) {
            return res.status(400).json({ message: "Empleado ya registrado" });
        }
        const passwordHash  = await bcryptjs.hash(password,10);

        const newEmpleado = new empleadoModelo({
            nombre,
            correo,
            contraseña: passwordHash,
            telefono,
            direccion,
            puesto,
            fechaContratacion,
            salario,
            activo: true,
        });

    } catch (error) {
        
    }
};