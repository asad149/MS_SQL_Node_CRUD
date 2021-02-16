const User = require("./user");

const dboperations = require("./dboperations");

dboperations.getUsers().then((result) => {
  console.log(result);
});
