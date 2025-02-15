const mongoose = require('mongoose');
const fs = require('fs').promises;
const path = require('path');

const MONGODB_URI = 'mongodb+srv://bhooyam:46Hpy7C0HcgwRP4l@vatika.etsci.mongodb.net/?retryWrites=true&w=majority&appName=Vatika';

async function importPlants() {
    try {
        // Connect to MongoDB with more detailed options
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        });
        console.log('Connected to MongoDB successfully');

        // Read file with better error handling
        console.log('Reading plant data file...');
        const filePath = path.join(__dirname, '..', 'plant data json.txt');
        const fileContent = await fs.readFile(filePath, 'utf8');
        
        // Parse JSON with error handling
        console.log('Parsing plant data...');
        const plants = JSON.parse(fileContent);
        console.log(`Found ${plants.length} plants in file`);

        // Create Schema and Model
        const plantSchema = new mongoose.Schema({
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

        // Using a try-catch for model creation
        let Plant;
        try {
            Plant = mongoose.model('Plant');
        } catch {
            Plant = mongoose.model('Plant', plantSchema);
        }

        // Clear existing data
        console.log('Clearing existing plants...');
        await Plant.deleteMany({});

        // Insert plants in batches
        console.log('Inserting plants...');
        const batchSize = 50;
        for (let i = 0; i < plants.length; i += batchSize) {
            const batch = plants.slice(i, i + batchSize);
            await Plant.insertMany(batch);
            console.log(`Imported plants ${i + 1} to ${Math.min(i + batchSize, plants.length)}`);
        }

        console.log('Import completed successfully');

    } catch (error) {
        console.error('Import failed:', error.message);
        if (error.stack) console.error(error.stack);
    } finally {
        try {
            await mongoose.disconnect();
            console.log('Disconnected from MongoDB');
        } catch (error) {
            console.error('Error disconnecting:', error.message);
        }
        process.exit();
    }
}

// Run with immediate error handling
importPlants().catch(error => {
    console.error('Top level error:', error);
    process.exit(1);
});