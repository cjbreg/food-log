const User = require("../models/user.model");

exports.fetchAll = async (req, res) => {
  const users = await User.find();
  res.status(200).send(users);
};

exports.fetchById = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    res.send(user);
  } catch (error) {
    res.status(404);
    res.send({ error: "User doesn't exist!" });
  }
};

exports.updateById = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    if (req.body.username) {
      user.username = req.body.username;
    }

    await user.save();
    res.send(user);
  } catch {
    res.status(404);
    res.send({ error: "User doesn't exist!" });
  }
};

exports.deleteById = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "User doesn't exist!" });
  }
};
