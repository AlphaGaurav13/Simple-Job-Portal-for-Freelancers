// ================================================
// 🔘 BUTTON COMPONENT - Premium Monochrome
// ================================================
// Pill-shaped buttons with black/white styling
// ================================================

import React from 'react';

// ================================================
// BUTTON COMPONENT
// ================================================
function Button(props) {
    var children = props.children;
    var variant = props.variant || 'primary';
    var size = props.size || 'md';
    var className = props.className || '';
    var disabled = props.disabled || false;
    var type = props.type || 'button';
    var onClick = props.onClick;

    // Base styles - Pill shape
    var baseStyles = 'inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    // Variant styles - Pure black/white
    var variants = {
        primary: 'bg-black text-white hover:bg-[#1A1A1A] hover:scale-[1.02]',
        secondary: 'bg-white text-black border border-[#E5E5E5] hover:border-black hover:bg-[#F5F5F5]',
        outline: 'bg-transparent border border-black text-black hover:bg-black hover:text-white',
        ghost: 'bg-transparent text-[#6B6B6B] hover:text-black hover:bg-[#F5F5F5]',
        danger: 'bg-black text-white hover:bg-[#1A1A1A]'
    };

    // Size styles
    var sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-2.5 text-base',
        lg: 'px-8 py-3.5 text-base',
        xl: 'px-10 py-4 text-lg'
    };

    // Get styles
    var variantStyle = variants[variant] || variants.primary;
    var sizeStyle = sizes[size] || sizes.md;

    // Combine
    var combinedClassName = baseStyles + ' ' + variantStyle + ' ' + sizeStyle + ' ' + className;

    return (
        <button
            type={type}
            className={combinedClassName}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default Button;
