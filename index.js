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
  console.log("Operations: ", operations);
  const tableData = [];
  tableData.push([
    { data: "Operation Name", header: true },
    { data: "Item Value", header: true },
    { data: "Type", header: true },
  ]);
  operations.Operation.forEach((operation) => {
    console.log("---- Operation foreach: ", operation);
    if (isArray(operation.Item)) {
      operation.Item.forEach((item) => {
        console.log("Value: ", item.Value);
        console.log("Type: ", item.Type);
      });
    } else {
      console.log("Value: ", operation.Item.Value);
      console.log("Type: ", operation.Item.Type);
    }

    //tableData.push([operation.Name, operation.ItemValue, operation.Type]);
  });
  console.log("Table Data: ", tableData);
  return tableData;
}

//  read xml file
const xmlFilePath = "dummyData/dummy.xml";

parseXmlReport(xmlFilePath)
  .then((result) => {
    console.log("Result: ", result);
    console.log("Result operations: ", result.DeploymentReport.Operations);
    const tableData = transformToTableData(result.DeploymentReport.Operations);
    //console.log("Table Data:", tableData);
  })
  .catch((err) => {
    console.error(err);
  });

/* async function run() {
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
