const {
  getUsers,
  getUser,
  createUser,
  updateUser,
} = require("../controllers/user");
const router = require("express").Router();

router.route("/").get(getUsers).post(createUser);
router.route("/:id").get(getUser).put(updateUser);

module.exports = router;
