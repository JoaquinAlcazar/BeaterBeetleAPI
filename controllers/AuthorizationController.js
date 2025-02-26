const bcrypt = require("bcryptjs");
const roles = require("../config"); // Ajusta la ruta según tu estructura
const UserModel = require("../models/User"); // Ajusta la ruta según la estructura del proyecto
const jwt = require("jsonwebtoken"); // Asegúrate de tener instalado jsonwebtoken
const config = require("../config"); // Asegúrate de tener un archivo config.js con la clave secreta
const User = require("../models/User"); // Modelo de usuario

function generateAccessToken(username, userId) {
    return jwt.sign({ username, userId }, config.JWT_SECRET, { expiresIn: "1h" });
}

function encryptPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}


const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Buscar usuario en la base de datos
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ status: false, message: "Usuario no encontrado" });
        }

        // Comparar contraseñas
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ status: false, message: "Contraseña incorrecta" });
        }

        // Generar token JWT
        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET || "secreto",
            { expiresIn: "1h" }
        );

        return res.status(200).json({ status: true, message: "Login exitoso", token });
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
};

module.exports = {
    register: async (req, res) => {
        try {
            const payload = req.body;

            // Encriptar la contraseña
            const encryptedPassword = bcrypt.hashSync(payload.password, 10);
            
            // Asignar rol por defecto si no se proporciona
            let role = payload.role || roles.USER;

            // Crear usuario en la base de datos
            const user = await User.create({
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
    }, 
    login
};