const core = require("@actions/core");
// const github = require("@actions/github");
const { parseXmlReport } = require("./src/parseXmlReport");

/* 
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
*/

// Function to transform operations data into table format
function transformToTableData(operations) {
  const tableData = [];

  operations.Operation.forEach((operation) => {
    if (Array.isArray(operation.Item)) {
      operation.Item.forEach((item) => {
        const { Name } = operation;
        const { Value, Type } = item;
        tableData.push([Name, Value, Type]);
      });
    } else {
      const { Name } = operation;
      const { Value, Type } = operation.Item;
      tableData.push([Name, Value, Type]);
    }
  });

  return tableData;
}

// Read XML file and process the data
const xmlFilePath = core.getInput("report-path");

parseXmlReport(xmlFilePath)
  .then((result) => {
    const tableData = transformToTableData(result.DeploymentReport.Operations);

    // Async function to run the workflow steps
    async function run() {
      await core.summary
        .addHeading("SQL Changes Applied")
        .addTable([
          [
            { data: "Operation Name", header: true },
            { data: "Item Value", header: true },
            { data: "Type", header: true },
          ],
          ...tableData,
          // Add more rows as needed
        ])
        .write();
    }

    // Call the asynchronous function
    run();
  })
  .catch((err) => {
    console.error(err);
  });
