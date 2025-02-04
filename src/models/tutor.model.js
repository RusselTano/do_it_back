import mongoose from "mongoose";
import bcrypt from "bcrypt"

const tutorSchema = new mongoose.Schema({
  tutorName: {type: String, required: true},
  tutorEmail: {type:String, required: true},
  password: {type:String, required: true}
})

tutorSchema.pre("save", async function (next) {
  if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password,10)
  }
  next();
})

const Tutor = mongoose.model("Tutor", tutorSchema);
export default Tutor;