// Notifications.js v2.7 Experia - Dashboard Notifications
// Edit this file to add, update, or remove notifications
// Keep the array empty [] to disable all notifications
// Last Updated: 04-10-2025

const notifications = [
    {
        title: "Welcome to AL Software Dashboard v2.7 Experia! 🎉",
        message: "Explore 15+ professional masterpieces. Now with About Us section featuring Director Anas Lila. Install as APK or PWA for offline access!"
    },
    {
        title: "New in v2.7 Experia ✨",
        message: "About Us tab added! Learn about AL Software, our 5+ years experience, and meet Director Anas Lila (MBA in Sales, Mumbai)."
    }
    // Add more notifications below following the same format:
    // {
    //     title: "New Feature Announcement",
    //     message: "Description of the new feature or update."
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
// NOTIFICATION EXAMPLES FOR v2.7 Experia
// ============================================================================

// Example 1: Welcome Message (NEW in v2.7)
// {
//     title: "Welcome to AL Software Dashboard v2.7 Experia! 🎉",
//     message: "Explore 15+ professional masterpieces. Now with About Us section featuring Director Anas Lila!",
//     type: "success",
//     duration: 15000
// }

// Example 2: About Us Feature
// {
//     title: "New in v2.7 Experia ✨",
//     message: "Click the 'About Us' tab to learn about AL Software, our experience, and meet Director Anas Lila.",
//     type: "update",
//     duration: 12000
// }

// Example 3: APK Install Feature
// {
//     title: "Android APK Download Available 📲",
//     message: "Android users can now download and install the dashboard directly as an APK file!",
//     type: "info",
//     priority: "high"
// }

// Example 4: Director Introduction
// {
//     title: "Meet Our Director - Anas Lila 👔",
//     message: "MBA in Sales from Mumbai, leading AL Software with 5+ years of experience in delivering 15+ projects.",
//     type: "info",
//     duration: 12000
// }

// Example 5: Projects First Priority
// {
//     title: "Projects Take Center Stage 🌟",
//     message: "v2.7 Experia prioritizes showcasing our 15 masterpieces upfront. About Us is now in a dedicated tab.",
//     type: "update"
// }

// Example 6: iOS Install Instructions
// {
//     title: "iOS Users: Add to Home Screen 🍎",
//     message: "Safari users can install the dashboard as a PWA. Open install modal for step-by-step instructions.",
//     type: "info",
//     priority: "normal"
// }

// Example 7: Seamless Grid Design
// {
//     title: "New Grid Design - No Gaps! 🎨",
//     message: "Projects and features now display in a seamless grid with connected borders for a cleaner, more professional look.",
//     type: "success"
// }

// Example 8: Search Enhancement
// {
//     title: "Search All 15 Projects Instantly 🔍",
//     message: "Use the search bar to quickly find any project by name, category, technology, or tag.",
//     type: "info",
//     duration: 10000
// }

// Example 9: Client Satisfaction
// {
//     title: "100% Client Satisfaction Rate 💯",
//     message: "Every AL Software project is crafted with attention to detail, performance, and user experience.",
//     type: "success",
//     persistent: false
// }

// Example 10: Contact Information
// {
//     title: "Get in Touch with AL Software 📧",
//     message: "Email: alsoftware@gmail.com | WhatsApp: +91 8879706046 | Website: alsoftware.vercel.app",
//     type: "info",
//     duration: 15000
// }

// Example 11: Technology Stack
// {
//     title: "Built with Modern Tech Stack 💻",
//     message: "HTML5, CSS3, JavaScript, PWA, LocalStorage, IndexedDB, and more cutting-edge technologies.",
//     type: "info"
// }

// Example 12: Offline Capability
// {
//     title: "Works Offline After Install ⚡",
//     message: "Once installed, access all 15 projects and the dashboard even without internet connection.",
//     type: "success",
//     duration: 12000
// }

// Example 13: Version Milestone
// {
//     title: "v2.7 Experia Released! 🚀",
//     message: "Major update with About Us section, APK download, enhanced director profile, and projects-first layout.",
//     type: "update",
//     priority: "high",
//     expiresOn: "2025-10-15"
// }

// Example 14: Experience Highlight
// {
//     title: "5+ Years of Excellence 🏆",
//     message: "AL Software has been delivering innovative web solutions since 2020 with consistent excellence.",
//     type: "success"
// }

// Example 15: Refresh Feature
// {
//     title: "Dashboard Refresh Button Added 🔄",
//     message: "Click the refresh icon next to project count to reload all masterpieces instantly.",
//     type: "info",
//     duration: 10000
// }

// Example 16: Font Update
// {
//     title: "Trebuchet MS Font Applied 📝",
//     message: "Clean, professional typography throughout the dashboard for better readability and modern aesthetics.",
//     type: "update"
// }

// Example 17: No Gaps Design
// {
//     title: "Seamless Grid Design Applied 📐",
//     message: "All project cards and feature boxes now connect seamlessly with shared borders - no gaps!",
//     type: "success",
//     duration: 12000
// }

// Example 18: Modal Features Fixed
// {
//     title: "Key Features Display Enhanced 🎯",
//     message: "Project detail modals now show features in a seamless grid layout with no spacing gaps.",
//     type: "update"
// }

// ============================================================================
// TIPS FOR EFFECTIVE NOTIFICATIONS IN v2.7 Experia
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
// 13. Welcome messages should highlight key features (15 projects, About Us, install)
// 14. Version-specific updates help users understand what's new
// 15. Time-sensitive notifications should include specific dates/times
// 16. Mention Director Anas Lila when appropriate to build brand identity
// 17. Highlight the "About Us" tab for users interested in company background
// 18. APK install is a major feature - promote it to Android users
// 19. Mention Trebuchet MS font and no gaps design in UI update notifications
// 20. Keep notification count low (2-3 active max) for best user experience
// ============================================================================

// ============================================================================
// NOTIFICATION SCHEDULE RECOMMENDATIONS
// ============================================================================
// - Welcome message: Show on first visit or major version updates
// - About Us feature: Announce in first week after v2.7 launch
// - APK install: Promote to Android users specifically
// - Director introduction: Show periodically to new visitors
// - Maintenance notices: 24-48 hours before scheduled downtime
// - New features: Announce within 1 week of release
// - Project launches: Announce on launch day and keep for 1-2 weeks
// - Seasonal/special: Plan ahead for holidays or events
// - Critical updates: Show immediately and keep until resolved
// - Design updates: Announce font/grid changes for 1 week after release
// ============================================================================

// Export for use in script.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = notifications;
}

// Version Info
console.log('%c Notifications.js v2.7 Experia Loaded ', 'background: #000; color: #0f0; padding: 5px 10px; font-weight: bold;');
console.log('%c Active Notifications: ' + notifications.filter(n => n.title && n.message).length, 'font-weight: bold; color: #000;');
console.log('%c Dashboard: 15+ Projects | Director: Anas Lila ', 'color: #0066cc; font-size: 11px; font-weight: bold;');
console.log('%c Font: Trebuchet MS | Design: No Gaps (Seamless Grid) ', 'color: #0066cc; font-size: 11px;');

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
        console.log('[Notifications v2.7 Experia] Removed', notifications.length - activeNotifications.length, 'expired notification(s)');
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
    
    console.log('[Notifications v2.7 Experia] Statistics:', stats);
    return stats;
}

// Make functions available globally
if (typeof window !== 'undefined') {
    window.checkExpiredNotifications = checkExpiredNotifications;
    window.getNotificationStats = getNotificationStats;
}

// Log notification stats on load
getNotificationStats();

// v2.7 Experia specific features
console.log('[Notifications v2.7 Experia] New features: About Us tab, Director profile, APK install');
console.log('[Notifications v2.7 Experia] Projects-first priority layout active');
console.log('[Notifications v2.7 Experia] Trebuchet MS font applied globally');
console.log('[Notifications v2.7 Experia] Seamless grid design (no gaps) implemented');
