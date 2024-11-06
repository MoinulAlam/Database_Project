// Navigation simulation for Warehouse Manager Dashboard
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', (event) => {
        const section = event.target.parentElement.querySelector('h3').innerText;
        alert(`Navigating to ${section} page...`);
        // Normally, you would redirect to specific pages here, e.g., window.location.href = "warehouse-inventory.html";
    });
});
