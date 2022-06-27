const db = require("../models");
const User = db.user;
const Role = db.role;
const dbo = require("../db/conn");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { checkDuplicateUsername } = require("../middleware/verifySignUp");

exports.signup = async (req, response) => {
  let db_connect = dbo.getDb();

  let user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    createdAt: Date.now(),
  });

  // try {
  let username = user.username;
  //   try {
  //     await db_connect
  //       .collection("users")
  //       .findOne({ username: username }, function (err, user) {
  //         if (user) {
  //           throw new Error("Failed! Username is already in use!");
  //         }
  //       });
  //   } finally {
  //     console.log("finally");
  //   }

  //   // Set role if not yet set
  //   if (!req.body.role) {
  //     db_connect
  //       .collection("roles")
  //       .findOne({ name: "user" }, function (err, role) {
  //         if (err) throw err;
  //         user.roles = [role._id];
  //       });
  //   }

  //   //publish user to db
  //   db_connect.collection("users").insertOne(user, function (err, res) {
  //     if (err) throw err;
  //     return response.json(res);
  //   });
  // } catch (error) {
  //   console.log(error);
  //   return response.status(400).send(error);
  // }

  try {
    try {
      let test = false;
      await db_connect
        .collection("users")
        .findOne({ username: username }, function (err, userResponse) {
          if (userResponse) {
            console.log(userResponse);
            test = true;
          }
        });
      if (test) throw new Error("Failed! Username is already in use!");
    } finally {
      console.log("finally");
    }
  } catch (ex) {
    console.error("outer", ex.message);
  }
};
