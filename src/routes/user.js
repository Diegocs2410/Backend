const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  login,
} = require("../controllers/user");
const router = require("express").Router();

router.route("/").get(getUsers).post(createUser);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);
router.post("/login", login);
module.exports = router;
