import fs from 'fs';
import path from 'path';

const directory = './'; // Root of the project where files are
const directoriesToSearch = ['components', 'pages', '.', 'src']; // src might not exist but handled

const fileExtensions = ['.tsx', '.ts', '.css', '.html'];

const colorMap = {
    // Background colors
    '#FDF5E6': '#0A1C14', // Light background to Deep Emerald Green
    '#002B1D': '#0A1C14', // In case it was partially changed
    
    // Text colors (was dark maroon, now light cream)
    '#4A0E0E': '#FDF5E6', // Text Cream White
    
    // Accents
    '#800000': '#B76E79', // Maroon to Rose Gold
    '#FFD700': '#D4AF37', // Bright Gold to Warm Gold
    '#FFF4CC': '#FFCBA4', // Light yellow to Peach
    '#FFDE7A': '#F08080', // Yellow to Soft Coral
};

function processDirectory(dir) {
    if (!fs.existsSync(dir)) return;
    
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        if (file === 'node_modules' || file === '.git' || file === '.gemini') continue;
        
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            // only process specific directories from root
            if (dir === './' && !directoriesToSearch.includes(file)) continue;
            processDirectory(fullPath);
        } else {
            if (fileExtensions.some(ext => file.endsWith(ext))) {
                let content = fs.readFileSync(fullPath, 'utf8');
                let originalContent = content;
                
                // Do a safe replacement using regex
                for (const [oldColor, newColor] of Object.entries(colorMap)) {
                    // Match case insensitive old colors
                    const regex = new RegExp(oldColor, 'gi');
                    content = content.replace(regex, newColor);
                }
                
                if (content !== originalContent) {
                    fs.writeFileSync(fullPath, content, 'utf8');
                    console.log(`Updated colors in ${fullPath}`);
                }
            }
        }
    }
}

processDirectory(directory);
console.log('Color replacement completed.');
