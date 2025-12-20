const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth');
const Proposal = require('../models/Proposal');
const Project = require('../models/Project');
const User = require('../models/User');

// POST /api/proposals - Create a new proposal
router.post('/', requireAuth, async function (req, res) {
    try {
        const { gigId, sellerId } = req.body;
        const freelancerId = req.session.userId;

        // Fetch project to verify owner
        const project = await Project.findById(gigId);
        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Gig not found'
            });
        }

        // PREVENT OWNER FROM APPLYING TO OWN GIG
        if (project.client.toString() === freelancerId) {
            return res.status(400).json({
                success: false,
                message: 'You cannot send a request to your own gig.'
            });
        }

        // Check if proposal already exists
        const existingProposal = await Proposal.findOne({
            gigId: gigId,
            freelancerId: freelancerId,
            status: 'pending'
        });

        if (existingProposal) {
            return res.status(400).json({
                success: false,
                message: 'You have already sent a request for this gig.'
            });
        }

        const newProposal = new Proposal({
            gigId: gigId,
            clientId: sellerId,
            freelancerId: freelancerId,
            status: 'pending'
        });

        await newProposal.save();
        console.log('✅ Proposal created:', newProposal._id);

        res.status(201).json({
            success: true,
            message: 'Request sent successfully!',
            data: newProposal
        });

    } catch (error) {
        console.error('Error creating proposal:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send request'
        });
    }
});

// GET /api/proposals/received - Get received proposals
router.get('/received', requireAuth, async function (req, res) {
    try {
        const userId = req.session.userId;

        const proposals = await Proposal.find({
            clientId: userId,
            status: 'pending'
        })
            .populate('freelancerId', 'name avatar')
            .populate('gigId', 'title')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: proposals.length,
            data: proposals
        });
    } catch (error) {
        console.error('Error fetching proposals:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch requests'
        });
    }
});

// GET /api/proposals/by-gig/:gigId - Get all proposals for a specific gig
router.get('/by-gig/:gigId', requireAuth, async function (req, res) {
    try {
        const { gigId } = req.params;
        const userId = req.session.userId;

        // Verify user owns this gig
        const project = await Project.findById(gigId);
        if (!project) {
            return res.status(404).json({ success: false, message: 'Gig not found' });
        }
        if (project.client.toString() !== userId) {
            return res.status(403).json({ success: false, message: 'Not authorized to view proposals for this gig' });
        }

        const proposals = await Proposal.find({ gigId: gigId })
            .populate('freelancerId', 'name avatar email')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: proposals.map(function (p) {
                return {
                    id: p._id,
                    status: p.status,
                    createdAt: p.createdAt,
                    user: {
                        id: p.freelancerId._id,
                        name: p.freelancerId.name,
                        avatar: p.freelancerId.avatar
                    }
                };
            })
        });
    } catch (error) {
        console.error('Error fetching proposals for gig:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// GET /api/proposals/check/:gigId - Check if user has already applied
router.get('/check/:gigId', requireAuth, async function (req, res) {
    try {
        const { gigId } = req.params;
        const userId = req.session.userId;

        const proposal = await Proposal.findOne({
            gigId: gigId,
            freelancerId: userId
        });

        res.json({
            success: true,
            hasApplied: !!proposal,
            status: proposal ? proposal.status : null
        });

    } catch (error) {
        console.error('Error checking proposal status:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to check status'
        });
    }
});

const orderRoutes = require('./orders');

// POST /api/proposals/:id/accept - Accept a proposal
router.post('/:id/accept', requireAuth, async function (req, res) {
    try {
        const proposalId = req.params.id;
        const userId = req.session.userId;

        const proposal = await Proposal.findById(proposalId).populate('gigId').populate('freelancerId');

        if (!proposal) {
            return res.status(404).json({ success: false, message: 'Request not found' });
        }

        // Verify owner
        if (proposal.clientId.toString() !== userId) {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }

        if (proposal.status === 'accepted') {
            return res.status(400).json({ success: false, message: 'Request already accepted' });
        }

        // ATOMIC LOCK: Only allow acceptance if project is still open
        const updatedProject = await Project.findOneAndUpdate(
            { _id: proposal.gigId._id, status: 'open' },
            { status: 'in_progress', freelancer: proposal.freelancerId._id },
            { new: true }
        );

        if (!updatedProject) {
            return res.status(400).json({
                success: false,
                message: 'This project is no longer available or has already been assigned.'
            });
        }

        // Now safe to accept proposal and create order
        proposal.status = 'accepted';
        await proposal.save();

        const clientUser = await User.findById(proposal.clientId);
        const order = await orderRoutes.createOrderInternal({
            gigId: proposal.gigId._id,
            title: proposal.gigId.title,
            amount: proposal.gigId.budget?.fixed || 0,
            clientId: proposal.clientId,
            client: clientUser ? clientUser.name : 'Unknown Client',
            seller: proposal.freelancerId.name,
            sellerId: proposal.freelancerId._id,
            packageType: 'Custom Offer'
        });

        res.json({
            success: true,
            message: 'Request accepted. Order started.',
            proposal: proposal,
            order: order
        });
    } catch (error) {
        console.error('Error accepting proposal:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to accept request'
        });
    }
});

// POST /api/proposals/:id/reject - Reject a proposal
router.post('/:id/reject', requireAuth, async function (req, res) {
    try {
        const proposalId = req.params.id;
        const userId = req.session.userId;

        const proposal = await Proposal.findById(proposalId);

        if (!proposal) {
            return res.status(404).json({ success: false, message: 'Request not found' });
        }

        // Verify owner
        if (proposal.clientId.toString() !== userId) {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }

        if (proposal.status === 'rejected') {
            return res.status(400).json({ success: false, message: 'Request already rejected' });
        }

        proposal.status = 'rejected';
        await proposal.save();

        res.json({
            success: true,
            message: 'Request rejected.',
            proposal: proposal
        });
    } catch (error) {
        console.error('Error rejecting proposal:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to reject request'
        });
    }
});

module.exports = router;

