// ================================================
// 📝 REGISTER PAGE - Premium Monochrome
// ================================================
// Clean registration with B&W aesthetic
// ================================================

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

// ================================================
// REGISTER COMPONENT
// ================================================
function Register() {
    var auth = useAuth();
    var register = auth.register;

    var [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        userType: 'freelancer'
    });

    var [error, setError] = useState('');
    var [loading, setLoading] = useState(false);
    var navigate = useNavigate();

    function handleChange(event) {
        var fieldId = event.target.id;
        var fieldValue = event.target.value;
        setFormData({
            ...formData,
            [fieldId]: fieldValue
        });
    }

    function selectUserType(type) {
        setFormData({
            ...formData,
            userType: type
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setError('');

        if (!formData.name) {
            setError('Name is required');
            return;
        }
        if (!formData.email) {
            setError('Email is required');
            return;
        }
        if (!formData.password) {
            setError('Password is required');
            return;
        }
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        try {
            await register(formData);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex bg-white">

            {/* Left Side - Branding (Hidden on mobile) */}
            <div className="hidden lg:flex lg:w-1/2 bg-black relative overflow-hidden">
                {/* Background Image - B&W */}
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-30 grayscale"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')" }}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-between p-16 h-full">
                    <div />

                    {/* Welcome Text */}
                    <div className="mb-12">
                        <h2 className="text-4xl font-bold mb-6 leading-tight text-white">
                            Turn your passion<br />
                            <span className="text-white/70">into success.</span>
                        </h2>
                        <p className="text-lg text-white/60 max-w-md">
                            Join millions of people doing what they love. Connect with top clients and grow your freelance business today.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side - Registration Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white relative">

                {/* Mobile Logo */}
                <div className="absolute top-8 left-8 lg:hidden">
                    <Link to="/" className="text-xl font-bold tracking-tight group">
                        <span className="text-black">get</span>
                        <span className="text-[#00f0ff] group-hover:text-[#ff69b4] transition-colors duration-300">Work</span>
                        <span className="text-[#00f0ff] group-hover:text-[#ff69b4] transition-colors duration-300">.</span>
                    </Link>
                </div>

                {/* Form Container */}
                <div className="w-full max-w-md space-y-8">

                    {/* Header */}
                    <div className="text-center lg:text-left">
                        <h2 className="text-2xl font-semibold text-black mb-2">
                            Create an account
                        </h2>
                        <p className="text-[#6B6B6B]">
                            Already have an account?{' '}
                            <Link to="/login" className="font-medium text-black hover:underline transition-colors">
                                Sign in
                            </Link>
                        </p>
                    </div>

                    {/* Registration Form */}
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>

                        {/* Form Fields */}
                        <div className="space-y-4">
                            <Input
                                id="name"
                                type="text"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />

                            <Input
                                id="email"
                                type="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                            <Input
                                id="password"
                                type="password"
                                placeholder="Password (6+ characters)"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />

                            {/* User Type Selection */}
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={function () { selectUserType('freelancer'); }}
                                    className={
                                        formData.userType === 'freelancer'
                                            ? 'p-3 rounded-xl border-2 text-center transition-all border-black bg-black text-white font-medium'
                                            : 'p-3 rounded-xl border text-center transition-all border-[#E5E5E5] text-[#6B6B6B] hover:border-black'
                                    }
                                >
                                    Become a Freelancer
                                </button>

                                <button
                                    type="button"
                                    onClick={function () { selectUserType('client'); }}
                                    className={
                                        formData.userType === 'client'
                                            ? 'p-3 rounded-xl border-2 text-center transition-all border-black bg-black text-white font-medium'
                                            : 'p-3 rounded-xl border text-center transition-all border-[#E5E5E5] text-[#6B6B6B] hover:border-black'
                                    }
                                >
                                    Hire a Freelancer
                                </button>
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="bg-[#F5F5F5] border border-[#E5E5E5] text-black text-sm rounded-xl p-4 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                                </svg>
                                {error}
                            </div>
                        )}

                        {/* Submit */}
                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? 'Creating Account...' : 'Join getWork'}
                        </Button>

                        {/* Terms */}
                        <p className="text-xs text-center text-[#6B6B6B] mt-4">
                            By joining, you agree to getWork's Terms of Service and Privacy Policy.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
