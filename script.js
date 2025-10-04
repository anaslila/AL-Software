// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    loadMasterpieces();
    checkNotifications();
    initModal();
    registerServiceWorker();
});

// Load masterpieces from masters.js
function loadMasterpieces() {
    const grid = document.getElementById('masterpiece-grid');
    
    if (typeof masterpieces === 'undefined' || masterpieces.length === 0) {
        grid.innerHTML = '<p style="text-align: center; font-size: 14px; grid-column: 1/-1;">No masterpieces available yet.</p>';
        return;
    }

    grid.innerHTML = '';

    masterpieces.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'masterpiece-card';
        card.onclick = () => openModal(index);

        card.innerHTML = `
            <img src="${item.logo}" alt="${item.name}" onerror="this.src='https://i.postimg.cc/mrqz7KtQ/AL-Software.png'">
            <h3>${item.name}</h3>
        `;

        grid.appendChild(card);
    });
}

// Modal functionality
function initModal() {
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close');

    // Close modal when clicking the X button
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    };

    // Close modal when clicking outside of it
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
}

// Open modal with masterpiece details
function openModal(index) {
    if (typeof masterpieces === 'undefined' || !masterpieces[index]) {
        return;
    }

    const item = masterpieces[index];
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');

    modalBody.innerHTML = `
        <img src="${item.logo}" alt="${item.name}" onerror="this.src='https://i.postimg.cc/mrqz7KtQ/AL-Software.png'">
        <h2>${item.name}</h2>
        <p><strong>Website:</strong> ${item.website}</p>
        <p><strong>Description:</strong> ${item.description}</p>
        <p><strong>Published:</strong> ${item.publishedDate}</p>
        <a href="${item.website.startsWith('http') ? item.website : 'https://' + item.website}" target="_blank" rel="noopener noreferrer">Open This Masterpiece</a>
    `;

    modal.style.display = 'block';
}

// Check and display notifications
function checkNotifications() {
    if (typeof notifications === 'undefined' || notifications.length === 0) {
        return;
    }

    // Filter active notifications
    const activeNotifications = notifications.filter(notif => 
        notif.title && notif.title.trim() !== '' && 
        notif.message && notif.message.trim() !== ''
    );

    if (activeNotifications.length === 0) {
        return;
    }

    // Show the first active notification
    showNotification(activeNotifications[0]);
}

// Display notification popup
function showNotification(notification) {
    const popup = document.getElementById('notification-popup');
    const title = document.getElementById('notification-title');
    const text = document.getElementById('notification-text');
    const closeBtn = document.querySelector('.notification-close');

    title.textContent = notification.title;
    text.textContent = notification.message;

    popup.style.display = 'block';

    // Close notification when clicking the X button
    closeBtn.onclick = function() {
        popup.style.display = 'none';
    };

    // Auto-hide notification after 10 seconds
    setTimeout(() => {
        popup.style.display = 'none';
    }, 10000);
}

// Register Service Worker for PWA functionality
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered successfully:', registration.scope);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    }
}

// Utility function to format dates
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', options);
}

// Refresh masterpieces (can be called externally)
function refreshMasterpieces() {
    loadMasterpieces();
}

// Search functionality (optional - can be used later)
function searchMasterpieces(query) {
    if (typeof masterpieces === 'undefined') {
        return [];
    }

    query = query.toLowerCase();
    return masterpieces.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query)
    );
}
