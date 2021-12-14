const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

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
    minlength: [8, "Contraseña debe tener al menos 8 caracteres"],
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/,
      "Contraseña no es valida",
    ],
  },
  creado: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = model("User", userSchema);
