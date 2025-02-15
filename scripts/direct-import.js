const fs = require('fs');
const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://bhooyam:46Hpy7C0HcgwRP4l@vatika.etsci.mongodb.net/?retryWrites=true&w=majority&appName=Vatika';

async function importPlants() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // Read the JSON file
        const data = fs.readFileSync('./plant data json.txt', { encoding: 'utf8' });
        const plants = JSON.parse(data);

        // Define schema
        const plantSchema = new mongoose.Schema({
            id: String,
            name: String,
            scientificName: String,
            description: String,
            uses: [String],
            regions: [String],
            conditions: [String],
            image: String
        });

        // Create model
        const Plant = mongoose.models.Plant || mongoose.model('Plant', plantSchema);

        // Delete existing plants
        await Plant.deleteMany({});
        console.log('Cleared existing plants');

        // Insert plants
        const result = await Plant.insertMany(plants);
        console.log(`Successfully imported ${result.length} plants`);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
        process.exit(0);
    }
}

importPlants();