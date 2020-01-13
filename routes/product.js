const express = require('express');
const router = express.Router();
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { create, productById, read, remove, update, list, listRelated, listCategories, listBySearch, listSearch } = require('../controllers/product');

// Get product by ID
router.get('/product/:productId', read);

// Create a product
const { userById } = require('../controllers/user');
router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create);

// Delete product
router.delete('/product/:productId/:userId', requireSignin, isAuth, isAdmin, remove);

// Update product
router.put('/product/:productId/:userId', requireSignin, isAuth, isAdmin, update);

// Get all products
router.get('/products', list);

// Get related products
router.get('/products/related/:productId', listRelated);

// Get categories
router.get('/products/categories', listCategories);

// Get products by search
router.post("/products/by/search", listBySearch);

// Get products by search
router.get("/products/search", listSearch);

// Param watchers
router.param('userId', userById);
router.param('productId', productById);

module.exports = router;