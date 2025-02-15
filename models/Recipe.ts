import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  ingredients: [{ type: String, required: true }],
  instructions: [{ type: String, required: true }],
  benefits: [{ type: String, required: true }],
  warnings: [{ type: String }],
  isBookmarked: { type: Boolean, default: false },
  symptoms: { type: String },
  conditions: { type: String },
  allergies: { type: String },
  preferences: { type: String },
  preparationTime: { type: String },
  category: { type: String },
  medicinalUses: [{ type: String }],
  dosage: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Recipe = mongoose.models.Recipe || mongoose.model('Recipe', recipeSchema); 