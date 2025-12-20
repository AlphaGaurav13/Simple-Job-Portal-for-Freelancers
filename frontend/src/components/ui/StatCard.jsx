// ================================================
// 📊 STAT CARD COMPONENT - Apple-Inspired Minimal
// ================================================
// Premium monochrome design with subtle elevation
// Clean, minimal, and luxury aesthetic
// ================================================

import React from 'react';

// ================================================
// STAT CARD COMPONENT
// ================================================
function StatCard(props) {
    const icon = props.icon;
    const label = props.label;
    const value = props.value;
    const trend = props.trend;
    const trendValue = props.trendValue;
    const valueColor = props.valueColor || 'text-[#1C1C1E]';

    function getTrendArrow() {
        if (trend === 'up') return '↑';
        if (trend === 'down') return '↓';
        return '';
    }

    function getTrendStyle() {
        if (trend === 'up') return 'text-[#1C1C1E]';
        if (trend === 'down') return 'text-[#8E8E93]';
        return 'text-[#8E8E93]';
    }

    return (
        <div
            onClick={props.onClick}
            className="
                bg-white rounded-2xl p-6 cursor-pointer group
                border border-[#E5E5EA]
                shadow-sm hover:shadow-md
                transition-all duration-300 ease-out
                hover:-translate-y-0.5
            "
        >
            <div className="flex items-start justify-between">
                {/* Left: Content */}
                <div>
                    <p className="text-[#8E8E93] text-sm font-medium tracking-wide uppercase mb-1">
                        {label}
                    </p>
                    <h3 className={`text-4xl font-semibold tracking-tight mb-2 ${valueColor}`}>
                        {value}
                    </h3>

                    {/* Trend Badge */}
                    {trend && trendValue && (
                        <div className={`inline-flex items-center gap-1 text-sm font-medium ${getTrendStyle()}`}>
                            <span>{getTrendArrow()}</span>
                            <span>{trendValue}</span>
                        </div>
                    )}
                </div>

                {/* Right: Icon - Hover effect only on icon */}
                <div className="p-3 rounded-xl bg-[#F5F5F7] text-[#8E8E93] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#E5E5EA]">
                    {icon}
                </div>
            </div>
        </div>
    );
}

export default StatCard;
