const core = require("@actions/core");
//const github = require("@actions/github");
const { parseXmlReport } = require("./src/parseXmlReport");

/* try {
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
} */

function transformToTableData(operations) {
  const tableData = [];
  operations.Operation.forEach((operation) => {
    if (Array.isArray(operation.Item)) {
      operation.Item.forEach((item) => {
        tableData.push([operation.Name, item.Value, item.Type]);
      });
    } else {
      tableData.push([
        operation.Name,
        operation.Item.Value,
        operation.Item.Type,
      ]);
    }
  });
  return tableData;
}

//  read xml file
const xmlFilePath = "dummyData/dummy.xml";

parseXmlReport(xmlFilePath)
  .then((result) => {
    const tableData = transformToTableData(result.DeploymentReport.Operations);
    console.log(">>>Table Data:", tableData);
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
          // Agrega más filas según sea necesario
        ])
        .write();
    }

    // Call the asynchronous function
    run();
  })
  .catch((err) => {
    console.error(err);
  });
