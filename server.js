// Importing Dependecies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mssql = require("mssql");
const dbConfig = require("./dbconfig");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const User = require("./user");

const dboperations = require("./dboperations");

// App config
const app = express();
const port = process.env.PORT || 9000;

// middlewares
app.use(bodyParser.json());
app.use(cors());

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Users API",
      description: "User API Information",
      contact: {
        name: "Amazing Developer",
      },
      servers: ["http://localhost:9000"],
    },
  },
  apis: ["server.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /users:
 *  get:
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *        description: A successful response
 */

/**
 * @swagger
 * /users/{user_id}:
 *  get:
 *   summary: get user by ID
 *   description: create team
 *   parameters:
 *    - in: path
 *      name: user_id
 *      schema:
 *       type: integer
 *      required: true
 *      description: id of the team
 *      example: 2
 *   responses:
 *    200:
 *     description: success
 */

/**
 * @swagger
 * /users:
 *  post:
 *   summary: Insert User Record
 *   description: create user assignment
 *   parameters:
 *    - in: body
 *      name: body
 *      required: true
 *      description: user assignment of the team
 *   requestBody:
 *    content:
 *     application/json:
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description: error
 */

 /**
 * @swagger
 * /users:
 *  put:
 *   summary: Update User Record
 *   description: Update user assignment
 *   parameters:
 *    - in: body
 *      name: body
 *      required: true
 *      description: user assignment of the team
 *   requestBody:
 *    content:
 *     application/json:
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description: error
 */





/**
 * @swagger
 * /users/{user_id}:
 *  delete:
 *   summary: delete user
 *   description: delete user
 *   parameters:
 *    - in: path
 *      name: user_id
 *      schema:
 *       type: integer
 *      required: true
 *      description: id of the user
 *      example: 2
 *   responses:
 *    200:
 *     description: success
 */






const poolPromise = new mssql.ConnectionPool(dbConfig)
  .connect()
  .then((pool) => {
    console.log("Connected to MSSQL");
    return pool;
  })
  .catch((err) => console.log("Database Connection Failed! Bad Config: ", err));

app.get("/", (req, res) => {
  res.send("Hello Asad");
});

// app.get("/users", async (req, res) => {
//   try {
//     // make sure that any items are correctly URL encoded in the connection string
//     await mssql.connect(dbConfig);
//     const result = await mssql.query`select * from UserInfo`;
//     res.json(result.recordsets);
//   } catch (err) {
//     console.log(err);
//   }
// });

app.get("/users", (req, res) => {
  dboperations.getUsers().then((result) => {
    res.json(result[0]);
  });
});

app.get("/users/:id", (req, res) => {
  dboperations.getUser(req.params.id).then((result) => {
    res.json(result[0]);
  });
});

app.post("/users", (req, res) => {
  let user = { ...req.body };
  dboperations.addUser(user).then((result) => {
    if (result) {
      res.status(201).json({ msg: "Record has been Successfully Inserted" });
    }
  });
});

app.put("/users", (req, res) => {
  let user = { ...req.body };
  dboperations.updateUser(user).then((result) => {
    if (result) {
      res.status(201).json({ msg: "Record has been Updated Successfully" });
    }
  });
});

app.delete("/users/:id", (req, res) => {
  dboperations.deleteUser(req.params.id).then((result) => {
    if (result) {
      res.status(201).json({ msg: "Record has been Successfully deleted" });
    }
  });
});

// Listen
app.listen(port, () => console.log(`App is running on port ${port}`));
