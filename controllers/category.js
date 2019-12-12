const Category = require('../models/category');
const { errorHandler } = require('../helpers/dbErrorHandler');

// Category by id
exports.categoryById = (req,res,next,id) => {
    Category.findById(id).exec((err, cat) => {
        if (err || !cat){
            return res.status(400).json({
                error: 'Category not found.'
            })
        }
        req.category = cat;
        next();
    })
};

// Create category
exports.create = (req, res) => {
    const category = new Category(req.body);
    category.save((err, cat) => {
        if (err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            category: cat
        })
    })
};

// Get category
exports.read = (req,res) => {
  return res.json(req.category)
};

// Update
exports.update = (req,res) => {
    const category = req.category;
    category.name = req.body.name;
    category.save((err, data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data)
    });
};

// Remove
exports.remove = (req,res) => {
    const category = req.category;
    category.remove((err, data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            message: 'Category deleted'
        })
    });
};

// List
exports.list = (req,res) => {
    Category.find().exec((err, data) => {
        if (err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data);
    })
};