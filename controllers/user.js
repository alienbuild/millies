const User = require('../models/user');

// Get user by id (admin)
exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user){
        return res.status(400).json({
            error: 'User not found.'
        })
    }
    // Return user
    req.profile = user;
    next();
  })
};

// Get user
exports.read = (req,res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};

// Update user
exports.update = (req,res) => {
  User.findOneAndUpdate(
      // Find by id
      {_id: req.profile._id},
      // Update matching fields
      {$set: req.body},
      {new: true},
      (err, user) => {
        if (err) {
            return res.status(400).json({
                error: 'You are not authorised to do this.'
            })
        }
        // Don't return the password.
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json(user)
      }
      );
};

// Add order to users history
exports.addOrderToUserHistory = (req,res, next) => {
    let history = [];

    req.body.order.products.forEach((item) => {
        history.push({
            _id: item._id,
            name: item.name,
            description: item.description,
            category: item.category,
            quantity: item.quantity,
            transaction_id: req.body.order.transaction_id,
            amount: req.body.order.amount
        })
    });

    User.findOneAndUpdate(
        { _id: req.profile._id },
        {$push: {history: history}},
        {new: true},
        (err, data) => {
            if (err){
                return res.status(400).json({
                    error: 'Could not update user purchase history.'
                })
            }
            next();
        })
};