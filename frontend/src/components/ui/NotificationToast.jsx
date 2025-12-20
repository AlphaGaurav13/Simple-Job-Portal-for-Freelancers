// ================================================
// 🔔 NOTIFICATION TOAST - Real-time Notifications
// ================================================
// Displays notification toasts from socket events
// Premium minimalist design
// ================================================

// Import React and hooks
import React, { useState, useEffect } from 'react';

// Import socket context
import { useSocket } from '../../context/SocketContext';

// ================================================
// NOTIFICATION TOAST COMPONENT
// ================================================
function NotificationToast() {
    // Get socket from context
    const { socket } = useSocket();

    // State for notifications array
    const [notifications, setNotifications] = useState([]);

    // ============================================
    // EFFECT: Listen for notification events
    // ============================================
    useEffect(() => {
        if (!socket) {
            return;
        }

        const handleNotification = (data) => {
            const id = Date.now();

            setNotifications((prev) => {
                return [...prev, { ...data, id: id }];
            });

            // Auto dismiss after 5 seconds
            setTimeout(() => {
                setNotifications((prev) => {
                    return prev.filter((n) => n.id !== id);
                });
            }, 5000);
        };

        socket.on('notification', handleNotification);

        return () => {
            socket.off('notification', handleNotification);
        };
    }, [socket]);

    // ============================================
    // FUNCTION: Dismiss notification
    // ============================================
    const dismissNotification = (id) => {
        setNotifications((prev) => {
            return prev.filter((n) => n.id !== id);
        });
    };

    // ============================================
    // RENDER
    // ============================================
    if (notifications.length === 0) {
        return null;
    }

    return (
        <div className="fixed top-24 right-6 z-50 flex flex-col gap-3 pointer-events-none">
            {notifications.map((notif) => (
                <div
                    key={notif.id}
                    className="bg-white border border-neutral-200 shadow-lg p-4 rounded-xl flex items-start gap-3 w-80 animate-slide-in pointer-events-auto"
                >
                    {/* Icon */}
                    <div className="p-2 rounded-full bg-neutral-100 text-neutral-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                        </svg>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                        <h4 className="font-medium text-neutral-900 text-sm">
                            {notif.title || 'New Notification'}
                        </h4>
                        <p className="text-neutral-500 text-xs mt-1">
                            {notif.message}
                        </p>
                    </div>

                    {/* Dismiss Button */}
                    <button
                        onClick={() => dismissNotification(notif.id)}
                        className="text-neutral-400 hover:text-neutral-900 transition-colors text-lg leading-none"
                    >
                        ×
                    </button>
                </div>
            ))}
        </div>
    );
}

// Export the component
export default NotificationToast;

