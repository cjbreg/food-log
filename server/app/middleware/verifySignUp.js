const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

const dbo = require("../db/conn");

checkRolesExisted = (res, user, next) => {
  if (user.roles) {
    let db_connect = dbo.getDb();
    for (let i = 0; i < user.roles.length; i++) {
      console.log(user.roles[i]);
      checkRole(db_connect, res, user.roles[i], next);
    }
  }
};

checkDuplicateUsername = async (user) => {
  let db_connect = dbo.getDb();
  let username = user.username;

  try {
    await db_connect
      .collection("users")
      .findOne({ username: username }, function (err, user) {
        if (user) {
          throw new Error("Failed! Username is already in use!");
        }
      });
  } finally {
    console.log("finally");
  }
};

checkDuplicateEmail = async (user) => {
  let db_connect = dbo.getDb();
  let email = user.email;
  await db_connect
    .collection("users")
    .findOne({ email: email }, function (err, user) {
      if (err) {
        console.log(err);
      }
      if (user) {
        console.log(user);
        console.warn("Failed! Email is already in use!");
        throw "Failed! Email is already in use!";
      }
    });
};

const verifySignUp = {
  checkRolesExisted,
  checkDuplicateEmail,
  checkDuplicateUsername,
};

module.exports = verifySignUp;

checkRole = (db_connect, res, roleName, next) => {
  db_connect
    .collection("roles")
    .findOne({ name: roleName }, function (err, role) {
      if (err) {
        console.warn(`Failed! Role ${roleName} does not exist!`);
        res.status(400).send({
          message: `Failed! Role ${roleName} does not exist!`,
        });
        return;
      }
      if (role) {
        return;
      }
    });
};
