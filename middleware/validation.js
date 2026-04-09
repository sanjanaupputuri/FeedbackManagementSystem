const { body, validationResult } = require('express-validator');

exports.validateRegister = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 4 }).withMessage('Password must be at least 4 characters long')
];

exports.validateLogin = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
];

exports.validateComplaint = [
  body('title').trim().isLength({ min: 5, max: 200 }).withMessage('Title must be 5-200 characters'),
  body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  body('category').isIn(['Electrical', 'Network', 'Maintenance', 'Others']).withMessage('Invalid category'),
  body('priority').optional().isIn(['Low', 'Medium', 'High']).withMessage('Invalid priority')
];

exports.validateComplaintUpdate = [
  body('status').optional().isIn(['Pending', 'In Progress', 'Resolved']).withMessage('Invalid status'),
  body('priority').optional().isIn(['Low', 'Medium', 'High']).withMessage('Invalid priority')
];

exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
