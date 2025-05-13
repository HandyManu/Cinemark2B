import clientesModel from "../models/clientes.js";
import empleadosModel from "../models/empleados.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";

//Funcion para el login de los empleados

const loginController = {};

loginController.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let userFound;//para guardar el usuario
        let userType;//para guardar el tipo de usuario

        if(email === config.emailAdmin.email && password === config.passwordAdmin.password){
            userType = "admin";
            userFound = { _id: "admin" };
        }else{
            userFound = await clientesModel.findOne({ email });
            userType = "cliente";

            if(!userFound){
                userFound = await empleadosModel.findOne({ email });
                userType = "empleado";
            }
        }
        if(!userFound){
            console.log("user not found");
            return res.status(404).json({ message: "User not found" });
        }
        if(userType!== "admin"){
            const isMatch = await bcryptjs.compare(password, userFound.password);
            if(!isMatch){
                console.log("password not match");
                return res.status(401).json({ message: "Password not match" });
            }
        }

        // Generar el token

        jsonwebtoken.sign(
            //que voy a guardar 
            { id: userFound._id,userType},
            //secreto
            config.JWT.SECRET,
            //duracion del token 1h
            { expiresIn: config.JWT.EXPIRES_IN },
            //FUNCION FLECHA
            (error, token) => {
                if (error ) console.log(error);
                res.cookie("authToken",token)
                res.json({ message: "Logged in successfully" });
                
            }
        )


        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }

};

export default loginController;
