// Notifications.js v2.5.0 - Dashboard Notifications
// Edit this file to add, update, or remove notifications
// Keep the array empty [] to disable all notifications
// Last Updated: 04-10-2025

const notifications = [
    {
        title: "Welcome to AL Software Dashboard v2.5.0! 🎉",
        message: "Explore 15+ professional web applications, games, and tools. Install the app for offline access!"
    },
    {
        title: "Website will remain down from 9:00 pm - 11:00 pm on 5th Oct, 2025",
        message: "This is beta testing version."
    }
    // Add more notifications below following the same format:
    // {
    //     title: "New Projects Added!",
    //     message: "Check out our latest masterpieces: Magic Box AI and MRM-ERP system."
    // },
    // {
    //     title: "Feature Update - Refresh Button",
    //     message: "You can now manually refresh the dashboard to see the latest projects instantly."
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
//     expiresOn: "2025-10-10", // Auto-remove notification after this date (YYYY-MM-DD)
//     action: {
//         text: "View Details",
//         url: "https://alsoftware.vercel.app"
//     }
// }
//
// ============================================================================

// ============================================================================
// NOTIFICATION EXAMPLES FOR v2.5.0
// ============================================================================

// Example 1: Welcome Message (NEW in v2.5.0)
// {
//     title: "Welcome to AL Software Dashboard v2.5.0! 🎉",
//     message: "Explore 15+ professional web applications, games, and tools. Install the app for offline access!",
//     type: "success",
//     duration: 12000
// }

// Example 2: New Projects Announcement
// {
//     title: "5 New Projects Launched! 🚀",
//     message: "Check out Magic Box AI, MRM-ERP, Property Box, Client Manager, and Trip Budget Manager.",
//     type: "update",
//     expiresOn: "2025-10-15"
// }

// Example 3: Feature Highlight
// {
//     title: "New Feature: Refresh Button",
//     message: "Click the refresh button in the header to reload all projects instantly.",
//     type: "info",
//     priority: "normal"
// }

// Example 4: Maintenance Warning
// {
//     title: "Scheduled Maintenance Alert",
//     message: "Dashboard will be unavailable on 10th Oct, 2025 from 2:00 AM - 4:00 AM IST for updates.",
//     type: "warning",
//     priority: "high",
//     persistent: true,
//     expiresOn: "2025-10-10"
// }

// Example 5: Success Announcement
// {
//     title: "15 Projects Milestone Achieved! 🎊",
//     message: "AL Software Dashboard now features 15+ professional applications and tools.",
//     type: "success",
//     duration: 15000
// }

// Example 6: Project Update
// {
//     title: "ThynkPOS Updated to v2.5",
//     message: "New features include enhanced billing, improved UI, and faster performance.",
//     type: "update",
//     action: {
//         text: "View Project",
//         url: "https://thynkpos.vercel.app"
//     }
// }

// Example 7: Category Announcement
// {
//     title: "Entertainment Category Added",
//     message: "Enjoy Bollywood Cinema Simulator and Software Tycoon games in the new Entertainment section.",
//     type: "info"
// }

// Example 8: Install Prompt
// {
//     title: "Install for Better Experience",
//     message: "Install AL Software Dashboard on your device for offline access and faster loading.",
//     type: "info",
//     priority: "low",
//     action: {
//         text: "Learn How",
//         url: "#install"
//     }
// }

// Example 9: Special Offer/News
// {
//     title: "Custom Development Services Available",
//     message: "Need a custom web app or business tool? Contact AL Software for professional development services.",
//     type: "info",
//     persistent: true,
//     expiresOn: "2025-10-31"
// }

// Example 10: Technical Update
// {
//     title: "Performance Improvements",
//     message: "Dashboard now loads 40% faster with optimized caching and lazy loading.",
//     type: "success"
// }

// ============================================================================
// TIPS FOR EFFECTIVE NOTIFICATIONS IN v2.5.0
// ============================================================================
// 1. Keep titles short and descriptive (under 50 characters)
// 2. Messages should be clear and actionable (under 120 characters)
// 3. Use emojis sparingly for visual appeal (1-2 per notification)
// 4. Use "warning" type for important announcements
// 5. Use "success" type for positive updates and achievements
// 6. Use "error" type for critical issues only
// 7. Set persistent: true for critical notifications
// 8. Use expiresOn to auto-remove outdated notifications
// 9. Test notifications on mobile and desktop
// 10. Don't show too many notifications at once (max 2-3 active)
// 11. Update or remove outdated notifications regularly
// 12. Use action buttons to provide more information
// 13. Welcome messages should highlight key features (15 projects, install)
// 14. Version-specific updates help users understand what's new
// 15. Time-sensitive notifications should include specific dates/times
// ============================================================================

// ============================================================================
// NOTIFICATION SCHEDULE RECOMMENDATIONS
// ============================================================================
// - Welcome message: Show on first visit or major version updates
// - Maintenance notices: 24-48 hours before scheduled downtime
// - New features: Announce within 1 week of release
// - Project launches: Announce on launch day and keep for 1-2 weeks
// - Seasonal/special: Plan ahead for holidays or events
// - Critical updates: Show immediately and keep until resolved
// ============================================================================

// Export for use in script.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = notifications;
}

// Version Info
console.log('%c Notifications.js v2.5.0 Loaded ', 'background: #000; color: #0f0; padding: 5px 10px; font-weight: bold;');
console.log('%c Active Notifications: ' + notifications.filter(n => n.title && n.message).length, 'font-weight: bold; color: #000;');
console.log('%c Dashboard: 15+ Projects Showcase ', 'color: #666; font-size: 11px;');

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
        console.log('[Notifications v2.5.0] Removed', notifications.length - activeNotifications.length, 'expired notification(s)');
    }
    
    return activeNotifications;
}

// Get notification count by type
function getNotificationStats() {
    const stats = {
        total: notifications.length,
        active: notifications.filter(n => n.title && n.message).length,
        expired: 0,
        byType: {}
    };
    
    notifications.forEach(notif => {
        const type = notif.type || 'info';
        stats.byType[type] = (stats.byType[type] || 0) + 1;
    });
    
    console.log('[Notifications v2.5.0] Statistics:', stats);
    return stats;
}

// Make functions available globally
if (typeof window !== 'undefined') {
    window.checkExpiredNotifications = checkExpiredNotifications;
    window.getNotificationStats = getNotificationStats;
}

// Log notification stats on load
getNotificationStats();
