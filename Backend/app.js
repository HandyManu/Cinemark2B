import express from "express";
import cookieParser from "cookie-parser";

import clientesRoutes from "../Backend/src/routes/clientes.js";
import empleadosRoutes from "../Backend/src/routes/empleados.js";
import peliculasRoutes from "../Backend/src/routes/peliculas.js";
import registerClientesRoutes from "../Backend/src/routes/registerClientes.js";

import loginRoutes from "../Backend/src/routes/login.js";
import logoutRoutes from "../Backend/src/routes/logout.js";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use("/api/clientes", clientesRoutes);
app.use("/api/empleados", empleadosRoutes);
app.use("/api/peliculas", peliculasRoutes);
app.use("/api/registerClientes", registerClientesRoutes);
app.use("/api/login",loginRoutes);
app.use("/api/logout",logoutRoutes);

export default app;