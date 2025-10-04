// Notifications.js v2.1.0 - Dashboard Notifications
// Edit this file to add, update, or remove notifications
// Keep the array empty [] to disable all notifications

const notifications = [
    {
        title: "Website will remain down from 9:00 pm - 11:00 pm on 5th Oct, 2025",
        message: "This is beta testing version."
    }
    // Add more notifications below following the same format:
    // {
    //     title: "Dashboard Updated to v2.1.0!",
    //     message: "New features: Install App instructions, Last Updated dates, and About section."
    // },
    // {
    //     title: "New Feature Released!",
    //     message: "Check out our latest masterpiece - now live on the dashboard."
    // },
    // {
    //     title: "System Maintenance",
    //     message: "Scheduled maintenance on 15th Oct, 2025 from 2:00 AM - 4:00 AM IST."
    // },
];

// To disable all notifications, replace the array with:
// const notifications = [];

// ============================================================================
// ADVANCED NOTIFICATION OPTIONS (For future use)
// ============================================================================
// You can add these optional fields to any notification:
//
// {
//     title: "Notification Title",
//     message: "Notification message text",
//     type: "info", // Options: "info", "warning", "success", "error", "update"
//     duration: 10000, // Auto-dismiss time in milliseconds (default: 10000)
//     persistent: false, // If true, won't auto-dismiss (user must close manually)
//     priority: "normal", // Options: "low", "normal", "high"
//     icon: "https://your-custom-icon.png", // Custom notification icon
//     action: {
//         text: "View Details",
//         url: "https://alsoftware.vercel.app"
//     }
// }
//
// ============================================================================

// ============================================================================
// NOTIFICATION EXAMPLES
// ============================================================================

// Example 1: Simple Info Notification
// {
//     title: "Welcome to AL Software Dashboard!",
//     message: "Explore our masterpieces and install the app for offline access."
// }

// Example 2: Update Notification with Action
// {
//     title: "New Version Available - v2.1.0",
//     message: "Click to learn about new features including install instructions and more!",
//     type: "update",
//     action: {
//         text: "What's New",
//         url: "https://alsoftware.vercel.app"
//     }
// }

// Example 3: Maintenance Warning
// {
//     title: "Scheduled Maintenance Alert",
//     message: "Dashboard will be unavailable on 10th Oct, 2025 from 2:00 AM - 4:00 AM IST for updates.",
//     type: "warning",
//     priority: "high",
//     persistent: true
// }

// Example 4: New Project Launch
// {
//     title: "New Masterpiece Launched! 🚀",
//     message: "ThynkPOS v2.5 is now live with enhanced features and better performance.",
//     type: "success",
//     duration: 15000
// }

// Example 5: System Error/Issue
// {
//     title: "Technical Issue Detected",
//     message: "We're experiencing some delays. Our team is working on it. Thank you for your patience.",
//     type: "error",
//     priority: "high",
//     persistent: true
// }

// ============================================================================
// TIPS FOR EFFECTIVE NOTIFICATIONS
// ============================================================================
// 1. Keep titles short and descriptive (under 50 characters)
// 2. Messages should be clear and actionable (under 120 characters)
// 3. Use "warning" type for important announcements
// 4. Use "success" type for positive updates
// 5. Use "error" type for critical issues
// 6. Set persistent: true for critical notifications
// 7. Test notifications on mobile and desktop
// 8. Don't show too many notifications at once (max 1-2)
// 9. Update or remove outdated notifications regularly
// 10. Use action buttons to provide more information
// ============================================================================

// Export for use in script.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = notifications;
}

// Version Info
console.log('%c Notifications.js v2.1.0 Loaded ', 'background: #000; color: #fff; padding: 3px 8px; font-weight: bold;');
console.log('Active Notifications:', notifications.filter(n => n.title && n.message).length);

// Auto-expire check (removes notifications past their date)
function checkExpiredNotifications() {
    const now = new Date();
    const activeNotifications = notifications.filter(notif => {
        if (notif.expiresOn) {
            try {
                const expireDate = new Date(notif.expiresOn);
                return expireDate > now;
            } catch (e) {
                return true; // Keep if date parsing fails
            }
        }
        return true; // Keep if no expiry date
    });
    
    if (activeNotifications.length < notifications.length) {
        console.log('[Notifications] Removed', notifications.length - activeNotifications.length, 'expired notification(s)');
    }
    
    return activeNotifications;
}

// Make function available globally
if (typeof window !== 'undefined') {
    window.checkExpiredNotifications = checkExpiredNotifications;
}
