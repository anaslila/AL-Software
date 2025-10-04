// Global Variables
let allMasterpieces = [];
let filteredMasterpieces = [];
let currentCategory = 'all';

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    loadMasterpieces();
    checkNotifications();
    setupSearchFunctionality();
    setupCategoryTabs();
    setupModalHandlers();
    registerServiceWorker();
});

// Initialize Dashboard
function initializeDashboard() {
    console.log('AL Software Dashboard v2.0 Initialized');
    allMasterpieces = typeof masterpieces !== 'undefined' ? masterpieces : [];
    filteredMasterpieces = [...allMasterpieces];
    updateCounts();
}

// Load and Display Masterpieces
function loadMasterpieces() {
    const grid = document.getElementById('apps-grid');
    
    if (!grid) return;
    
    if (filteredMasterpieces.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                <p style="font-size: 16px; color: #666666;">No masterpieces available yet.</p>
                <p style="font-size: 13px; color: #999999; margin-top: 10px;">Check back soon for amazing projects!</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = '';
    
    filteredMasterpieces.forEach((item, index) => {
        const card = createAppCard(item, index);
        grid.appendChild(card);
    });
    
    updateCounts();
}

// Create App Card Element
function createAppCard(item, index) {
    const card = document.createElement('div');
    card.className = 'app-card';
    card.onclick = () => openDetailModal(item);
    
    // Determine category badge
    const category = item.category || 'Web App';
    const status = item.status || 'Live';
    
    // Create tags HTML
    let tagsHTML = '';
    if (item.tags && item.tags.length > 0) {
        tagsHTML = `
            <div class="app-tags">
                ${item.tags.map(tag => `<span class="app-tag">${tag}</span>`).join('')}
            </div>
        `;
    }
    
    card.innerHTML = `
        <div class="app-card-header">
            <img src="${item.logo}" alt="${item.name}" class="app-logo" onerror="this.src='https://i.postimg.cc/mrqz7KtQ/AL-Software.png'">
            <div class="app-info">
                <span class="app-name">${item.name}</span>
                <span class="app-category">${category}</span>
            </div>
        </div>
        <p class="app-description">${item.description}</p>
        ${tagsHTML}
        <div class="app-meta">
            <span class="app-date">Published: ${item.publishedDate}</span>
            <span class="app-status">${status}</span>
        </div>
    `;
    
    return card;
}

// Open Detail Modal with Animation
function openDetailModal(item) {
    const modal = document.getElementById('detail-modal');
    const content = document.getElementById('modal-detail-content');
    
    if (!modal || !content) return;
    
    // Build detailed content
    content.innerHTML = generateModalContent(item);
    
    // Show modal with animation
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Generate Modal Content
function generateModalContent(item) {
    const category = item.category || 'Web Application';
    const status = item.status || 'Live';
    const version = item.version || '1.0';
    const developer = item.developer || 'AL Software';
    
    // Features Section
    let featuresHTML = '';
    if (item.features && item.features.length > 0) {
        featuresHTML = `
            <div class="modal-section">
                <h3 class="modal-section-title">Key Features</h3>
                <div class="modal-features-grid">
                    ${item.features.map(feature => `
                        <div class="modal-feature-item">
                            <div class="modal-feature-title">${feature.title || feature}</div>
                            ${feature.description ? `<div class="modal-feature-desc">${feature.description}</div>` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    // Technologies Section
    let techHTML = '';
    if (item.technologies && item.technologies.length > 0) {
        techHTML = `
            <div class="modal-section">
                <h3 class="modal-section-title">Technologies Used</h3>
                <div class="modal-tech-tags">
                    ${item.technologies.map(tech => `<span class="modal-tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
        `;
    }
    
    // Full Description
    const fullDescription = item.fullDescription || item.description;
    
    // Project Details
    let detailsHTML = '';
    if (item.projectDetails) {
        detailsHTML = `
            <div class="modal-section">
                <h3 class="modal-section-title">Project Details</h3>
                <div class="modal-section-content">${item.projectDetails}</div>
            </div>
        `;
    }
    
    return `
        <div class="modal-header-section">
            <img src="${item.logo}" alt="${item.name}" class="modal-logo-large" onerror="this.src='https://i.postimg.cc/mrqz7KtQ/AL-Software.png'">
            <div class="modal-header-info">
                <h2 class="modal-title">${item.name}</h2>
                <p class="modal-subtitle">${category}</p>
                <div class="modal-stats-row">
                    <div class="modal-stat">
                        <span class="modal-stat-label">Status</span>
                        <span class="modal-stat-value">${status}</span>
                    </div>
                    <div class="modal-stat">
                        <span class="modal-stat-label">Version</span>
                        <span class="modal-stat-value">${version}</span>
                    </div>
                    <div class="modal-stat">
                        <span class="modal-stat-label">Published</span>
                        <span class="modal-stat-value">${item.publishedDate}</span>
                    </div>
                    <div class="modal-stat">
                        <span class="modal-stat-label">Developer</span>
                        <span class="modal-stat-value">${developer}</span>
                    </div>
                </div>
                <a href="${formatURL(item.website)}" target="_blank" rel="noopener noreferrer" class="modal-action-btn">Open Masterpiece</a>
            </div>
        </div>
        
        <div class="modal-section">
            <h3 class="modal-section-title">About This Project</h3>
            <div class="modal-section-content">${fullDescription}</div>
        </div>
        
        ${featuresHTML}
        ${techHTML}
        ${detailsHTML}
    `;
}

// Close Modal
function closeDetailModal() {
    const modal = document.getElementById('detail-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Setup Modal Handlers
function setupModalHandlers() {
    const closeBtn = document.getElementById('close-modal');
    const modal = document.getElementById('detail-modal');
    const backdrop = modal ? modal.querySelector('.modal-backdrop') : null;
    
    if (closeBtn) {
        closeBtn.onclick = closeDetailModal;
    }
    
    if (backdrop) {
        backdrop.onclick = closeDetailModal;
    }
    
    // Close on Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeDetailModal();
            closeSearchDropdown();
        }
    });
}

// Search Functionality
function setupSearchFunctionality() {
    const searchInput = document.getElementById('search-input');
    const dropdown = document.getElementById('search-dropdown');
    
    if (!searchInput || !dropdown) return;
    
    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.trim().toLowerCase();
        
        if (query.length === 0) {
            closeSearchDropdown();
            return;
        }
        
        const results = searchMasterpieces(query);
        displaySearchResults(results, dropdown);
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
            closeSearchDropdown();
        }
    });
}

// Search Masterpieces
function searchMasterpieces(query) {
    if (!query) return [];
    
    return allMasterpieces.filter(item => {
        const searchFields = [
            item.name,
            item.description,
            item.category,
            item.website,
            ...(item.tags || []),
            ...(item.technologies || [])
        ].join(' ').toLowerCase();
        
        return searchFields.includes(query);
    });
}

// Display Search Results
function displaySearchResults(results, dropdown) {
    if (results.length === 0) {
        dropdown.innerHTML = '<div class="search-no-results">No results found</div>';
        dropdown.classList.add('active');
        return;
    }
    
    dropdown.innerHTML = results.map(item => `
        <div class="search-result-item" onclick="openDetailModal(masterpieces[${allMasterpieces.indexOf(item)}])">
            <img src="${item.logo}" alt="${item.name}" class="search-result-img" onerror="this.src='https://i.postimg.cc/mrqz7KtQ/AL-Software.png'">
            <div class="search-result-text">
                <span class="search-result-name">${item.name}</span>
                <span class="search-result-category">${item.category || 'Web App'}</span>
            </div>
        </div>
    `).join('');
    
    dropdown.classList.add('active');
}

// Close Search Dropdown
function closeSearchDropdown() {
    const dropdown = document.getElementById('search-dropdown');
    if (dropdown) {
        dropdown.classList.remove('active');
    }
}

// Category Tabs Functionality
function setupCategoryTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active state
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Filter masterpieces
            filterByCategory(category);
        });
    });
}

// Filter by Category
function filterByCategory(category) {
    currentCategory = category;
    
    if (category === 'all') {
        filteredMasterpieces = [...allMasterpieces];
    } else {
        filteredMasterpieces = allMasterpieces.filter(item => {
            const itemCategory = (item.category || '').toLowerCase();
            return itemCategory.includes(category);
        });
    }
    
    loadMasterpieces();
}

// Update Counts
function updateCounts() {
    const totalCount = document.getElementById('total-count');
    const visibleCount = document.getElementById('visible-count');
    
    if (totalCount) {
        totalCount.textContent = allMasterpieces.length;
    }
    
    if (visibleCount) {
        visibleCount.textContent = `${filteredMasterpieces.length} item${filteredMasterpieces.length !== 1 ? 's' : ''}`;
    }
}

// Format URL
function formatURL(url) {
    if (!url) return '#';
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }
    return 'https://' + url;
}

// Check and Display Notifications
function checkNotifications() {
    if (typeof notifications === 'undefined' || notifications.length === 0) {
        return;
    }
    
    const activeNotifications = notifications.filter(notif => 
        notif.title && notif.title.trim() !== '' && 
        notif.message && notif.message.trim() !== ''
    );
    
    if (activeNotifications.length === 0) {
        return;
    }
    
    // Show first notification after 1 second
    setTimeout(() => {
        showToastNotification(activeNotifications[0]);
    }, 1000);
}

// Show Toast Notification
function showToastNotification(notification) {
    const toast = document.getElementById('notification-toast');
    const title = document.getElementById('toast-title');
    const message = document.getElementById('toast-message');
    const closeBtn = document.getElementById('toast-close');
    
    if (!toast || !title || !message) return;
    
    title.textContent = notification.title;
    message.textContent = notification.message;
    
    toast.classList.add('active');
    
    // Close handler
    if (closeBtn) {
        closeBtn.onclick = () => {
            toast.classList.remove('active');
        };
    }
    
    // Auto-hide after 10 seconds
    setTimeout(() => {
        toast.classList.remove('active');
    }, 10000);
}

// Register Service Worker
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered:', registration.scope);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    }
}

// Refresh Dashboard
function refreshDashboard() {
    allMasterpieces = typeof masterpieces !== 'undefined' ? masterpieces : [];
    filterByCategory(currentCategory);
    closeSearchDropdown();
    document.getElementById('search-input').value = '';
}

// Export functions to global scope for inline onclick handlers
window.openDetailModal = function(item) {
    const modal = document.getElementById('detail-modal');
    const content = document.getElementById('modal-detail-content');
    
    if (!modal || !content) return;
    
    content.innerHTML = generateModalContent(item);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

window.closeDetailModal = closeDetailModal;
window.refreshDashboard = refreshDashboard;

// Utility: Format Date
function formatDate(dateString) {
    if (!dateString || dateString === 'DD-MM-YYYY') return dateString;
    
    try {
        const parts = dateString.split('-');
        if (parts.length === 3) {
            const date = new Date(parts[2], parts[1] - 1, parts[0]);
            return date.toLocaleDateString('en-IN', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
            });
        }
    } catch (e) {
        return dateString;
    }
    
    return dateString;
}

// Smooth Scroll to Top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Log Dashboard Stats
console.log('%c AL Software Dashboard v2.0 ', 'background: #000; color: #fff; padding: 5px 10px; font-size: 14px; font-weight: bold;');
console.log('Total Masterpieces:', allMasterpieces.length);
console.log('Developer: AL Software');
console.log('Website: https://alsoftware.vercel.app');
