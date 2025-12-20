// ================================================
// 📁 CATEGORY CONTROLLER - Category CRUD Operations
// ================================================
// This file handles all category database operations
// Uses basic Mongoose CRUD: find, findOne, create, update, delete
//
// CONCEPTS USED:
// - async/await with try/catch
// - Basic Mongoose operations only
// ================================================

// ================================================
// STEP 1: IMPORT THE CATEGORY MODEL
// ================================================

const Category = require('../models/Category');

// ================================================
// FUNCTION 1: GET ALL CATEGORIES
// ================================================
// Route: GET /api/categories
// Returns all active categories

async function getAllCategories(req, res) {
    try {
        // Use Mongoose find() - basic CRUD operation
        // Find all categories where isActive is true
        // Sort by order field (ascending)
        const categories = await Category.find({ isActive: true }).sort({ order: 1 });

        // Send success response with status 200
        res.status(200).json({
            success: true,
            count: categories.length,
            data: categories
        });

    } catch (error) {
        // Handle error
        console.error('Error:', error.message);
        res.status(500).json({
            success: false,
            message: 'Error fetching categories'
        });
    }
}

// ================================================
// FUNCTION 2: GET FEATURED CATEGORIES
// ================================================
// Route: GET /api/categories/featured
// Returns only featured categories

async function getFeaturedCategories(req, res) {
    try {
        // Use Mongoose find() with multiple conditions
        const categories = await Category.find({
            isActive: true,
            isFeatured: true
        }).sort({ order: 1 });

        // Send success response
        res.status(200).json({
            success: true,
            count: categories.length,
            data: categories
        });

    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({
            success: false,
            message: 'Error fetching featured categories'
        });
    }
}

// ================================================
// FUNCTION 3: GET CATEGORY BY SLUG
// ================================================
// Route: GET /api/categories/:slug
// Returns a single category by its URL slug

async function getCategoryBySlug(req, res) {
    try {
        // Get slug from URL parameters
        const slug = req.params.slug;

        // Use Mongoose findOne() - basic CRUD operation
        const category = await Category.findOne({
            slug: slug,
            isActive: true
        });

        // If category not found
        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        // Send success response
        res.status(200).json({
            success: true,
            data: category
        });

    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({
            success: false,
            message: 'Error fetching category'
        });
    }
}

// ================================================
// FUNCTION 4: CREATE CATEGORY
// ================================================
// Route: POST /api/categories
// Creates a new category

async function createCategory(req, res) {
    try {
        // Use Mongoose create() - basic CRUD operation
        // req.body contains the category data from request
        const category = await Category.create(req.body);

        // Send success response with status 201 (Created)
        res.status(201).json({
            success: true,
            message: 'Category created successfully',
            data: category
        });

    } catch (error) {
        console.error('Error:', error.message);
        // Status 400 for validation errors
        res.status(400).json({
            success: false,
            message: 'Error creating category'
        });
    }
}

// ================================================
// FUNCTION 5: UPDATE CATEGORY
// ================================================
// Route: PUT /api/categories/:id
// Updates an existing category

async function updateCategory(req, res) {
    try {
        // Get category ID from URL parameters
        const categoryId = req.params.id;

        // Use Mongoose findByIdAndUpdate() - basic CRUD operation
        // { new: true } returns the updated document
        const category = await Category.findByIdAndUpdate(
            categoryId,
            req.body,
            { new: true }
        );

        // If category not found
        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        // Send success response
        res.status(200).json({
            success: true,
            message: 'Category updated successfully',
            data: category
        });

    } catch (error) {
        console.error('Error:', error.message);
        res.status(400).json({
            success: false,
            message: 'Error updating category'
        });
    }
}

// ================================================
// FUNCTION 6: DELETE CATEGORY
// ================================================
// Route: DELETE /api/categories/:id
// Deletes a category

async function deleteCategory(req, res) {
    try {
        // Get category ID from URL parameters
        const categoryId = req.params.id;

        // Use Mongoose findByIdAndDelete() - basic CRUD operation
        const category = await Category.findByIdAndDelete(categoryId);

        // If category not found
        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        // Send success response
        res.status(200).json({
            success: true,
            message: 'Category deleted successfully'
        });

    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({
            success: false,
            message: 'Error deleting category'
        });
    }
}

// ================================================
// EXPORT ALL FUNCTIONS
// ================================================

module.exports = {
    getAllCategories: getAllCategories,
    getFeaturedCategories: getFeaturedCategories,
    getCategoryBySlug: getCategoryBySlug,
    createCategory: createCategory,
    updateCategory: updateCategory,
    deleteCategory: deleteCategory
};
