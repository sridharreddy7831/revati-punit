import fs from 'fs';
import path from 'path';

const directory = './';
const directoriesToSearch = ['components', 'pages', '.', 'src'];
const fileExtensions = ['.tsx', '.ts', '.css', '.html'];

function processDirectory(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file === 'node_modules' || file === '.git' || file === '.gemini') continue;
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            if (dir === './' && !directoriesToSearch.includes(file)) continue;
            processDirectory(fullPath);
        } else {
            if (fileExtensions.some(ext => file.endsWith(ext))) {
                let content = fs.readFileSync(fullPath, 'utf8');
                let originalContent = content;
                
                // Fix inverted dark backgrounds
                content = content.replace(/bg-\[#FDF5E6\]/g, 'bg-[#0A1C14]');
                // Fix inverted light texts
                content = content.replace(/text-\[#0A1C14\]/g, 'text-[#FDF5E6]');
                // Fix inverted text in RSVP.tsx specifically where text was dark but needs to be light
                content = content.replace(/text-\[#4A0E0E\]/g, 'text-[#FDF5E6]');

                if (content !== originalContent) {
                    fs.writeFileSync(fullPath, content, 'utf8');
                    console.log(`Fixed colors in ${fullPath}`);
                }
            }
        }
    }
}

processDirectory(directory);
console.log('Color fix completed.');
