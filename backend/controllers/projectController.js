// ================================================
// 📋 PROJECT CONTROLLER - Project CRUD Operations
// ================================================
// This file handles all project/gig database operations
// Uses basic Mongoose CRUD: find, findById, create, update, delete
//
// CONCEPTS USED:
// - async/await with try/catch
// - Basic Mongoose operations only
// ================================================

// ================================================
// STEP 1: IMPORT THE PROJECT MODEL
// ================================================

const Project = require('../models/Project');

// ================================================
// FUNCTION 1: GET ALL PROJECTS
// ================================================
// Route: GET /api/projects
// Returns all projects with optional filters

async function getAllProjects(req, res) {
    try {
        // Get query parameters from URL
        // Example: /api/projects?category=web&status=open&limit=5
        const category = req.query.category;
        const status = req.query.status;
        const featured = req.query.featured;

        // Parse limit and enforce maximum of 50
        var requestedLimit = parseInt(req.query.limit) || 10;
        var limit = Math.min(requestedLimit, 50);

        // Build query object
        // Only add filters if they exist
        const query = {};

        if (category) {
            query.category = category;
        }

        if (status) {
            query.status = status;
        } else {
            // Default to showing only open projects if no status specified
            query.status = 'open';
        }

        if (featured) {
            query.isFeatured = (featured === 'true');
        }

        // Use Mongoose find() - basic CRUD operation
        // Sort by newest first, limit results
        const projects = await Project.find(query)
            .sort({ createdAt: -1 })
            .limit(limit)
            .populate('client', 'name avatar');

        // Send success response
        res.status(200).json({
            success: true,
            count: projects.length,
            data: projects
        });

    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({
            success: false,
            message: 'Error fetching projects'
        });
    }
}

// ================================================
// FUNCTION 2: GET FEATURED PROJECTS
// ================================================
// Route: GET /api/projects/featured
// Returns featured open projects

async function getFeaturedProjects(req, res) {
    try {
        // Use Mongoose find() with conditions
        const projects = await Project.find({
            isFeatured: true,
            status: 'open'
        })
            .sort({ createdAt: -1 })
            .limit(6)
            .populate('client', 'name avatar');

        // Send success response
        res.status(200).json({
            success: true,
            count: projects.length,
            data: projects
        });

    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({
            success: false,
            message: 'Error fetching featured projects'
        });
    }
}

// ================================================
// FUNCTION 3: GET PROJECT BY ID
// ================================================
// Route: GET /api/projects/:id
// Returns a single project

async function getProjectById(req, res) {
    try {
        // Get project ID from URL parameters
        const projectId = req.params.id;

        // Use Mongoose findById() and populate client
        const project = await Project.findById(projectId).populate('client', 'name avatar');

        // If project not found
        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        // Send success response
        res.status(200).json({
            success: true,
            data: project
        });

    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({
            success: false,
            message: 'Error fetching project'
        });
    }
}

// ================================================
// FUNCTION 4: CREATE PROJECT
// ================================================
// Route: POST /api/projects
// Creates a new project

async function createProject(req, res) {
    try {
        // Verify user is a client (only clients can post projects)
        if (req.session.userType !== 'client') {
            return res.status(403).json({
                success: false,
                message: 'Only clients can create projects'
            });
        }

        // Auto-assign owner from session
        const projectData = {
            ...req.body,
            client: req.session.userId
        };

        const project = await Project.create(projectData);

        res.status(201).json({
            success: true,
            message: 'Project created successfully',
            data: project
        });

    } catch (error) {
        console.error('Error:', error.message);
        res.status(400).json({
            success: false,
            message: 'Error creating project'
        });
    }
}

// ================================================
// FUNCTION 5: UPDATE PROJECT
// ================================================
// Route: PUT /api/projects/:id
// Updates an existing project

async function updateProject(req, res) {
    try {
        const projectId = req.params.id;
        const userId = req.session.userId;

        // Find project first to check ownership
        const projectToUpdate = await Project.findById(projectId);

        if (!projectToUpdate) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        // Verify ownership
        if (projectToUpdate.client.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this project'
            });
        }

        const project = await Project.findByIdAndUpdate(
            projectId,
            req.body,
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: 'Project updated successfully',
            data: project
        });

    } catch (error) {
        console.error('Error:', error.message);
        res.status(400).json({
            success: false,
            message: 'Error updating project'
        });
    }
}

// ================================================
// FUNCTION 6: DELETE PROJECT
// ================================================
// Route: DELETE /api/projects/:id
// Deletes a project

async function deleteProject(req, res) {
    try {
        const projectId = req.params.id;
        const userId = req.session.userId;

        // Find project first to check ownership
        const projectToDelete = await Project.findById(projectId);

        if (!projectToDelete) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        // Verify ownership
        if (projectToDelete.client.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this project'
            });
        }

        await Project.findByIdAndDelete(projectId);

        res.status(200).json({
            success: true,
            message: 'Project deleted successfully'
        });

    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({
            success: false,
            message: 'Error deleting project'
        });
    }
}

// ================================================
// EXPORT ALL FUNCTIONS
// ================================================

module.exports = {
    getAllProjects: getAllProjects,
    getFeaturedProjects: getFeaturedProjects,
    getProjectById: getProjectById,
    createProject: createProject,
    updateProject: updateProject,
    deleteProject: deleteProject
};
