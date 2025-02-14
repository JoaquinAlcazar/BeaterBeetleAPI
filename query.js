const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.sqlite");

db.all("SELECT * FROM Users", [], (err, rows) => {
    if (err) {
        console.error("Error al obtener usuarios:", err);
        return;
    }
    console.log("Usuarios en la base de datos:", rows);
});

db.close();
