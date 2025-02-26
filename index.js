const express = require('express');
const cors = require('cors');
const app = express ();
const UserRoutes = require("./Users/routes");
const AuthorizationRoutes = require ("./Users/routes");
const sequelize = require("./Users/db");
const User = require("./models/User");
const { login } = require("./controllers/AuthorizationController");




(async () => {
    try {
        await sequelize.sync({ alter: true }); 
        console.log("📌 Base de datos sincronizada correctamente.");
    } catch (error) {
        console.error("❌ Error al sincronizar la base de datos:", error);
    }
})();

const corsOptions = {
    origin: "*",
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: "Content-Type",
}

app.use(cors(corsOptions));
app.use("/user", UserRoutes);
app.use(express.json());

app.use("/", AuthorizationRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT)
})

app.get("/status", (request, response)=>{
    const status = {"Status": "Running"};
    response.send(status);
});

// Rutas sin lógica aún (se pueden completar más tarde)
app.post("/signup", (request, response) => {
    response.send({ message: "Signup endpoint" });
});

app.post("/login", login);

app.get("/user", (request, response) => {
    response.send({ message: "Get user endpoint" });
});

app.patch("/user/:userId", (request, response) => {
    response.send({ message: `Update user ${request.params.userId}` });
});

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.sqlite");

app.get("/user/all", (req, res) => {
    db.all("SELECT * FROM Users", [], (err, rows) => {
        if (err) {
            console.error("Error SQL:", err);
            return res.status(500).json({ status: false, error: "Error al obtener usuarios" });
        }

        console.log("Usuarios encontrados:", rows);  // Log para depuración

        return res.status(200).json({
            status: true,
            users: rows,
        });
    });
});


app.patch("/user/change-role/:userId", (request, response) => {
    response.send({ message: `Change role for user ${request.params.userId}` });
});

app.delete("/user/:userId", (request, response) => {
    response.send({ message: `Delete user ${request.params.userId}` });
});


// Ruta para obtener maxRounds del usuario autenticado
app.get('/user/:username/maxRounds', async (req, res) => {
    const username = req.params.username;

    try {
        console.log(`Buscando maxRounds para el usuario: ${username}`);
        const user = await User.findOne({ where: { username } });

        if (!user) {
            console.log(`Usuario ${username} no encontrado.`);
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        console.log(`Usuario encontrado: ${user.username}, maxRounds: ${user.maxRounds}`);
        res.json({ maxRounds: user.maxRounds });

    } catch (error) {
        console.error("Error al obtener maxRounds:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

// Ruta para actualizar maxRounds si es necesario
app.post('/user/:username/updateMaxRounds', async (req, res) => {
    const username = req.params.username;
    const { maxRounds } = req.body;

    try {
        console.log(`Intentando actualizar maxRounds para: ${username}`);
        const user = await User.findOne({ where: { username } });

        if (!user) {
            console.log(`Usuario ${username} no encontrado.`);
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        console.log(`Usuario encontrado: ${user.username}, maxRounds: ${user.maxRound}`);

        if (maxRounds > user.maxRounds) {
            console.log(`Actualizando maxRounds de ${user.maxRounds} a ${maxRounds}`);
            await user.update({ maxRounds });
            return res.json({ message: "maxRounds actualizado correctamente" });
        } else {
            return res.json({ message: "No es necesario actualizar maxRounds" });
        }

    } catch (error) {
        console.error("Error al actualizar maxRounds:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

