const asyncWrapper = require("../middlewares/async");
const { success } = require("../middlewares/message");
const User = require("../models/user");
const userController = {};

userController.getUsers = asyncWrapper(async (req, res) => {
  const users = await User.find();
  success(res, "success", users);
});

module.exports = userController;
