const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Product = require('../models/product');
const { errorHandler } = require('../helpers/dbErrorHandler');

// Find product by ID
exports.productById = (req, res, next, id) => {
    Product.findById(id)
        .populate('category')
        .exec((err, product) => {
        if (err || !product){
            return res.status(400).json({
                error: 'Product not found.'
            })
        }
        req.product = product;
        next();
    })
};

exports.read = (req, res) => {
    return res.json(req.product);
};

// Create product
exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req,(err, fields, files) => {
        // Handle errors
        if (err){
            return res.status(400).json({
                error: 'Something went wrong.'
            })
        }
        // Check fields have values
        const { name, description, price, quantity, category, shipping } = fields;
        if (!name || !description || !price || !quantity || !category || !shipping){
            return res.status(400).json({
                error: 'All fields are required.'
            })
        }
        // Handle fields
        let product = new Product(fields);
        // Handle files (TODO: Move to filesystem and store the path in db rather than binary data.)
        if (files.photo){
            // REJECT if the image is larger than 3MB.
            if (files.photo.size > 5000000){
                return res.status(400).json({
                    error: 'Image should be less than 3MB.'
                })
            }
            //product.photo.data = fs.readFileSync(files.photo.path);
            //product.photo.contentType = files.photo.type;
        }
        // Save product
        product.save((err, result) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(result);
        })
    })
};

// Delete product
exports.remove = (req,res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if (err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            'message': 'Product deleted.'
        })
    });
}

// Update product
exports.update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req,(err, fields, files) => {
        // Handle errors
        if (err){
            return res.status(400).json({
                error: 'Something went wrong.'
            })
        }
        // Check fields have values
        const { name, description, price, quantity, category, shipping } = fields;
        if (!name || !description || !price || !quantity || !category || !shipping){
            return res.status(400).json({
                error: 'All fields are required.'
            })
        }
        // Handle fields
        let product = req.product;
        product = _.extend(product, fields);

        // Handle files (TODO: Move to filesystem and store the path in db rather than binary data.)
        if (files.photo){
            // REJECT if the image is larger than 3MB.
            if (files.photo.size > 5000000){
                return res.status(400).json({
                    error: 'Image should be less than 3MB.'
                })
            }
            //product.photo.data = fs.readFileSync(files.photo.path);
            //product.photo.contentType = files.photo.type;
        }
        // Save product
        product.save((err, result) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(result);
        })
    })
};

// List products
exports.list = (req, res) => {
  let order = req.query.order ? req.query.order : 'asc';
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;
  let offset = req.query.offset ? parseInt(req.query.offset) : 0;

  Product.find()
      .select('-photo') // Don't return the photo/images in the response
      .populate('category')
      .sort([[sortBy, order]])
      .limit(limit)
      .skip(offset)
      .exec((err, products) => {
          if (err){
              return res.status(400).json({
                  error: 'Products not found.'
              })
          }
          res.json(products)
      })

};

// Get products by category
exports.productsByCat = (req,res, next, id) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;
    Product.find({
        category: id
    })
        .limit(limit)
        .populate('category', '_id name')
        .exec((err,products) => {
            if (err){
                return res.status(400).json({
                    error: 'Products not found for category.'
                })
            }
            res.json(products);
        })
};

// Related products
exports.listRelated = (req,res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;
    // Find products within same category excluding current product
    Product.find({
        _id: {$ne: req.product},
        category: req.product.category
    })
        .limit(limit)
        .populate('category', '_id name')
        .exec((err, products) => {
            if (err){
                return res.status(400).json({
                    error: 'Products not found.'
                })
            }
            res.json(products);
        })

};

// List categories
exports.listCategories = (req,res) => {
    Product.distinct('category', {}, (err, categories) => {
        if (err){
            return res.status(400).json({
                error: 'Categories not found.'
            })
        }
        res.json(categories)
    });
};

// Find products by search
exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let offset = parseInt(req.body.offset);
    let findArgs = {};

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    Product.find(findArgs)
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .skip(offset)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found"
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};

exports.listSearch = (req,res) => {
    // Create query obj
    const query = {};
    // Asign search value to query.name
    if (req.query.search){
        query.name = {$regex: req.query.search, $options: 'i'};
        // Assign category value to query.category
        if (req.query.category && req.query.category !== 'All'){
            query.category = req.query.category;
        }
        // Find product based on query obj with 2 props (search/cat)
        Product.find(query, (err, products) => {
            if (err){
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(products);
        })
    }
};

// Decrease product quantity on purchase
exports.decreaseQuantity = (req,res,next) => {
  let bulkOptions = req.body.order.products.map((product) => {
      console.log('Decreased', req.body.order.product);
      return {
        updateOne: {
            filter: { _id: product._id },
            update: { $inc: {quantity: -product.count, sold: +product.count} }
        }
    }
  });

  Product.bulkWrite(bulkOptions, {}, (err, products) => {
      if (err){
          return res.status(400).json({
              error: 'Could not update product.'
          })
      }
      next();
  });
};