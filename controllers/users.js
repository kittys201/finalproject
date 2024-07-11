const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');

const getSingle = async (req, res) => {
  //#swagger.tags=['users']
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('users').find({ _id: userId });
  result.toArray().then((users) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(users[0]);
  });
};

const getAll = async (req, res) => {
  //#swagger.tags=['users']
  const result = await mongodb.getDatabase().db().collection('users').find();
  result.toArray().then((users) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(users);
  });
};

const createUser = async (req, res) => {
  //#swagger.tags=['users']
  const user = {
    user_id: req.body.user_id,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  };
  const result = await mongodb.getDatabase().db().collection('users').insertOne(user);
  if (result.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred when creating user.')
  }
};

const updateUser = async (req, res) => {
  //#swagger.tags=['users']
  const userId = new ObjectId(req.params.id);
  const user = {
    user_id: req.body.user_id,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  };
  const result = await mongodb.getDatabase().db().collection('users').replaceOne({ _id: userId }, user);
  if (result.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred when updating user.')
  }
};

const deleteUser = async (req, res) => {
  //#swagger.tags=['users']
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('users').deleteOne({ _id: userId });
  if (result.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred when deleting user.')
  }
};


module.exports = {
  getSingle,
  getAll,
  createUser,
  updateUser,
  deleteUser
};