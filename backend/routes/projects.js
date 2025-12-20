const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');
const projectController = require('../controllers/projectController');
const Project = require('../models/Project');

function validateRequest(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array()
        });
    }
    next();
}

// ROUTE 1: GET ALL PROJECTS
router.get('/', projectController.getAllProjects);

// ROUTE 2: GET FEATURED PROJECTS
router.get('/featured', projectController.getFeaturedProjects);

// ROUTE 3: GET MY POSTED PROJECTS (must be before :id route)
router.get('/my-posts', requireAuth, async function (req, res) {
    try {
        const userId = req.session.userId;

        const myProjects = await Project.find({ client: userId })
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: myProjects
        });
    } catch (error) {
        console.error('Error fetching my posts:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ROUTE 4: GET PROJECT BY ID
router.get('/:id', projectController.getProjectById);

// ROUTE 4: CREATE PROJECT
router.post(
    '/',
    requireAuth,
    [
        body('title').notEmpty().withMessage('Title is required'),
        body('description').notEmpty().withMessage('Description is required'),
        body('category').notEmpty().withMessage('Category is required')
    ],
    validateRequest,
    projectController.createProject
);

// ROUTE 5: UPDATE PROJECT
router.put('/:id', requireAuth, projectController.updateProject);

// ROUTE 6: DELETE PROJECT
router.delete('/:id', requireAuth, projectController.deleteProject);

module.exports = router;

