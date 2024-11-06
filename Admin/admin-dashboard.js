// JavaScript to manage dynamic content on the Admin Dashboard

// Mock function for greeting message, could be extended for additional personalization
function loadAdminDashboard() {
    console.log("Admin Dashboard loaded successfully.");
    displayAdminWelcome();
}

// Displaying a dynamic welcome message
function displayAdminWelcome() {
    const welcomeSection = document.querySelector('.dashboard h2');
    welcomeSection.innerText = "Welcome, Admin!";
}

// Calling the main load function on page load
document.addEventListener("DOMContentLoaded", loadAdminDashboard);
