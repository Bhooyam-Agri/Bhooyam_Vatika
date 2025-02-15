const fs = require('fs-extra');
const path = require('path');

async function copyImages() {
  try {
    // Source and destination directories
    const sourceDir = path.join(__dirname, '../data/images');
    const destDir = path.join(__dirname, '../public/images/plants');

    // Create destination directory if it doesn't exist
    await fs.ensureDir(destDir);

    // Check if source directory exists
    if (await fs.pathExists(sourceDir)) {
      // Copy images from source to destination
      await fs.copy(sourceDir, destDir, {
        overwrite: true,
        errorOnExist: false,
      });
      console.log('Images copied successfully');
    } else {
      console.log('No images to copy - source directory does not exist');
      // Create a placeholder image
      const placeholderDir = path.join(__dirname, '../public/images');
      await fs.ensureDir(placeholderDir);
      
      // Create placeholder.jpg if it doesn't exist
      const placeholderPath = path.join(placeholderDir, 'placeholder.jpg');
      if (!(await fs.pathExists(placeholderPath))) {
        // Create an empty file as placeholder
        await fs.writeFile(placeholderPath, '');
        console.log('Created placeholder image');
      }
    }
  } catch (error) {
    console.error('Error copying images:', error);
    // Don't exit with error code as this shouldn't break the installation
  }
}

copyImages(); 