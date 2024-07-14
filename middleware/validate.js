const validator = require('../helpers/validate');
const Joi = require('joi');

const saveBook = (req, res, next) => {
  const validationRule = {
    book_id: 'required|min:1|max:50|string',
    title: 'required|min:1|max:100|string',
    author: 'required|min:1|max:50|string',
    price: 'required|min:1|max:10|string',
    inventory: 'required|min:1|max:10|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};


const saveReview = (req, res, next) => {
    const validationRule = {
      review_id: 'required|string|min:1|max:50',
book_id: 'required|string|min:1|max:50',
user_id: 'required|string|min:1|max:50',
 rating: 'required|numeric|min:1|max:5',
comment: 'required|string|min:1|max:50',
date: ['required', 'regex:/^(19|20)\\d{2}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/']
      };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  };


  const saveUser = (req, res, next) => {
    const validationRule = {
      user_id: 'required|min:1|max:50|string',
      username: 'required|min:1|max:50|string',
      password: 'required|min:1|max:50|string',
      email:['required', 'regex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/']
      };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  };


  const saveOrder = (req, res, next) => {
    const validationRule = {
      order_id: 'required|min:1|max:50|string',
      user_id: 'required|min:1|max:50|string',
      books:'required|min:1|max:50|string',
      order_status: 'required|string',
      order_date: ['required', 'regex:/^(19|20)\\d{2}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/']
      };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  };
 
  
  const checkMongoId = (req, res, next) => {
    const validationRule = {
      id: 'required|min:24|max:24|string'
    };
    validator(req.params, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  }
module.exports = {
  saveBook,
  saveReview,
  saveUser,
  saveOrder,
  checkMongoId
};
////Made for Jennifer Gonzalez
/*const validator = require('../helpers/validate');
const Joi = require('joi');

const saveBook = (req, res, next) => {
  const validationRule = Joi.object({
    book_id: Joi.string().min(1).max(50).required(),
    title: Joi.string().min(1).max(100).required(),
    author: Joi.string().min(1).max(50).required(),
    price: Joi.number().min(0).required(),
    inventory: Joi.number().integer().min(0).required()
  });

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveReview = (req, res, next) => {
  const validationRule = Joi.object({
    review_id: Joi.string().min(1).max(50).required(),
    book_id: Joi.string().min(1).max(50).required(),
    user_id: Joi.string().min(1).max(50).required(),
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().required(),
    date: Joi.date().required()
  });

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveUser = (req, res, next) => {
  const validationRule = Joi.object({
    user_id: Joi.string().min(1).max(50).required(),
    username: Joi.string().min(1).max(50).required(),
    password: Joi.string().min(1).max(50).required(),
    email: Joi.string().email().required()
  });

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveOrder = (req, res, next) => {
  const validationRule = Joi.object({
    order_id: Joi.string().min(1).max(50).required(),
    user_id: Joi.string().min(1).max(50).required(),
    books: Joi.array().items(Joi.object({
      book_id: Joi.string().min(1).max(50).required(),
      quantity: Joi.number().integer().min(1).required()
    })).required(),
    order_status: Joi.string().required(),
    order_date: Joi.date().required()
  });

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const checkMongoId = (req, res, next) => {
  const validationRule = Joi.object({
    id: Joi.string().min(24).max(24).required()
  });

  validator(req.params, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
}

module.exports = {
  saveBook,
  saveReview,
  saveUser,
  saveOrder,
  checkMongoId
};*/