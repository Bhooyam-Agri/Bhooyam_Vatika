import mongoose from 'mongoose';

const PlantSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  scientificName: { type: String, required: true },
  description: { type: String, required: true },
  uses: [{ type: String }],
  regions: [{ type: String }],
  conditions: [{ type: String }],
  category: [{ type: String }]
}, {
  timestamps: true
});

export const Plant = mongoose.models.Plant || mongoose.model('Plant', PlantSchema);