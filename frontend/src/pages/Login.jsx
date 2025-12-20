// ================================================
// 🔐 LOGIN PAGE - Premium Monochrome
// ================================================
// Clean centered login with B&W aesthetic
// ================================================

import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

// ================================================
// LOGIN COMPONENT
// ================================================
function Login() {
    var auth = useAuth();
    var login = auth.login;

    var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
    var [error, setError] = useState('');
    var [loading, setLoading] = useState(false);

    var navigate = useNavigate();
    var location = useLocation();

    // Redirect path
    var from = location.state && location.state.from ? location.state.from.pathname : '/dashboard';
    var search = location.state && location.state.from ? location.state.from.search : '';

    // Handle submit
    async function handleSubmit(event) {
        event.preventDefault();
        setError('');

        if (!email) {
            setError('Email is required');
            return;
        }

        if (!password) {
            setError('Password is required');
            return;
        }

        setLoading(true);

        try {
            await login({ email: email, password: password });
            navigate(from + search, { replace: true });
        } catch (err) {
            setError(err.message || 'Invalid email or password');
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
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')" }}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-between p-16 h-full">
                    <div />

                    {/* Welcome Text */}
                    <div className="mb-12">
                        <h2 className="text-4xl font-bold mb-6 leading-tight text-white">
                            Welcome back to<br />
                            <span className="text-white/70">your workspace.</span>
                        </h2>
                        <p className="text-lg text-white/60 max-w-md">
                            Access your projects, messages, and orders. Keep building your dream business.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white">

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
                            Sign in to getWork
                        </h2>
                        <p className="text-[#6B6B6B]">
                            New here?{' '}
                            <Link to="/join" className="font-medium text-black hover:underline transition-colors">
                                Create an account
                            </Link>
                        </p>
                    </div>

                    {/* Login Form */}
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>

                        {/* Fields */}
                        <div className="space-y-4">
                            <Input
                                id="email"
                                type="email"
                                placeholder="Email or Username"
                                value={email}
                                onChange={function (e) { setEmail(e.target.value); }}
                                required
                            />

                            <Input
                                id="password"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={function (e) { setPassword(e.target.value); }}
                                required
                            />
                        </div>

                        {/* Remember Me & Forgot */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-black focus:ring-black border-[#E5E5E5] rounded cursor-pointer"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-[#6B6B6B] cursor-pointer">
                                    Remember me
                                </label>
                            </div>
                            <div className="text-sm">
                                <a href="#" className="font-medium text-black hover:underline">
                                    Forgot password?
                                </a>
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
                            {loading ? 'Signing In...' : 'Continue'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
