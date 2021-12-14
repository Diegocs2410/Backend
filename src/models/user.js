const { Schema, model } = require("mongoose");
const { internalServerError } = require("../middlewares/message");

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Nombre es requerido"],
    trim: true,
    minlength: [3, "Nombre debe tener al menos 3 caracteres"],
  },
  email: {
    type: String,
    required: [true, "Email es requerido"],
    trim: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Email no es valido",
    ],
  },
  password: {
    type: String,
    required: [true, "Contraseña es requerida"],
    trim: true,
    minlength: [6, "Contraseña debe tener al menos 6 caracteres"],
  },
  creado: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre("save", async function () {
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    internalServerError(res, error);
  }
});

module.exports = model("User", userSchema);
