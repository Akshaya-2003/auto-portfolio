const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(process.cwd(), 'public', 'images');

const CATEGORIES = {
  'MGBW-Garage': ['ferrari', '812', 'gts', 'bmw', 'm2', 'porsche', 'macan', 'boxster', 'mini', 'cooper'],
  'Kuber-Creatives': {
    'Lamborghini-Huracan': ['lamborghini', 'huracan'],
    'M340i': ['m340i'],
    'SLK': ['slk', 'amg']
  },
  'Other-Cars': ['temerario', 'urus', 'rubicon']
};

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// 1. Build Required Directory Structure
ensureDir(path.join(IMAGES_DIR, 'MGBW-Garage'));
ensureDir(path.join(IMAGES_DIR, 'Kuber-Creatives', 'Lamborghini-Huracan'));
ensureDir(path.join(IMAGES_DIR, 'Kuber-Creatives', 'M340i'));
ensureDir(path.join(IMAGES_DIR, 'Kuber-Creatives', 'SLK'));
ensureDir(path.join(IMAGES_DIR, 'Other-Cars'));

// 2. Traverse and Organize Image Files
if (fs.existsSync(IMAGES_DIR)) {
  const files = fs.readdirSync(IMAGES_DIR, { withFileTypes: true });

  files.forEach(file => {
    if (!file.isFile()) return; // Skip directories

    const lowerName = file.name.toLowerCase();
    const oldPath = path.join(IMAGES_DIR, file.name);
    const sanitizedName = file.name.replace(/\s+/g, '-'); // Sanitize spaces for web optimization
    let moved = false;

    // Check Kuber-Creatives (Sub-categories)
    for (const [subCat, keywords] of Object.entries(CATEGORIES['Kuber-Creatives'])) {
      if (keywords.some(kw => lowerName.includes(kw))) {
        fs.renameSync(oldPath, path.join(IMAGES_DIR, 'Kuber-Creatives', subCat, sanitizedName));
        moved = true;
        break;
      }
    }

    // Check MGBW-Garage
    if (!moved && CATEGORIES['MGBW-Garage'].some(kw => lowerName.includes(kw))) {
      fs.renameSync(oldPath, path.join(IMAGES_DIR, 'MGBW-Garage', sanitizedName));
      moved = true;
    }

    // Check Other-Cars
    if (!moved && CATEGORIES['Other-Cars'].some(kw => lowerName.includes(kw))) {
      fs.renameSync(oldPath, path.join(IMAGES_DIR, 'Other-Cars', sanitizedName));
      moved = true;
    }

    // Fallback: Drop unknown media types dynamically to Other-Cars
    if (!moved && /\.(jpg|jpeg|png|webp|gif)$/i.test(file.name)) {
      fs.renameSync(oldPath, path.join(IMAGES_DIR, 'Other-Cars', sanitizedName));
    }
  });

  console.log("Images organized and sorted successfully!");
} else {
  console.log("public/images directory does not exist.");
}