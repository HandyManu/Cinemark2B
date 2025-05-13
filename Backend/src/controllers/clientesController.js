const clientesController = {};

import clientesModel from "../models/clientes.js";

//SELECT

clientesController.getClientes = async (req, res) => {
  const clientes = await clientesModel.find();
  res.json(clientes);
};

//delete
clientesController.deleteCliente = async (req, res) => {
  await clientesModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Cliente deleted" });
};

//update
clientesController.updateCliente = async (req, res) => {
  const {nombre,correo ,contraseña,telefono,direccion,activo} = req.body;
  const updateCliente = await clientesModel.findByIdAndUpdate(
    req.params.id,
    {
      nombre,
      correo,
      contraseña,
      telefono,
      direccion,
      activo
    },
    { new: true }
  );
  res.json({message: "Cliente updated"});
};  

export default clientesController;