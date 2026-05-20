"use server";

import fs from "fs";
import path from "path";

export async function getPortfolioImages() {
  const publicImagesPath = path.join(process.cwd(), "public", "images");
  const works = [];
  let idCounter = 1;

  if (!fs.existsSync(publicImagesPath)) return [];

  // Get Main Folders
  const mainCategories = fs.readdirSync(publicImagesPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory());

  for (const category of mainCategories) {
    const catName = category.name.replace(/-/g, " "); // Transforms 'MGBW-Garage' to 'MGBW Garage'
    const catPath = path.join(publicImagesPath, category.name);
    const items = fs.readdirSync(catPath, { withFileTypes: true });

    for (const item of items) {
      if (item.isDirectory()) {
        // Parse Subcategories (e.g., Lamborghini Huracan)
        const subCatName = item.name.replace(/-/g, " ");
        const subCatPath = path.join(catPath, item.name);
        const subItems = fs.readdirSync(subCatPath, { withFileTypes: true });
        
        for (const file of subItems) {
          if (file.isFile() && /\.(jpg|jpeg|png|webp|gif)$/i.test(file.name)) {
            works.push({
              id: idCounter++,
                  title: file.name.split('.')[0].replace(/[-_]/g, " "), // Cleans both dashes and underscores
              category: catName,
              subCategory: subCatName,
                  img: `/images/${encodeURIComponent(category.name)}/${encodeURIComponent(item.name)}/${encodeURIComponent(file.name)}`,
            });
          }
        }
      } else if (item.isFile() && /\.(jpg|jpeg|png|webp|gif)$/i.test(item.name)) {
        works.push({
          id: idCounter++,
          title: item.name.split('.')[0].replace(/[-_]/g, " "),
          category: catName,
          subCategory: null,
          img: `/images/${encodeURIComponent(category.name)}/${encodeURIComponent(item.name)}`,
        });
      }
    }
  }
  return works;
}