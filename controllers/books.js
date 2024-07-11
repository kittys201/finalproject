const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');

const getSingle = async (req, res) => {
  //#swagger.tags=['books']
  const bookId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('books').find({ _id: bookId });
  result.toArray().then((books) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(books[0]);
  });
};

const getAll = async (req, res) => {
  //#swagger.tags=['books']
  const result = await mongodb.getDatabase().db().collection('books').find();
  result.toArray().then((books) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(books);
  });
};

const createBook = async (req, res) => {
  //#swagger.tags=['books']
  const book = {
    book_id: req.body.book_id,
    title: req.body.title,
    author: req.body.author,
    price: req.body.price,
    inventory: req.body.inventory
     };
  const result = await mongodb.getDatabase().db().collection('books').insertOne(book);
  if (result.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred when creating book.')
  }
};

const updateBook = async (req, res) => {
  //#swagger.tags=['books']
  const bookId = new ObjectId(req.params.id);
  const book = {
    book_id: req.body.book_id,
    title: req.body.title,
    author: req.body.author,
    price: req.body.price,
    inventory: req.body.inventory
  };
  const result = await mongodb.getDatabase().db().collection('books').replaceOne({ _id: bookId }, book);
  if (result.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred when updating book.')
  }
};

const deleteBook = async (req, res) => {
  //#swagger.tags=['books']
  const bookId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('books').deleteOne({ _id: bookId });
  if (result.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred when deleting book.')
  }
};


module.exports = {
  getSingle,
  getAll,
  createBook,
  updateBook,
  deleteBook
};