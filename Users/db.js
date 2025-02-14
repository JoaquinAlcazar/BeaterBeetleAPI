const { Sequelize } = require("sequelize");

// Configuración de SQLite3
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite" // Archivo donde se guardarán los datos
});

module.exports = sequelize;
