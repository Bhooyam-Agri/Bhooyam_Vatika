import mongoose from 'mongoose';

const ConditionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  symptoms: [String],
  recommendedPlants: [{
    plantId: { type: String, required: true },
    effectiveness: { type: Number, min: 1, max: 5 },
    usageNotes: String
  }],
  precautions: [String],
  references: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Condition = mongoose.models.Condition || mongoose.model('Condition', ConditionSchema); 