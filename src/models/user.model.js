import mongoose from "mongoose"; //ORM => Object relationnel mapping
import bcrypt from "bcrypt";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *          type: string
 *         email:
 *          type: string
 *         password:
 *          type: string
 */

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model("User", UserSchema);
export default User;
