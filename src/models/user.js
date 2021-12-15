const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/,
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

userSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

userSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

module.exports = model("User", userSchema);
