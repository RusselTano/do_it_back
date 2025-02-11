import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // Titre obligatoire
    description: { type: String, default: "" }, // Description optionnelle
    completed: { type: Boolean, default: false }, // État de la tâche
    dueDate: { type: Date }, // Date limite
    status: {
      type: String,
      enum: ["to do", "in progress", "testing", "done"],
      default: "to do",
    },
  },
  { timestamps: true } // Ajoute automatiquement createdAt et updatedAt
);

const Task = mongoose.model("Task", taskSchema);

export default Task; // Export du modèle
