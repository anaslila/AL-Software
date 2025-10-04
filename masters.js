// Masters.js - Your Masterpieces Collection v2.1.0
// Edit this file to add, update, or remove your projects

const masterpieces = [
    {
        website: "thynkpos.vercel.app",
        name: "ThynkPOS",
        logo: "https://i.postimg.cc/xkm91NMh/thynkpos-logo.png",
        description: "Complete restaurant POS system with table management, billing, inventory tracking, and customer management capabilities.",
        fullDescription: "ThynkPOS is a comprehensive Point of Sale system designed specifically for restaurants and hospitality businesses. It provides real-time table management, seamless billing processes, inventory tracking, customer relationship management, and detailed analytics. Built with modern web technologies for fast performance and offline capability.",
        publishedDate: "15-08-2025",
        lastUpdated: "04-10-2025",
        category: "Web App",
        status: "Live",
        version: "2.5",
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
            },
            {
                title: "Multi-Device Sync",
                description: "Synchronize data across multiple devices"
            },
            {
                title: "GST Billing",
                description: "Compliant with Indian GST requirements"
            }
        ],
        projectDetails: "ThynkPOS was developed to solve real-world restaurant management challenges. The system handles everything from order taking to payment processing, with special focus on Indian market requirements including GST billing, multiple payment methods, and regional language support. The PWA architecture ensures the system works seamlessly even during internet outages, a critical feature for busy restaurants. Used by multiple restaurants across India with positive feedback on ease of use and reliability."
    }
    
    // ============================================================================
    // TEMPLATE FOR ADDING NEW MASTERPIECES
    // ============================================================================
    // Copy the structure below and fill in your project details:
    //
    // {
    //     website: "yourproject.vercel.app",
    //     name: "Your Project Name",
    //     logo: "https://your-logo-url.png",
    //     description: "Short description (1-2 lines for card display) - keep it concise and compelling",
    //     fullDescription: "Detailed description explaining what the project does, its purpose, and key benefits. This appears in the modal view. Write 2-3 paragraphs covering: what it is, who it's for, and why it's valuable.",
    //     publishedDate: "DD-MM-YYYY",
    //     lastUpdated: "DD-MM-YYYY",
    //     category: "Web App", // Options: "Web App", "Mobile App", "Tools", "E-commerce", "Entertainment"
    //     status: "Live", // Options: "Live", "Beta", "In Development", "Archived"
    //     version: "1.0",
    //     developer: "AL Software",
    //     tags: ["Tag1", "Tag2", "Tag3", "Tag4"], // 3-5 relevant keywords for search
    //     technologies: ["HTML5", "CSS3", "JavaScript", "React", "Node.js", "MongoDB"], // Tech stack used
    //     features: [
    //         {
    //             title: "Feature Name 1",
    //             description: "Brief description of what this feature does"
    //         },
    //         {
    //             title: "Feature Name 2",
    //             description: "Brief description of what this feature does"
    //         },
    //         {
    //             title: "Feature Name 3",
    //             description: "Brief description of what this feature does"
    //         },
    //         {
    //             title: "Feature Name 4",
    //             description: "Brief description of what this feature does"
    //         }
    //         // Add 4-8 key features
    //     ],
    //     projectDetails: "Comprehensive project information including: development story, challenges solved, target audience, technology choices, performance metrics, user feedback, and any special achievements or unique aspects. This section can be 2-4 paragraphs long and should tell the complete story of the project."
    // },
    
    // ============================================================================
    // QUICK REFERENCE - Required Fields:
    // ============================================================================
    // - website: Project URL
    // - name: Project name
    // - logo: Logo image URL
    // - description: Short description for card
    // - fullDescription: Detailed description for modal
    // - publishedDate: Initial release date (DD-MM-YYYY)
    // - lastUpdated: Latest update date (DD-MM-YYYY) **NEW in v2.1.0**
    // - category: Project category
    // - status: Current status
    // - version: Current version number
    // - developer: Developer name
    // - tags: Array of keywords
    // - technologies: Array of tech stack
    // - features: Array of feature objects with title & description
    // - projectDetails: Comprehensive project information
    // ============================================================================
    
];

// Export for use in script.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = masterpieces;
}

// Version Info
console.log('%c Masters.js v2.1.0 Loaded ', 'background: #000; color: #fff; padding: 3px 8px; font-weight: bold;');
console.log('Total Masterpieces:', masterpieces.length);
