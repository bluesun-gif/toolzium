const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory) {
            walkDir(dirPath, callback);
        } else {
            callback(path.join(dir, f));
        }
    });
}

const found = [];
walkDir('c:\\\\Users\\\\LOQ\\\\toolflux', function(filePath) {
    if (filePath.includes('roman-numeral')) {
        found.push(filePath);
    }
});
fs.writeFileSync('c:\\\\Users\\\\LOQ\\\\toolflux\\\\found_roman.txt', found.join('\\n'));
