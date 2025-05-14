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
        await newEmpleado.save();

        jsonwebtoken.sign(
            //que voy a guardar
            { id:newEmpleado._id },
             //secreto
            config.JWT.SECRET, 
            //cuando expira 
            { expiresIn: config.JWT.EXPIRES_IN }, 
            (error , token) => {
                if (error) console.log(error);
                res.cookie("authToken", token);
                res.json({ message: "Employee registered successfully" });
            }
        );   

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export default registerEmpleadosController;
