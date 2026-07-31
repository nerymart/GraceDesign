import fs from 'fs';
import { PNG } from 'pngjs';

const inputPath = './public/grace_logo.png';
const outputPath = './public/grace_logo.png';
const faviconPath = './public/favicon.ico';

fs.createReadStream(inputPath)
  .pipe(new PNG({ filterType: 4 }))
  .on('parsed', function() {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const idx = (this.width * y + x) << 2;
        const r = this.data[idx];
        const g = this.data[idx + 1];
        const b = this.data[idx + 2];

        // Check if color is white / near white
        const minVal = Math.min(r, g, b);
        if (minVal > 220) {
          // Make pure white transparent
          if (r > 245 && g > 245 && b > 245) {
            this.data[idx + 3] = 0;
          } else {
            // Smooth anti-aliased edges
            const diff = (r + g + b) / 3;
            const alpha = Math.max(0, Math.min(255, (255 - diff) * 4));
            this.data[idx + 3] = Math.round(alpha);
          }
        }
      }
    }

    const outStream = fs.createWriteStream(outputPath);
    this.pack().pipe(outStream);
    outStream.on('finish', () => {
      console.log('Successfully removed background and saved transparent PNG!');
      fs.copyFileSync(outputPath, faviconPath);
    });
  });
