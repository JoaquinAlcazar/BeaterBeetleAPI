const bcrypt = require("bcryptjs");
const roles = require("../config"); // Ajusta la ruta según tu estructura
const UserModel = require("../models/User"); // Ajusta la ruta según la estructura del proyecto
const jwt = require("jsonwebtoken"); // Asegúrate de tener instalado jsonwebtoken
const config = require("../config"); // Asegúrate de tener un archivo config.js con la clave secreta

function generateAccessToken(username, userId) {
    return jwt.sign({ username, userId }, config.JWT_SECRET, { expiresIn: "1h" });
}

function encryptPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

module.exports = {
    register: async (req, res) => {
        try {
            const payload = req.body;

            // Encriptar la contraseña
            const encryptedPassword = bcrypt.hashSync(payload.password, 10);
            
            // Asignar rol por defecto si no se proporciona
            let role = payload.role || roles.USER;

            // Crear usuario en la base de datos
            const user = await UserModel.create({
                username: payload.username,
                password: encryptedPassword,
                role: role
            });

            // Generar token de acceso
            const accessToken = generateAccessToken(user.username, user.id);

            return res.status(200).json({
                status: true,
                result: {
                    user: user.toJSON(),
                    token: accessToken,
                },
            });
        } catch (err) {
            console.error("❌ Error en el registro:", err);
            return res.status(500).json({
                status: false,
                error: err.message,
            });
        }
    }
};