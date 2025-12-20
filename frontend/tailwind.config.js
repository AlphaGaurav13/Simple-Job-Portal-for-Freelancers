/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Primary accent - Black
                primary: 'rgb(var(--color-primary) / <alpha-value>)',
                secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
                success: 'rgb(var(--color-success) / <alpha-value>)',
                warning: 'rgb(var(--color-warning) / <alpha-value>)',
                danger: 'rgb(var(--color-danger) / <alpha-value>)',

                // Surfaces - White theme
                'surface-primary': 'rgb(var(--bg-primary) / <alpha-value>)',
                'surface-secondary': 'rgb(var(--bg-secondary) / <alpha-value>)',
                'surface-tertiary': 'rgb(var(--bg-tertiary) / <alpha-value>)',
                'surface-hover': 'rgb(var(--bg-hover) / <alpha-value>)',

                // Content - Black text hierarchy
                'content-primary': 'rgb(var(--text-primary) / <alpha-value>)',
                'content-secondary': 'rgb(var(--text-secondary) / <alpha-value>)',
                'content-tertiary': 'rgb(var(--text-tertiary) / <alpha-value>)',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
            },
            boxShadow: {
                'card': '0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)',
                'card-hover': '0 4px 12px rgba(0, 0, 0, 0.08)',
                'subtle': '0 1px 2px rgba(0, 0, 0, 0.04)',
            },
            borderRadius: {
                'xl': '14px',
            },
            animation: {
                'slide-in': 'slideIn 0.2s ease-out forwards',
                'fade-in': 'fadeIn 0.2s ease-out forwards',
            },
            keyframes: {
                slideIn: {
                    '0%': { transform: 'translateY(-8px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                }
            },
            transitionDuration: {
                '150': '150ms',
                '200': '200ms',
            }
        },
    },
    plugins: [],
}

