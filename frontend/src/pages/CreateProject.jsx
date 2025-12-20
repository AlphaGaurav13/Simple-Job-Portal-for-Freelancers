// ================================================
// 📝 CREATE PROJECT PAGE - Post New Job/Project
// ================================================
// Form for clients to post new projects
//
// CONCEPTS USED:
// - Functional Components
// - useState, useEffect (React Hooks)
// - Forms (Controlled Components)
// - Form Validation
// - Spread Operator
// - Array Methods (filter, map, slice)
// ================================================

// Import React and hooks
import React, { useState } from 'react';

// Import navigation
import { useNavigate } from 'react-router-dom';

// Import context and API
import { useAuth } from '../context/AuthContext';
import { projectAPI } from '../api/api';

// Import UI components
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

// ================================================
// CATEGORY OPTIONS
// ================================================
const CATEGORIES = [
    'Graphic & Design',
    'Digital Marketing',
    'Writing & Translation',
    'Video & Animation',
    'Programming & Tech',
    'Music & Audio'
];

// ================================================
// CREATE PROJECT COMPONENT
// ================================================
function CreateProject() {
    // ============================================
    // HOOKS & STATE
    // ============================================

    // Get user from auth context
    const { user } = useAuth();

    // Get navigate function
    const navigate = useNavigate();

    // Loading state
    const [loading, setLoading] = useState(false);

    // Validation errors
    const [errors, setErrors] = useState({});

    // File attachments
    const [attachments, setAttachments] = useState([]);

    // Form data state
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        skills: '',
        budgetType: 'fixed',
        budgetFixed: '',
        budgetMin: '',
        budgetMax: '',
        durationValue: '',
        durationUnit: 'days',
        deadline: ''
    });

    // ============================================
    // EVENT HANDLERS
    // ============================================

    // Handle input field changes
    function handleChange(event) {
        // Get field name and value
        const fieldName = event.target.name;
        const fieldValue = event.target.value;

        // Update form data
        setFormData(function (prev) {
            return {
                ...prev,
                [fieldName]: fieldValue
            };
        });

        // Clear error for this field if exists
        if (errors[fieldName]) {
            setErrors(function (prev) {
                return {
                    ...prev,
                    [fieldName]: ''
                };
            });
        }
    }

    // Handle file selection
    function handleFileChange(event) {
        // Convert FileList to array using Array.from
        const files = Array.from(event.target.files);

        // Filter files larger than 10MB
        const maxFileSize = 10 * 1024 * 1024;
        const validFiles = files.filter(function (file) {
            return file.size <= maxFileSize;
        });

        // Show error if some files were too large
        if (validFiles.length < files.length) {
            setErrors(function (prev) {
                return {
                    ...prev,
                    attachments: 'Some files were too large (max 10MB each)'
                };
            });
        }

        // Add valid files (max 5 total)
        setAttachments(function (prev) {
            const combined = [...prev, ...validFiles];
            return combined.slice(0, 5);
        });
    }

    // Remove attachment by index
    function removeAttachment(index) {
        setAttachments(function (prev) {
            return prev.filter(function (file, i) {
                return i !== index;
            });
        });
    }

    // ============================================
    // VALIDATION
    // ============================================
    function validate() {
        const newErrors = {};

        // Title validation
        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        } else if (formData.title.length < 10) {
            newErrors.title = 'Title must be at least 10 characters';
        }

        // Description validation
        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        } else if (formData.description.length < 50) {
            newErrors.description = 'Description must be at least 50 characters';
        }

        // Category validation
        if (!formData.category) {
            newErrors.category = 'Category is required';
        }

        // Skills validation
        if (!formData.skills.trim()) {
            newErrors.skills = 'At least one skill is required';
        }

        // Budget validation
        if (formData.budgetType === 'fixed') {
            if (!formData.budgetFixed || Number(formData.budgetFixed) <= 0) {
                newErrors.budgetFixed = 'Fixed budget must be greater than 0';
            }
        } else {
            if (!formData.budgetMin || Number(formData.budgetMin) <= 0) {
                newErrors.budgetMin = 'Minimum budget must be greater than 0';
            }
            if (!formData.budgetMax || Number(formData.budgetMax) <= 0) {
                newErrors.budgetMax = 'Maximum budget must be greater than 0';
            }
            if (formData.budgetMin && formData.budgetMax) {
                if (parseFloat(formData.budgetMin) >= parseFloat(formData.budgetMax)) {
                    newErrors.budgetMax = 'Maximum budget must be greater than minimum';
                }
            }
        }

        // Duration validation
        if (!formData.durationValue || Number(formData.durationValue) <= 0) {
            newErrors.durationValue = 'Duration is required';
        }

        // Update errors state
        setErrors(newErrors);

        // Return true if no errors
        const errorKeys = Object.keys(newErrors);
        return errorKeys.length === 0;
    }

    // ============================================
    // FORM SUBMISSION
    // ============================================
    async function handleSubmit(event) {
        // Prevent default form submission
        event.preventDefault();

        // Validate form
        if (!validate()) {
            return;
        }

        // Set loading state
        setLoading(true);

        try {
            // Parse skills from comma-separated string
            const skillsArray = formData.skills
                .split(',')
                .map(function (skill) {
                    return skill.trim();
                })
                .filter(function (skill) {
                    return skill.length > 0;
                });

            // Build budget object
            let budgetObject = {
                type: formData.budgetType
            };

            if (formData.budgetType === 'fixed') {
                budgetObject.fixed = parseFloat(formData.budgetFixed);
            } else {
                budgetObject.min = parseFloat(formData.budgetMin);
                budgetObject.max = parseFloat(formData.budgetMax);
            }

            // Build project data
            const projectData = {
                title: formData.title,
                description: formData.description,
                category: formData.category,
                skills: skillsArray,
                budget: budgetObject,
                duration: {
                    value: parseInt(formData.durationValue),
                    unit: formData.durationUnit
                },
                client: user.id,
                status: 'open',
                isFeatured: false
            };

            // Add deadline if provided
            if (formData.deadline) {
                projectData.deadline = new Date(formData.deadline);
            }

            // Call API to create project
            await projectAPI.create(projectData);

            // Navigate to dashboard on success
            navigate('/dashboard');

        } catch (error) {
            // Show error message
            const errorMessage = error.message || 'Failed to create project';
            setErrors({ submit: errorMessage });
        } finally {
            // Reset loading state
            setLoading(false);
        }
    }

    // Handle cancel button click
    function handleCancel() {
        navigate('/dashboard');
    }

    // ============================================
    // HELPER FUNCTIONS
    // ============================================

    // Get minimum date for deadline (today)
    function getMinDate() {
        const today = new Date();
        return today.toISOString().split('T')[0];
    }

    // ============================================
    // RENDER
    // ============================================
    return (
        <div className="min-h-screen bg-surface-primary pt-24 pb-12">
            <div className="container-custom">
                <div className="max-w-4xl mx-auto">

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-content-primary mb-2">
                            Post a New Project
                        </h1>
                        <p className="text-content-secondary">
                            Fill in the details to find the perfect freelancer for your project
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="bg-surface-secondary rounded-lg shadow-card p-8">

                        {/* Submit Error */}
                        {errors.submit && (
                            <div className="mb-6 p-4 bg-danger/10 border border-danger/20 text-danger rounded-lg">
                                {errors.submit}
                            </div>
                        )}

                        {/* Project Title */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-content-secondary mb-2">
                                Project Title *
                            </label>
                            <Input
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g., I need a React developer to build a dashboard"
                            />
                            {errors.title && (
                                <p className="mt-1 text-sm text-danger">{errors.title}</p>
                            )}
                        </div>

                        {/* Category */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-content-secondary mb-2">
                                Category *
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-surface-primary border border-surface-tertiary rounded-lg text-content-primary focus:outline-none focus:border-primary transition-colors"
                            >
                                <option value="">Select a category</option>
                                {CATEGORIES.map(function (cat) {
                                    return <option key={cat} value={cat}>{cat}</option>;
                                })}
                            </select>
                            {errors.category && (
                                <p className="mt-1 text-sm text-danger">{errors.category}</p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-content-secondary mb-2">
                                Project Description *
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="6"
                                className="w-full px-4 py-3 bg-surface-primary border border-surface-tertiary rounded-lg text-content-primary placeholder-content-tertiary focus:outline-none focus:border-primary transition-colors"
                                placeholder="Describe your project in detail. Include requirements, expectations, and any other relevant information..."
                            />
                            <div className="flex justify-between mt-1">
                                <p className="text-sm text-content-tertiary">
                                    {formData.description.length} / 2000 characters
                                </p>
                                {errors.description && (
                                    <p className="text-sm text-danger">{errors.description}</p>
                                )}
                            </div>
                        </div>

                        {/* Skills Required */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-content-secondary mb-2">
                                Required Skills (comma-separated) *
                            </label>
                            <Input
                                name="skills"
                                value={formData.skills}
                                onChange={handleChange}
                                placeholder="React, Node.js, MongoDB, JavaScript"
                            />
                            {errors.skills && (
                                <p className="mt-1 text-sm text-danger">{errors.skills}</p>
                            )}
                        </div>

                        {/* Budget Type */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-content-secondary mb-2">
                                Budget Type *
                            </label>
                            <div className="flex gap-4">
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name="budgetType"
                                        value="fixed"
                                        checked={formData.budgetType === 'fixed'}
                                        onChange={handleChange}
                                        className="mr-2"
                                    />
                                    <span className="text-content-primary">Fixed Price</span>
                                </label>
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name="budgetType"
                                        value="hourly"
                                        checked={formData.budgetType === 'hourly'}
                                        onChange={handleChange}
                                        className="mr-2"
                                    />
                                    <span className="text-content-primary">Hourly Rate</span>
                                </label>
                            </div>
                        </div>

                        {/* Budget Fields */}
                        {formData.budgetType === 'fixed' ? (
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-content-secondary mb-2">
                                    Fixed Budget ($) *
                                </label>
                                <Input
                                    type="number"
                                    name="budgetFixed"
                                    value={formData.budgetFixed}
                                    onChange={handleChange}
                                    placeholder="500"
                                    min="1"
                                />
                                {errors.budgetFixed && (
                                    <p className="mt-1 text-sm text-danger">{errors.budgetFixed}</p>
                                )}
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-content-secondary mb-2">
                                        Minimum ($) *
                                    </label>
                                    <Input
                                        type="number"
                                        name="budgetMin"
                                        value={formData.budgetMin}
                                        onChange={handleChange}
                                        placeholder="20"
                                        min="1"
                                    />
                                    {errors.budgetMin && (
                                        <p className="mt-1 text-sm text-danger">{errors.budgetMin}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-content-secondary mb-2">
                                        Maximum ($) *
                                    </label>
                                    <Input
                                        type="number"
                                        name="budgetMax"
                                        value={formData.budgetMax}
                                        onChange={handleChange}
                                        placeholder="50"
                                        min="1"
                                    />
                                    {errors.budgetMax && (
                                        <p className="mt-1 text-sm text-danger">{errors.budgetMax}</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Duration */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-content-secondary mb-2">
                                    Project Duration *
                                </label>
                                <Input
                                    type="number"
                                    name="durationValue"
                                    value={formData.durationValue}
                                    onChange={handleChange}
                                    placeholder="7"
                                    min="1"
                                />
                                {errors.durationValue && (
                                    <p className="mt-1 text-sm text-danger">{errors.durationValue}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-content-secondary mb-2">
                                    Unit
                                </label>
                                <select
                                    name="durationUnit"
                                    value={formData.durationUnit}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-surface-primary border border-surface-tertiary rounded-lg text-content-primary focus:outline-none focus:border-primary transition-colors"
                                >
                                    <option value="days">Days</option>
                                    <option value="weeks">Weeks</option>
                                    <option value="months">Months</option>
                                </select>
                            </div>
                        </div>

                        {/* Deadline */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-content-secondary mb-2">
                                Deadline (Optional)
                            </label>
                            <Input
                                type="date"
                                name="deadline"
                                value={formData.deadline}
                                onChange={handleChange}
                                min={getMinDate()}
                            />
                        </div>

                        {/* Attachments */}
                        <div className="mb-8">
                            <label className="block text-sm font-medium text-content-secondary mb-2">
                                Attachments (Optional)
                            </label>
                            <div className="border-2 border-dashed border-surface-tertiary rounded-lg p-6 text-center hover:border-primary transition-colors">
                                <input
                                    type="file"
                                    multiple
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="file-upload"
                                    accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                                />
                                <label htmlFor="file-upload" className="cursor-pointer">
                                    <svg className="mx-auto h-12 w-12 text-content-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    <p className="mt-2 text-content-secondary">Click to upload files</p>
                                    <p className="text-xs text-content-tertiary mt-1">Max 5 files, 10MB each</p>
                                </label>
                            </div>
                            {errors.attachments && (
                                <p className="mt-1 text-sm text-danger">{errors.attachments}</p>
                            )}

                            {/* File List */}
                            {attachments.length > 0 && (
                                <div className="mt-4 space-y-2">
                                    {attachments.map(function (file, index) {
                                        return (
                                            <div key={index} className="flex items-center justify-between bg-surface-primary p-3 rounded-lg">
                                                <span className="text-content-primary text-sm">{file.name}</span>
                                                <button
                                                    type="button"
                                                    onClick={function () { removeAttachment(index); }}
                                                    className="text-danger hover:text-danger/80"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex gap-4">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="flex-1"
                            >
                                {loading ? 'Posting...' : 'Post Project'}
                            </Button>
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={handleCancel}
                                disabled={loading}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

// Export the component
export default CreateProject;
