//Made for samuel chacon
const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');

const getSingle = async (req, res) => {
  //#swagger.tags=['reviews']
  const reviewId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('reviews').find({ _id: reviewId });
  result.toArray().then((reviews) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(reviews[0]);
  });
};

const getAll = async (req, res) => {
  //#swagger.tags=['reviews']
  const result = await mongodb.getDatabase().db().collection('reviews').find();
  result.toArray().then((reviews) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(reviews);
  });
};

const createReview = async (req, res) => {
  //#swagger.tags=['reviews']
  const review = {
    review_id: req.body.review_id,
    book_id: req.body.book_id,
    user_id: req.body.user_id,
    rating: req.body.rating,
    comment: req.body.comment,
    date: req.body.date
    };
  const result = await mongodb.getDatabase().db().collection('reviews').insertOne(review);
  if (result.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred when creating review.')
  }
};

const updateReview = async (req, res) => {
  //#swagger.tags=['reviews']
  const reviewId = new ObjectId(req.params.id);
  const review = {
    review_id: req.body.review_id,
    book_id: req.body.book_id,
    user_id: req.body.user_id,
    rating: req.body.rating,
    comment: req.body.comment,
    date: req.body.date
  };
  const result = await mongodb.getDatabase().db().collection('reviews').replaceOne({ _id: reviewId }, review);
  if (result.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred when updating review.')
  }
};

const deleteReview = async (req, res) => {
  //#swagger.tags=['reviews']
  const reviewId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('reviews').deleteOne({ _id: reviewId });
  if (result.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred when deleting review.')
  }
};


module.exports = {
  getSingle,
  getAll,
  createReview,
  updateReview,
  deleteReview
};