const mongoose = require('mongoose');
const fs = require('fs');

const MONGODB_URI = 'mongodb+srv://bhooyam:46Hpy7C0HcgwRP4l@vatika.etsci.mongodb.net/?retryWrites=true&w=majority&appName=Vatika';

// Define the schema directly in the script
const PlantSchema = new mongoose.Schema({
    id: String,
    name: String,
    scientificName: String,
    description: String,
    uses: [String],
    regions: [String],
    conditions: [String],
    image: String,
    category: [String]
});

const Plant = mongoose.model('Plant', PlantSchema);

async function importPlants() {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // Read and parse the plant data
        const data = fs.readFileSync('plant data json.txt', 'utf8');
        const plants = JSON.parse(data);
        console.log(`Found ${plants.length} plants in file`);

        // Clear existing data
        await Plant.deleteMany({});
        console.log('Cleared existing plants from database');

        // Insert plants
        const result = await Plant.insertMany(plants);
        console.log(`Successfully imported ${result.length} plants to MongoDB`);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

importPlants();