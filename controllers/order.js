const { Order, CartItem } = require('../models/order');
const { errorHandler } = require('../helpers/dbErrorHandler');

// Create order
exports.create = (req, res) => {
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    order.save((err, data) => {
       if (err) {
           console.log('Error is', err);
           return res.status(400).json({
               error: errorHandler(err)
           })
       }
       res.json(data);
    });
};

// List order
exports.listOrders = (req,res) => {
  Order.find()
      .populate('user', '_id name address')
      .sort('-created')
      .exec((err, orders) => {
          if (err){
              return res.status(400).json({
                  error: errorHandler(err)
              })
          }
          res.json(orders);
      })
};