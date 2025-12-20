// ================================================
// 👤 PROFILE PAGE - User Profile Management
// ================================================
// Allows users to view and edit their profile
// Premium minimalist design
// ================================================

// Import React and hooks
import React, { useState, useEffect } from 'react';

// Import auth context
import { useAuth } from '../context/AuthContext';

// Import UI components
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

// API Base URL from environment or default
var API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

// ================================================
// PROFILE COMPONENT
// ================================================
function Profile() {
    const { user, updateUser } = useAuth();

    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({
        type: '',
        text: ''
    });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        title: '',
        bio: '',
        skills: '',
        hourlyRate: '',
        location: '',
        website: '',
        phone: ''
    });

    const [avatarPreview, setAvatarPreview] = useState(null);

    useEffect(function () {
        if (user) {
            const profile = user.profile || {};
            const skillsArray = profile.skills || [];

            setFormData({
                name: user.name || '',
                email: user.email || '',
                title: profile.title || '',
                bio: profile.bio || '',
                skills: skillsArray.join(', '),
                hourlyRate: profile.hourlyRate || '',
                location: profile.location || '',
                website: profile.website || '',
                phone: profile.phone || ''
            });

            if (profile.avatar) {
                setAvatarPreview(profile.avatar);
            }
        }
    }, [user]);

    function handleChange(event) {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;

        setFormData(function (prev) {
            return {
                ...prev,
                [fieldName]: fieldValue
            };
        });
    }

    function handleAvatarChange(event) {
        const file = event.target.files[0];

        if (file) {
            if (!file.type.startsWith('image/')) {
                setMessage({ type: 'error', text: 'Please select an image file' });
                return;
            }

            const maxSize = 5 * 1024 * 1024;
            if (file.size > maxSize) {
                setMessage({ type: 'error', text: 'Image size must be less than 5MB' });
                return;
            }

            const reader = new FileReader();
            reader.onloadend = function () {
                setAvatarPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            // Call profile update API
            const response = await fetch(API_BASE_URL + '/api/users/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    name: formData.name,
                    title: formData.title,
                    bio: formData.bio,
                    skills: formData.skills,
                    hourlyRate: formData.hourlyRate,
                    location: formData.location,
                    website: formData.website,
                    phone: formData.phone,
                    avatar: avatarPreview
                })
            });

            const data = await response.json();

            if (data.success) {
                // Update user context with new data (real-time update)
                updateUser(data.user);

                setMessage({ type: 'success', text: 'Profile updated successfully!' });
                setIsEditing(false);
            } else {
                setMessage({ type: 'error', text: data.message || 'Failed to update profile' });
            }

        } catch (error) {
            const errorMessage = error.message || 'Failed to update profile';
            setMessage({ type: 'error', text: errorMessage });
        } finally {
            setLoading(false);
        }
    }

    function startEditing() {
        setIsEditing(true);
    }

    function cancelEditing() {
        setIsEditing(false);
        setMessage({ type: '', text: '' });
    }

    function getUserInitial() {
        if (formData.name && formData.name.length > 0) {
            return formData.name.charAt(0).toUpperCase();
        }
        return 'U';
    }

    function getUserStats() {
        const stats = user && user.stats ? user.stats : {};
        return {
            projectsCompleted: stats.projectsCompleted || 0,
            rating: stats.rating ? stats.rating.toFixed(1) : '0.0',
            reviewCount: stats.reviewCount || 0
        };
    }

    const isFreelancer = user && user.userType === 'freelancer';

    function getMessageClass() {
        if (message.type === 'success') {
            return 'bg-green-50 border border-green-200 text-green-600';
        }
        return 'bg-red-50 border border-red-200 text-red-600';
    }

    function getUserTypeBadgeClass() {
        if (isFreelancer) {
            return 'bg-neutral-100 text-neutral-700';
        }
        return 'bg-neutral-100 text-neutral-700';
    }

    // ============================================
    // RENDER: Loading state
    // ============================================
    if (!user) {
        return (
            <div className="container-custom py-12">
                <div className="text-center">
                    <p className="text-neutral-500">Loading profile...</p>
                </div>
            </div>
        );
    }

    const userStats = getUserStats();

    // ============================================
    // RENDER: Main content
    // ============================================
    return (
        <div className="min-h-screen bg-neutral-50 pt-24 pb-12">
            <div className="container-custom">
                <div className="max-w-4xl mx-auto">

                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-2xl font-semibold text-neutral-900">My Profile</h1>

                        {/* Edit button (shown when not editing) */}
                        {!isEditing && (
                            <Button onClick={startEditing}>
                                Edit Profile
                            </Button>
                        )}
                    </div>

                    {/* Message Alert */}
                    {message.text && (
                        <div className={'mb-6 p-4 rounded-lg ' + getMessageClass()}>
                            {message.text}
                        </div>
                    )}

                    {/* Profile Card */}
                    <div className="bg-white rounded-xl border border-neutral-200 p-8">
                        <form onSubmit={handleSubmit}>

                            {/* Avatar Section */}
                            <div className="flex items-center mb-8">
                                <div className="relative">
                                    {/* Avatar circle */}
                                    <div className="w-32 h-32 rounded-full overflow-hidden bg-neutral-100 border-4 border-neutral-200">
                                        {avatarPreview ? (
                                            <img
                                                src={avatarPreview}
                                                alt={formData.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-4xl text-neutral-400">
                                                {getUserInitial()}
                                            </div>
                                        )}
                                    </div>

                                    {/* Avatar upload button (shown when editing) */}
                                    {isEditing && (
                                        <label className="absolute bottom-0 right-0 bg-neutral-900 hover:bg-neutral-800 text-white rounded-full p-2 cursor-pointer transition-colors">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleAvatarChange}
                                                className="hidden"
                                            />
                                        </label>
                                    )}
                                </div>

                                {/* User info next to avatar */}
                                <div className="ml-6">
                                    <h2 className="text-xl font-semibold text-neutral-900">{formData.name}</h2>
                                    <p className="text-neutral-500">{formData.title || 'No title set'}</p>
                                    <span className={'inline-block mt-2 px-3 py-1 rounded-full text-sm ' + getUserTypeBadgeClass()}>
                                        {isFreelancer ? '👨‍💻 Freelancer' : '💼 Client'}
                                    </span>
                                </div>
                            </div>

                            {/* Form Fields Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                {/* Name Field */}
                                <div>
                                    <label className="block text-sm font-medium text-neutral-600 mb-2">
                                        Full Name *
                                    </label>
                                    <Input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        required
                                    />
                                </div>

                                {/* Email Field (read-only) */}
                                <div>
                                    <label className="block text-sm font-medium text-neutral-600 mb-2">
                                        Email Address *
                                    </label>
                                    <Input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        disabled={true}
                                    />
                                    <p className="text-xs text-neutral-400 mt-1">Email cannot be changed</p>
                                </div>

                                {/* Title Field */}
                                <div>
                                    <label className="block text-sm font-medium text-neutral-600 mb-2">
                                        Professional Title
                                    </label>
                                    <Input
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        placeholder="e.g., Full Stack Developer"
                                    />
                                </div>

                                {/* Hourly Rate (freelancers only) */}
                                {isFreelancer && (
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-600 mb-2">
                                            Hourly Rate ($)
                                        </label>
                                        <Input
                                            type="number"
                                            name="hourlyRate"
                                            value={formData.hourlyRate}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            placeholder="50"
                                            min="0"
                                        />
                                    </div>
                                )}

                                {/* Location Field */}
                                <div>
                                    <label className="block text-sm font-medium text-neutral-600 mb-2">
                                        Location
                                    </label>
                                    <Input
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        placeholder="New York, USA"
                                    />
                                </div>

                                {/* Phone Field */}
                                <div>
                                    <label className="block text-sm font-medium text-neutral-600 mb-2">
                                        Phone Number
                                    </label>
                                    <Input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        placeholder="+1 234 567 8900"
                                    />
                                </div>

                                {/* Website Field (full width) */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-neutral-600 mb-2">
                                        Website
                                    </label>
                                    <Input
                                        type="url"
                                        name="website"
                                        value={formData.website}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        placeholder="https://yourwebsite.com"
                                    />
                                </div>

                                {/* Skills Field (freelancers only, full width) */}
                                {isFreelancer && (
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-neutral-600 mb-2">
                                            Skills (comma-separated)
                                        </label>
                                        <Input
                                            name="skills"
                                            value={formData.skills}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            placeholder="React, Node.js, MongoDB, JavaScript"
                                        />
                                    </div>
                                )}

                                {/* Bio Field (full width) */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-neutral-600 mb-2">
                                        Bio
                                    </label>
                                    <textarea
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        rows="4"
                                        className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-lg text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        placeholder="Tell us about yourself..."
                                    />
                                </div>
                            </div>

                            {/* Action Buttons (shown when editing) */}
                            {isEditing && (
                                <div className="flex gap-4 mt-8">
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading ? 'Saving...' : 'Save Changes'}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        onClick={cancelEditing}
                                        disabled={loading}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        {/* Projects Completed */}
                        <div className="bg-white rounded-xl border border-neutral-200 p-6 text-center">
                            <div className="text-3xl font-semibold text-neutral-900">
                                {userStats.projectsCompleted}
                            </div>
                            <div className="text-neutral-500 mt-2">Projects Completed</div>
                        </div>

                        {/* Rating */}
                        <div className="bg-white rounded-xl border border-neutral-200 p-6 text-center">
                            <div className="text-3xl font-semibold text-yellow-500">
                                {userStats.rating}
                            </div>
                            <div className="text-neutral-500 mt-2">Rating</div>
                        </div>

                        {/* Reviews */}
                        <div className="bg-white rounded-xl border border-neutral-200 p-6 text-center">
                            <div className="text-3xl font-semibold text-green-600">
                                {userStats.reviewCount}
                            </div>
                            <div className="text-neutral-500 mt-2">Reviews</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Export the component
export default Profile;

