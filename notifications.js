// Notifications.js v2.0 - Dashboard Notifications
// Edit this file to add, update, or remove notifications
// Keep the array empty [] to disable all notifications

const notifications = [
    {
        title: "Website will remain down from 9:00 pm - 11:00 pm on 5th Oct, 2025",
        message: "This is beta testing version."
    }
    // Add more notifications below following the same format:
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

// Advanced notification options (optional - for future use):
// {
//     title: "Notification Title",
//     message: "Notification message text",
//     type: "info", // Options: "info", "warning", "success", "error"
//     duration: 10000, // Auto-dismiss time in milliseconds (default: 10000)
//     persistent: false, // If true, won't auto-dismiss
//     action: {
//         text: "View Details",
//         url: "https://alsoftware.vercel.app"
//     }
// }

// Export for use in script.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = notifications;
}
