import fs from 'fs';

// Node 18+ has Blob and standard features, let's write a simple PNG pixel filter script
// Read grace_logo.png
const inputPath = './public/grace_logo.png';
const buffer = fs.readFileSync(inputPath);

console.log('Read image size:', buffer.length);
