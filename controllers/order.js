const { Order, CartItem } = require('../models/order');
const Product = require('../models/product');
const { errorHandler } = require('../helpers/dbErrorHandler');

// Order by Id
exports.orderById = (req, res, next, id) => {
  Order.findById(id)
      .populate('products.product', 'name price')
      .exec((err, order) => {
          if (err || !order) {
              res.status(400).json({
                  error: errorHandler(err)
              })
          }
          req.order = order;
          next();
      })
};

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

// Get status values
exports.getStatusValues = (req,res) => {
    res.json(Order.schema.path('status').enumValues)
};

// Update order status
exports.updateOrderStatus = (req,res) => {
  Order.update(
      {_id: req.body.orderId},
      {$set: {status: req.body.status}},
      (err, order) => {
          if (err){
              return res.status(400).json({
                  error: errorHandler(err)
              })
          }
          res.json(order);
      })
};

// Get Total
exports.getTotal = (req, res) => {
    const productList = req.body;
    let total = 0;

    const results = productList.map(async product => {
        const foundProduct = await Product.findById(product._id).select('price').exec();
        total += foundProduct.price;
        return foundProduct;
    });

    Promise.all(results).then(data => res.json({total}));
};