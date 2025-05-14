import jsonwebtoken from "jsonwebtoken"; //Token
import bcryptjs from "bcryptjs"; //Encriptar

import empleadoModelo from "../models/empleados.js"; //Modelo de empleados
import clientesModelo from "../models/clientes.js";

import { config } from "../config.js";
import { sendMail, HTMLRecoveryEmail } from "../utils/MailPasswordRecovery.js";

const passwordRecoveryController = {};

passwordRecoveryController.recovery = async (req, res) => {
    const { correo } = req.body;
    try {
        let userFound;
        let userType;

        userFound = await empleadoModelo.findOne({ correo });
        if (userFound) {
            userType = "cliente";

        } else {
            userFound = await clientesModelo.findOne({ correo });
            if (userFound) {
                userType = "empleado";
            }
        }

        if (!userFound) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const code = Math.floor(10000 + Math.random() * 90000).toString();

        const token = jsonwebtoken.sign(
            { correo, code, userType, verfied: false },
            //2-secret key
            config.JWT.secret,
            //3-¿cuando expira?
            { expiresIn: "20m" }
        );

        res.cookie("tokenRecoberyCode", token,{maxAge: 20 * 60 * 1000});

        await sendMail(
      correo,
      "Password recovery code", //Asunto
      `Your verification code is: ${code}`, //Texto
      HTMLRecoveryEmail(code) //
    );

    res.json({ message: "Verification code send" });


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });

    }
};

passwordRecoveryController.verifyCode = async (req, res) => {
    const { code } = req.body;

    try {

        const token = req.cookies.tokenRecoveryCode;

        const decoded = jsonwebtoken.verify(token, config.JWT.secret)

        if (decoded.code !== code) {
            return res.json({ message: "no se verifico tu code bb" })
        }
        const newToken = jsonwebtoken.sign(
            {
                correo: decoded.correo,
                code: decoded.code,
                userType: decoded.userType,
                verified: true
            },
            config.JWT.secret,
            { expiresIn: "2h" }
        )
        res.cookie("tokenRecoveryCode", newToken, { maxAge: 20 * 60 * 1000 })

        res.json({ message: "verificado" })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });

    }
};

passwordRecoveryController.updatePassword = async (req, res) => {
const {newPassword} = req.body; 

try {
    const token = req.cookies.tokenRecoveryCode;
    const decoded = jsonwebtoken.verify(token, config.JWT.secret);

     if (!decoded.verified){
      return res.json({message:"no se puede cambiar la contraseña"})    
    }

    const {correo, userType} = decoded;

    let user;

    if (userType === "empleado") {
        user = await empleadoModelo.findOne({ correo });
    } else {
        user = await clientesModelo.findOne({ correo });
    }

    const passwordHash = await bcryptjs.hash(newPassword, 10);

    let updatedUser;
    if(userType === "empleado") {
        updatedUser = await empleadoModelo.findByIdAndUpdate(
            {correo},
            {contraseña: passwordHash},
            {new: true} );
        
    }else if(userType === "cliente") {
        updatedUser = await clientesModelo.findByIdAndUpdate(
            {correo},
            {contraseña: passwordHash},
            {new: true} );
    }

    res.clearCookie("tokenRecoveryCode");
    res.json({ message: "Password updated successfully" });


    
} catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
    
}
};

export default passwordRecoveryController;