const fs = require('fs');

const GetInfoFromLocaleJson = (docName) => {
    const content = fs.readFileSync(__dirname + docName);
    return content;
}

module.exports = {GetInfoFromLocaleJson}