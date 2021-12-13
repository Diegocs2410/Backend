const { getUsers, getUser, createUser } = require("../controllers/user");
const router = require("express").Router();

router.route("/").get(getUsers).post(createUser);
router.route("/:id").get(getUser);

module.exports = router;
