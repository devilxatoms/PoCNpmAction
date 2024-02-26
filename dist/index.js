/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 877:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { parseString } = __nccwpck_require__(311);
const fs = __nccwpck_require__(147);

function parseXmlReport(xmlFilePath, callback) {
  const xmlData = fs.readFileSync(xmlFilePath, 'utf-8');
  parseString(xmlData, { explicitArray: false, mergeAttrs: true }, (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, result);
  });
}

module.exports = { parseXmlReport };


/***/ }),

/***/ 272:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 347:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


/***/ }),

/***/ 311:
/***/ ((module) => {

module.exports = eval("require")("xml2js");


/***/ }),

/***/ 147:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const core = __nccwpck_require__(272);
const github = __nccwpck_require__(347);
const {parseXmlReport} = __nccwpck_require__(877);

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput("who-to-greet");
  console.log(`Hello ${nameToGreet}!`);
  const time = new Date().toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}


//  read xml file
const xmlFilePath = "dummyData/dummy.xml";
xmlResult = parseXmlReport(xmlFilePath, (err, result) => {
  if (err) {
    core.setFailed(err);
    return;
  }
  return result;
});
console.log(xmlResult);



/* // Wrap the code block containing `await` inside an asynchronous function
async function run() {
  await core.summary
    .addHeading("SQL Changes Applied")
    .addTable([
      [
        { data: "Operation Name", header: true },
        { data: "Item Value", header: true },
        { data: "Type", header: true },
      ],
      ["Create", "[dbo].[DummyTable1]", "SqlTable"],
      ["Alter", "[dbo].[DummyFunction1]", "SqlScalarFunction"],
      ["Alter", "[dbo].[DummyFunction2]", "SqlScalarFunction"],
      ["Alter", "[dbo].[DummyFunction3]", "SqlScalarFunction"],
      ["Alter", "[dbo].[DummyFunction4]", "SqlScalarFunction"],
      ["Alter", "[dbo].[DummyFunction5]", "SqlScalarFunction"],
      ["Alter", "[dbo].[DummyTable2]", "SqlTable"],
      ["Alter", "[dbo].[DummyTable3]", "SqlTable"],
      ["Refresh", "[dbo].[DummyProcedure1]", "SqlProcedure"],
      ["Refresh", "[dbo].[DummyProcedure2]", "SqlProcedure"],
      // Agrega más filas según sea necesario
    ])
    .write();
}

// Call the asynchronous function
run(); */

})();

module.exports = __webpack_exports__;
/******/ })()
;