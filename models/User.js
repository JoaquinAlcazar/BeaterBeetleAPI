const { DataTypes } = require("sequelize");
const sequelize = require("../Users/db"); // Ajusta la ruta si es necesario

const User = sequelize.define("User", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,  // Asegúrate de que esta línea está presente
        defaultValue: "USER"
    }
});

module.exports = User;
