const { parseString } = require("xml2js");
const fs = require("fs");

function parseXmlReport(xmlFilePath) {
  return new Promise((resolve, reject) => {
    const xmlData = fs.readFileSync(xmlFilePath, "utf-8");
    parseString(
      xmlData,
      { explicitArray: false, mergeAttrs: true },
      (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      }
    );
  });
}

module.exports = { parseXmlReport };
