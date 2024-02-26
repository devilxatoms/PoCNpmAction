const { parseString } = require("xml2js");
const fs = require("fs");

function parseXmlReport(xmlFilePath, callback) {
  console.log("-----> file path: ", xmlFilePath);
  const xmlData = fs.readFileSync(xmlFilePath, "utf-8");
  parseString(
    xmlData,
    { explicitArray: false, mergeAttrs: true },
    (err, result) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, result);
    }
  );
}

module.exports = { parseXmlReport };
