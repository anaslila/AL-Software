// Notifications.js - Website Notifications
// Edit this file to add, update, or remove notifications
// Keep the array empty [] to disable all notifications

const notifications = [
    {
        title: "Website will remain down from 9:00 pm - 11:00 pm on 5th Oct, 2025",
        message: "This is beta testing version."
    }
    // Add more notifications below following the same format:
    // {
    //     title: "Your notification title here",
    //     message: "Your notification message here"
    // },
];

// To disable notifications, replace the array with an empty one:
// const notifications = [];

// Export for use in script.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = notifications;
}
