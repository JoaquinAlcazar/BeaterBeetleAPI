const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController"); // ✅ Asegúrate de que esta ruta es correcta
const AuthorizationController = require("../controllers/AuthorizationController");
const IsAuthenticatedMiddleware = require("../common/middlewares/IsAuthenticatedMiddleware");
const CheckPermissionMiddleware = require("../common/middlewares/CheckPermissionMiddleware");
const { roles } = require("../config");

router.get("/",[IsAuthenticatedMiddleware.check, CheckPermissionMiddleware.has(roles.ADMIN)] , UserController.getAllUsers);
router.post( "/signup", AuthorizationController.register);

module.exports = router;
