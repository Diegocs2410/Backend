const asyncWrapper = require("../middlewares/async");
const { success, notFound } = require("../middlewares/message");
const User = require("../models/user");
const userController = {};

userController.getUsers = asyncWrapper(async (req, res) => {
  const users = await User.find();
  success(res, "Solicitud ok", users);
});

userController.getUser = asyncWrapper(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return notFound(res, "Usuario no encontrado");
  success(res, "Solicitud ok", user);
});

userController.createUser = asyncWrapper(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) return notFound(res, "El usuario ya existe");
  const newUser = await User.create({ name, email, password });
  success(res, "Usuario creado satisfactoriamente", newUser);
});

module.exports = userController;
