const { User } = require("../Users/db"); // Importamos la conexión y el modelo

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll(); // Usamos Sequelize correctamente
        return res.status(200).json({
            status: true,
            data: users,
        });
    } catch (err) {
        return res.status(500).json({
            status: false,
            error: err.message,
        });
    }
};

module.exports = {
    getAllUsers: (req, res) => {  // ⚠️ Revisa el nombre de la función
        UserModel.findAllUsers({})
            .then(users => res.status(200).json({ status: true, data: users }))
            .catch(err => res.status(500).json({ status: false, error: err }));
    }
};

