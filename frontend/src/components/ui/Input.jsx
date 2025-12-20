// ================================================
// 📝 INPUT COMPONENT - Premium Monochrome
// ================================================
// Clean input with refined focus states
// ================================================

import React from 'react';

// ================================================
// INPUT COMPONENT
// ================================================
var Input = React.forwardRef(function (props, ref) {
    var id = props.id;
    var name = props.name;
    var type = props.type || 'text';
    var placeholder = props.placeholder;
    var value = props.value;
    var onChange = props.onChange;
    var required = props.required || false;
    var className = props.className || '';
    var label = props.label;
    var disabled = props.disabled || false;

    // Base styles - Clean with refined border
    var inputStyles = 'w-full bg-white border border-[#E5E5E5] rounded-xl px-4 py-3.5 text-black placeholder-[#6B6B6B] focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200';

    return (
        <div className="w-full">
            {/* Label */}
            {label && (
                <label
                    htmlFor={id}
                    className="block text-sm font-medium text-black mb-2"
                >
                    {label}
                </label>
            )}

            {/* Input */}
            <input
                ref={ref}
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                disabled={disabled}
                className={inputStyles + ' ' + className}
            />
        </div>
    );
});

export default Input;
