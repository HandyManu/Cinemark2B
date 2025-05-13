const empleadoController = {};

import EmpleadoModel from "../models/empleados.js";

//SELECT
empleadoController.getEmpleados = async (req, res) => {
  const empleados = await EmpleadoModel.find();
  res.json(empleados);
};

//delete
empleadoController.deleteEmpleado = async (req, res) => {
  await EmpleadoModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Empleado deleted" });
};

//update
empleadoController.updateEmpleado = async (req, res) => {
  const { nombre,correo,contraseña,telefono,direccion,puesto,fechaContratacion,salario,activo } = req.body;
  const updateEmpleado = await EmpleadoModel.findByIdAndUpdate(
    req.params.id,
    {nombre,correo,contraseña,telefono,direccion,puesto,fechaContratacion,salario,activo},
    { new: true }
  );
  res.json({ message: "Empleado updated" });
};

export default empleadoController;