const { DataTypes } = require("sequelize");
const sequelize = require("../Users/db"); // Ajusta la ruta si es necesario

const User = sequelize.define("User", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: "USER",
    },
    maxRound: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
    maxEggs: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
    maxKalories: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    }
}, {
    timestamps: true,
});

module.exports = { User };
