import React, { useState } from "react";

export default function Login({ onClose, onSwitchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [useOtp, setUseOtp] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (useOtp) {
      if (!otpSent) {
        alert("Please send and verify OTP to your email first");
        return;
      }
      if (!otpVerified) {
        alert("Please verify your email with OTP before submitting");
        return;
      }
    } else {
      if (!password) {
        alert("Please enter your password");
        return;
      }
    }
    // wire up your login logic here
    alert("Login submitted");
  };

  const handleSendOtp = async () => {
    if (!email) {
      alert("Please enter your email address first");
      return;
    }
    
    setIsSendingOtp(true);
    // TODO: Replace with actual API call to send OTP
    // Example: await fetch('/api/send-otp', { method: 'POST', body: JSON.stringify({ email }) });
    
    // Simulate API call
    setTimeout(() => {
      setOtpSent(true);
      setIsSendingOtp(false);
      alert(`OTP sent to ${email} (This is a placeholder - integrate with your backend)`);
    }, 1000);
  };

  const handleVerifyOtp = () => {
    // TODO: Replace with actual API call to verify OTP
    // Example: await fetch('/api/verify-otp', { method: 'POST', body: JSON.stringify({ email, otp }) });
    
    if (otp.length === 6) {
      // Simulate OTP verification
      setOtpVerified(true);
      alert("OTP verified successfully (This is a placeholder - integrate with your backend)");
    } else {
      alert("Please enter a valid 6-digit OTP");
    }
  };

  // The design shows only an email input first, then a 'Continue' button, 
  // followed by 'Or' and social sign-in.
  return (
    <div className="min-h-screen flex bg-[#2E5049] md:bg-transparent">
      {/* Left hero */}
      {/* Set the background and Behance logo to match the image */}
      <div
        className="hidden md:flex w-1/2 bg-cover bg-center items-center justify-start relative p-12"
        style={{
          // Use the provided image as the basis for the background
          backgroundImage: "url('/auth-bg.jpg')",
          backgroundColor: "#2E5049", // A fallback or primary color from the background
        }}
      >
        <div className="absolute inset-0 bg-black opacity-20" />
        {/* Behance Logo and Text (top-left) */}
        <div className="absolute top-12 left-12 z-10 flex items-center gap-2">
          {/* Logo icon (Adjusting for the Be text in a box) */}
          <div className="w-8 h-8 rounded-md bg-black/75 flex items-center justify-center text-white font-bold text-lg">
            Be
          </div>
          <h2 className="text-white text-3xl font-semibold tracking-tight">Tasklance</h2>
        </div>
        {/* Placeholder for the design image's bottom-left text */}
        <div className="absolute bottom-12 left-12 z-10">
          <p className="text-white text-sm">
            Aic: Wiry poor
            <br />
            Now
          </p>
        </div>
        {/* Placeholder for the design image's bottom-right icons */}
        <div className="absolute bottom-12 right-12 z-10 flex gap-4">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-gray-700">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm0-4h-2V7h2v8z"/>
            </svg>
          </div>
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-gray-700">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm0-4h-2V7h2v8z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Right form container */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white rounded-lg shadow-2xl p-10 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            {/* Using the common close icon from the design's context, though not visible on the login screen */}
            ✕
          </button>

          <h1 className="text-3xl font-bold text-gray-800 mb-2">Sign in</h1>
          <p className="text-sm text-gray-500 mb-8">
            New user?{" "}
            <button 
              onClick={onSwitchToRegister} 
              className="text-blue-600 font-medium hover:underline focus:outline-none"
            >
              Create an account
            </button>
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (useOtp) {
                    setOtpSent(false);
                    setOtpVerified(false);
                    setOtp("");
                  }
                }}
                className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-base focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none"
                placeholder=""
                required
              />
            </div>

            {/* Password Field - shown when OTP is not selected */}
            {!useOtp && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-base focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none"
                  required
                />
              </div>
            )}

            {/* OTP Section with Checkbox - shown below password */}
            <div className="space-y-3 p-4 bg-blue-50 border border-blue-200 rounded-md">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={useOtp}
                  onChange={(e) => {
                    setUseOtp(e.target.checked);
                    if (!e.target.checked) {
                      setOtpSent(false);
                      setOtpVerified(false);
                      setOtp("");
                    }
                  }}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Login with OTP</span>
              </label>

              {/* OTP Verification Section - shown when checkbox is checked */}
              {useOtp && (
                <div className="space-y-3 mt-3">
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={isSendingOtp || !email}
                    className="w-full px-4 py-2.5 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isSendingOtp ? "Sending..." : "Send OTP"}
                  </button>

                  {otpSent && (
                    <>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Enter OTP sent to {email}
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={otp}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                            setOtp(value);
                            setOtpVerified(false);
                          }}
                          placeholder="Enter 6-digit OTP"
                          className="flex-1 border border-gray-300 rounded-md px-3 py-2.5 text-base focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none"
                          maxLength={6}
                        />
                        <button
                          type="button"
                          onClick={handleVerifyOtp}
                          disabled={otp.length !== 6 || otpVerified}
                          className="px-4 py-2.5 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed whitespace-nowrap"
                        >
                          {otpVerified ? "✓ Verified" : "Verify"}
                        </button>
                      </div>
                      
                      {/* OTP Verification Checkbox */}
                      <label className="flex items-center gap-2 text-sm cursor-pointer">
                        <input
                          type="checkbox"
                          checked={otpVerified}
                          onChange={(e) => {
                            if (e.target.checked && otp.length === 6) {
                              handleVerifyOtp();
                            } else {
                              setOtpVerified(false);
                            }
                          }}
                          disabled={!otpSent || otp.length !== 6}
                          className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                        <span className={`text-sm ${otpVerified ? "text-green-600 font-medium" : "text-gray-600"}`}>
                          {otpVerified ? "✓ Email verified with OTP" : "Verify email with OTP"}
                        </span>
                      </label>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Continue button - hidden when OTP is selected */}
            {!useOtp && (
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2.5 rounded-md font-semibold hover:bg-blue-700 transition"
              >
                Continue
              </button>
            )}
          </form>

          <div className="my-6 flex items-center">
            <div className="flex-1 h-px bg-gray-200" />
            <div className="px-3 text-sm text-gray-400">Or</div>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <div className="space-y-3">
            {/* Social buttons matching the design: full width, rounded, with icons */}
            <button
              type="button"
              className="w-full border border-gray-300 rounded-full py-2 px-4 flex items-center gap-3 justify-center hover:bg-gray-50 transition"
            >
              <img src="https://www.svgrepo.com/show/355037/google.svg" alt="google" className="w-5 h-5" />
              <span className="text-sm font-medium">Continue with Google</span>
            </button>

            <button
              type="button"
              className="w-full border border-gray-300 rounded-full py-2 px-4 flex items-center gap-3 justify-center hover:bg-gray-50 transition"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="text-sm font-medium">Continue with Facebook</span>
            </button>
          </div>
          
          {/* More sign in options link */}
          <div className="text-center mt-5">
            <a className="text-sm text-blue-600 hover:underline cursor-pointer">
              More sign in options
            </a>
          </div>
          
          {/* The "Get help signing in" link is placed at the bottom in the design */}
          <div className="text-center mt-8 pt-4 border-t border-gray-100">
            <a className="text-sm text-gray-500 hover:underline cursor-pointer">
              Get help signing in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}