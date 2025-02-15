import mongoose from 'mongoose';
import { readFileSync } from 'fs';
import { connectToDatabase } from '../lib/mongodb';
import { join } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = 'mongodb+srv://bhooyam:46Hpy7C0HcgwRP4l@vatika.etsci.mongodb.net/?retryWrites=true&w=majority&appName=Vatika';

async function importPlants() {
  try {
    console.log('Importing plants...');
    const response = await fetch('http://localhost:3002/api/import-plants', {
      method: 'POST'
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Import failed: ${error.error} - ${error.details || ''}`);
    }
    
    const result = await response.json();
    console.log('Import successful:', result);
  } catch (error) {
    console.error('Import failed:', error);
    process.exit(1);
  }
}

// Run the import
importPlants();