const express = require('express');
const app = express ();
const UserRoutes = require("./Users/routes");
const AuthorizationRoutes = require ("./Users/routes");
const sequelize = require("./Users/db");
const User = require("./models/User");

(async () => {
    try {
        await sequelize.sync({ force: true }); // Esto recrea la base de datos
        console.log("📌 Base de datos sincronizada correctamente.");
    } catch (error) {
        console.error("❌ Error al sincronizar la base de datos:", error);
    }
})();


app.use("/user", UserRoutes);
app.use(express.json());

app.use("/", AuthorizationRoutes);

const PORT = process.env.PORT || 3000;
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

app.post("/login", (request, response) => {
    response.send({ message: "Login endpoint" });
});

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