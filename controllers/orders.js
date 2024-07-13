//Made for samuel chacon
const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');

const getSingle = async (req, res) => {
  //#swagger.tags=['orders']
  const orderId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('orders').find({ _id: orderId });
  result.toArray().then((orders) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(orders[0]);
  });
};

const getAll = async (req, res) => {
  //#swagger.tags=['orders']
  const result = await mongodb.getDatabase().db().collection('orders').find();
  result.toArray().then((orders) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(orders);
  });
};

const createOrder = async (req, res) => {
  //#swagger.tags=['orders']
  const order = {
    order_id: req.body.order_id,
    user_id: req.body.user_id,
    books: req.body.books.map(book => ({
    book_id: book.book_id,
      quantity: book.quantity
    })),
    order_status: req.body.order_status,
    order_date: req.body.date
  };
  const result = await mongodb.getDatabase().db().collection('orders').insertOne(order);
  if (result.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred when creating order.')
  }
};

const updateOrder = async (req, res) => {
  //#swagger.tags=['orders']
  const orderId = new ObjectId(req.params.id);
  const order = {
    order_id: req.body.order_id,
    user_id: req.body.user_id,
    books: req.body.books.map(book => ({
      book_id: book.book_id,
      quantity: book.quantity
    })),
    order_status: req.body.order_status,
    order_date: req.body.date
  };
  const result = await mongodb.getDatabase().db().collection('orders').replaceOne({ _id: orderId }, order);
  if (result.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred when updating order.')
  }
};

const deleteOrder = async (req, res) => {
  //#swagger.tags=['orders']
  const orderId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('orders').deleteOne({ _id: orderId });
  if (result.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred when deleting order.')
  }
};


module.exports = {
  getSingle,
  getAll,
  createOrder,
  updateOrder,
  deleteOrder
};