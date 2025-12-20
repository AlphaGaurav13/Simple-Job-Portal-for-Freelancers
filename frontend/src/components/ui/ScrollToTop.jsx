// ================================================
// ⬆️ SCROLL TO TOP - Button Component
// ================================================
// Shows a button to scroll back to top of page
// Premium minimalist design
// ================================================

// Import React and hooks
import React, { useState, useEffect } from 'react';

// ================================================
// SCROLL TO TOP COMPONENT
// ================================================
function ScrollToTop() {
    // State to track if button should be visible
    const [isVisible, setIsVisible] = useState(false);

    // ============================================
    // EFFECT: Listen for scroll events
    // ============================================
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    // ============================================
    // FUNCTION: Scroll to top
    // ============================================
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // ============================================
    // RENDER
    // ============================================
    return (
        <>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-neutral-900 text-white shadow-lg hover:bg-neutral-800 hover:-translate-y-1 transition-all duration-200 border border-neutral-700"
                    aria-label="Scroll to top"
                >
                    {/* Up Arrow Icon */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                    </svg>
                </button>
            )}
        </>
    );
}

// Export the component
export default ScrollToTop;

