import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import crypto from "crypto";

import clientesModel from "../models/clientes.js";
import { config } from "../config.js";

const registerClientesController = {};

//Funcion para registrar un cliente
registerClientesController.register = async (req, res) => {
    const { nombre,correo,contraseña,telefono,direccion,activo } = req.body;
    try {
        // Verificar si el cliente ya existe
        const existingCliente = await clientesModel.findOne({ correo });
        if (existingCliente) {
            return res.status(400).json({ message: "Cliente ya registrado" });
        }

        // Crear un nuevo cliente
        const newCliente = new clientesModel({
            nombre,
            correo,
            contraseña: bcrypt.hashSync(contraseña, 10),
            telefono,
            direccion,
            activo: true,
        });

        await newCliente.save();

        const verificationCode = crypto.randomBytes(3).toString("hex");

        const tokenCode = jsonwebtoken.sign(

            { email,verificationCode },

             config.JWT.SECRET, //secreto

              {expiresIn: "3h",}
    );


    res.cookie("verificationToken", tokenCode, { maxAge: 3 * 60 * 60 * 1000 });

    //enviar el correo al cliente
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: config.email.email_user,
            pass: config.email.email_pass,
        },
    })
    const mailOptions = {
        from: config.email.email_user,
        to: correo,
        subject: "Verificación de correo",
        text: `Su código de verificación es: ${verificationCode}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log("Error al enviar el correo:", error);
        }
        console.log("Correo enviado:" + info);
        
    });
    res.json({ message: "Cliente registrado exitosamente,por favor verifica el correo " });   

    } catch (error) {
        console.log("Error al registrar el cliente:" + error);        
    }

};

//Funcion para verificar el correo del cliente
registerClientesController.verifyEmail = async (req, res) => {
    const { verificationCode } = req.body;
    const token = req.cookies.verificationToken;

    try {
        const decodedToken = jsonwebtoken.verify(token, config.JWT.SECRET);
        const { correo, verificationCode: storedcode } = decodedToken;

        if (verificationCode !== storedcode ) {
            return res.status(400).json({ message: "Código de verificación incorrecto" });
        }

        const cliente = await clientesModel.findOne({ correo });
        cliente.isVerified = true;
        await cliente.save();
        res.clearCookie("verificationToken");
        res.status(200).json({ message: "Código de verificación correcto" });

    } catch (error) {
        console.log("Error al verificar el código de verificación:" + error);

    }
}

export default registerClientesController;