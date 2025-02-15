#!/bin/bash

# Install required packages
npm install mongodb @google/generative-ai dotenv typescript ts-node @types/node

# Create tsconfig.json if it doesn't exist
if [ ! -f tsconfig.json ]; then
  echo '{
    "compilerOptions": {
      "target": "es2020",
      "module": "commonjs",
      "lib": ["es2020"],
      "strict": true,
      "esModuleInterop": true,
      "skipLibCheck": true,
      "forceConsistentCasingInFileNames": true,
      "outDir": "./dist",
      "rootDir": "."
    },
    "include": ["**/*.ts"],
    "exclude": ["node_modules"]
  }' > tsconfig.json
fi

# Make the script executable
chmod +x scripts/fetch-medicinal-plants.ts 