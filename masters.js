// Masters.js - Your Masterpieces Collection v2.0
// Edit this file to add, update, or remove your projects

const masterpieces = [
    {
        website: "thynkpos.vercel.app",
        name: "ThynkPOS",
        logo: "https://i.postimg.cc/xkm91NMh/thynkpos-logo.png",
        description: "Complete restaurant POS system with table management, billing, inventory tracking, and customer management capabilities.",
        fullDescription: "ThynkPOS is a comprehensive Point of Sale system designed specifically for restaurants and hospitality businesses. It provides real-time table management, seamless billing processes, inventory tracking, customer relationship management, and detailed analytics. Built with modern web technologies for fast performance and offline capability.",
        publishedDate: "04-07-2025",
        category: "Web App",
        status: "Live",
        version: "1.8",
        developer: "AL Software",
        tags: ["POS", "Restaurant", "Billing", "Inventory"],
        technologies: ["HTML5", "CSS3", "JavaScript", "PWA", "IndexedDB"],
        features: [
            {
                title: "Table Management",
                description: "Real-time table status and reservation system"
            },
            {
                title: "Smart Billing",
                description: "Quick billing with QR code payment integration"
            },
            {
                title: "Inventory Control",
                description: "Track stock levels and get low-stock alerts"
            },
            {
                title: "Customer Database",
                description: "Manage customer data and order history"
            },
            {
                title: "Analytics Dashboard",
                description: "Sales reports and business insights"
            },
            {
                title: "Offline Mode",
                description: "Works without internet connection"
            }
        ],
        projectDetails: "ThynkPOS was developed to solve real-world restaurant management challenges. The system handles everything from order taking to payment processing, with special focus on Indian market requirements including GST billing, multiple payment methods, and regional language support. The PWA architecture ensures the system works seamlessly even during internet outages, a critical feature for busy restaurants."
    }
    
    // Template for adding more masterpieces:
    // {
    //     website: "yourproject.vercel.app",
    //     name: "Project Name",
    //     logo: "https://your-logo-url.png",
    //     description: "Short description (1-2 lines for card display)",
    //     fullDescription: "Detailed description explaining what the project does, its purpose, and key benefits (2-3 paragraphs)",
    //     publishedDate: "05-10-2025",
    //     category: "Web App", // Options: "Web App", "Mobile App", "Tools"
    //     status: "Live", // Options: "Live", "Beta", "In Development", "Archived"
    //     version: "1.0",
    //     developer: "AL Software",
    //     tags: ["Tag1", "Tag2", "Tag3"], // 3-5 relevant keywords
    //     technologies: ["HTML5", "CSS3", "JavaScript", "React", "Node.js"], // Tech stack
    //     features: [
    //         {
    //             title: "Feature Name",
    //             description: "Feature description"
    //         },
    //         {
    //             title: "Another Feature",
    //             description: "Feature description"
    //         }
    //     ],
    //     projectDetails: "Detailed project information, development story, challenges solved, target audience, and any special achievements or unique aspects of the project."
    // },
];

// Export for use in script.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = masterpieces;
}
