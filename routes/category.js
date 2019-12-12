const express = require('express');
const router = express.Router();
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { create, categoryById, read, update, remove, list } = require('../controllers/category');
const { userById } = require('../controllers/user');

// Create a category
router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create);

// Get category by id
router.get('/category/:categoryId', read);

// Update category
router.put('/category/:categoryId', requireSignin, isAuth, isAdmin, update);

// Delete category
router.delete('/category/:categoryId', requireSignin, isAuth, isAdmin, remove);

// Get categories
router.get('/categories', list);

// Param watchers
router.param('categoryId', categoryById);
router.param('userId', userById);

module.exports = router;