const core = require("@actions/core");


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
