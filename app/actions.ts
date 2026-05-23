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
    // Separate directories and files, and sort both lists using natural numeric ordering
    const dirs = fs.readdirSync(catPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }));

    const filesAtCategory = fs.readdirSync(catPath, { withFileTypes: true })
      .filter(dirent => dirent.isFile() && /\.(jpg|jpeg|png|webp|gif)$/i.test(dirent.name))
      .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }));

    // Process subdirectories first (subcategories)
    for (const item of dirs) {
      const subCatName = item.name.replace(/-/g, " ");
      const subCatPath = path.join(catPath, item.name);
      const subItems = fs.readdirSync(subCatPath, { withFileTypes: true })
        .filter(dirent => dirent.isFile() && /\.(jpg|jpeg|png|webp|gif)$/i.test(dirent.name))
        .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }));

      for (const file of subItems) {
        works.push({
          id: idCounter++,
          title: file.name.split('.')[0].replace(/[-_]/g, " "),
          category: catName,
          subCategory: subCatName,
          img: `/images/${encodeURIComponent(category.name)}/${encodeURIComponent(item.name)}/${encodeURIComponent(file.name)}`,
        });
      }
    }

    // Then process files directly under the category (if any)
    for (const item of filesAtCategory) {
      works.push({
        id: idCounter++,
        title: item.name.split('.')[0].replace(/[-_]/g, " "),
        category: catName,
        subCategory: null,
        img: `/images/${encodeURIComponent(category.name)}/${encodeURIComponent(item.name)}`,
      });
    }
  }
  return works;
}