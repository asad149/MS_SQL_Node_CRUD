const config = require("./dbconfig");
const sql = require("mssql");

async function getUsers() {
  try {
    let pool = await sql.connect(config);
    let users = await pool.request().query("select * from UserInfo");
    return users.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function getUser(userId) {
  try {
    let pool = await sql.connect(config);
    let users = await pool
      .request()
      .input("input_parameter", sql.Int, userId)
      .query("select * from UserInfo where PersonID=@input_parameter");
    return users.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function addUser(user) {
  try {
    let pool = await sql.connect(config);
    let insertUser = await pool
      .request()
      .input("PersonID", sql.Int, user.PersonID)
      .input("LastName", sql.VarChar, user.LastName)
      .input("FirstName", sql.VarChar, user.FirstName)
      .input("City", sql.VarChar, user.City)

      .query(
        "insert into UserInfo (PersonID,LastName,FirstName,City) values (@PersonID,@LastName,@FirstName,@City)"
      );
    return insertUser.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function updateUser(user) {
  try {
    let pool = await sql.connect(config);
    let insertUser = await pool
      .request()
      .input("PersonID", sql.Int, user.PersonID)
      .input("LastName", sql.VarChar, user.LastName)

      .query(
        "UPDATE UserInfo SET LastName=@LastName where PersonID=@PersonID "
      );
    return insertUser.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function deleteUser(userId) {
  try {
    let pool = await sql.connect(config);
    let users = await pool
      .request()
      .input("input_parameter", sql.Int, userId)
      .query("DELETE from UserInfo where PersonID=@input_parameter");
    return users.recordsets;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getUsers: getUsers,
  getUser: getUser,
  addUser: addUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
};
