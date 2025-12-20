// ================================================
// 📁 CATEGORY ROUTES - Category Endpoints
// ================================================
// This file defines the category routes
// Uses express.Router and express-validator
//
// ALLOWED TECHNOLOGIES:
// - express.Router
// - express-validator (body, validationResult)
// ================================================

// ================================================
// STEP 1: IMPORT MODULES
// ================================================

const express = require('express');
const router = express.Router();  // Create router instance
const { requireAuth } = require('../middleware/auth');
const { validateRequest } = require('../middleware/validate');

// Import express-validator functions (ALLOWED)
const { body } = require('express-validator');

// Import controller functions
const categoryController = require('../controllers/categoryController');

// ================================================
// ROUTE 1: GET ALL CATEGORIES
// ================================================
// GET /api/categories

router.get('/', categoryController.getAllCategories);

// ================================================
// ROUTE 2: GET FEATURED CATEGORIES
// ================================================
// GET /api/categories/featured

router.get('/featured', categoryController.getFeaturedCategories);

// ================================================
// ROUTE 3: GET CATEGORY BY SLUG
// ================================================
// GET /api/categories/:slug

router.get('/:slug', categoryController.getCategoryBySlug);

// ================================================
// ROUTE 4: CREATE CATEGORY
// ================================================
// POST /api/categories

router.post(
    '/',
    requireAuth, // ✅ SECURED
    // Validation rules using express-validator
    [
        body('name')
            .notEmpty()
            .withMessage('Category name is required'),

        body('slug')
            .notEmpty()
            .withMessage('Category slug is required')
    ],
    validateRequest,
    categoryController.createCategory
);

// ================================================
// ROUTE 5: UPDATE CATEGORY
// ================================================
// PUT /api/categories/:id

router.put('/:id', requireAuth, categoryController.updateCategory); // ✅ SECURED

// ================================================
// ROUTE 6: DELETE CATEGORY
// ================================================
// DELETE /api/categories/:id

router.delete('/:id', requireAuth, categoryController.deleteCategory); // ✅ SECURED

// ================================================
// EXPORT ROUTER
// ================================================

module.exports = router;
