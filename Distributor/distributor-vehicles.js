// Select elements for displaying vehicle statistics on the dashboard
const availableVehiclesElement = document.getElementById("available-vehicles");
const underMaintenanceElement = document.getElementById("under-maintenance");

// Get elements
const modal = document.getElementById("modal");
const openModalBtn = document.querySelector(".open-modal");
const closeModalBtn = document.querySelector(".close-modal");
const saveVehicleBtn = document.getElementById("saveVehicleBtn");
const vehicleForm = document.getElementById("vehicleForm");
const vehiclesContainer = document.getElementById("vehicles-container");

let vehicles = [];
let editIndex = null;

// Open Modal for Adding Vehicle
openModalBtn.addEventListener("click", () => {
    openVehicleForm();
});

// Function to Open Vehicle Form (Add/Edit Mode)
function openVehicleForm(vehicle = {}) {
    vehicleForm.reset();
    document.getElementById("modal-title").textContent = editIndex !== null ? "Edit Vehicle" : "Add New Vehicle";
    document.getElementById("vehicleIndex").value = editIndex !== null ? editIndex : '';
    document.getElementById("registration").value = vehicle.registration || '';
    document.getElementById("capacity").value = vehicle.capacity || '';
    document.getElementById("condition").value = vehicle.condition || 'available';
    document.getElementById("usage").value = vehicle.usage || '';
    modal.style.display = "flex";
}

// Close Modal
closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
    editIndex = null;
});

// Save Vehicle
saveVehicleBtn.addEventListener("click", () => {
    const newVehicle = {
        registration: document.getElementById("registration").value,
        capacity: document.getElementById("capacity").value,
        condition: document.getElementById("condition").value,
        usage: document.getElementById("usage").value
    };

    if (editIndex !== null) {
        // Edit mode - update vehicle
        vehicles[editIndex] = newVehicle;
        editIndex = null;
    } else {
        // Add mode - add new vehicle
        vehicles.push(newVehicle);
    }

    localStorage.setItem("vehicles", JSON.stringify(vehicles));
    renderVehicles();
    updateDashboard(); // Update dashboard statistics
    modal.style.display = "none";
    vehicleForm.reset();
});

// Render Vehicles
function renderVehicles() {
    vehiclesContainer.innerHTML = '';
    vehicles.forEach((vehicle, index) => {
        const vehicleCard = document.createElement("div");
        vehicleCard.classList.add("card");

        vehicleCard.innerHTML = `
            <h3>${vehicle.registration}</h3>
            <p>Capacity: ${vehicle.capacity}</p>
            <p>Condition: ${vehicle.condition}</p>
            <p>Usage: ${vehicle.usage}</p>
            <button class="btn" onclick="editVehicle(${index})">Edit</button>
            <button class="btn delete-btn" onclick="deleteVehicle(${index})">Delete</button>
        `;

        vehiclesContainer.appendChild(vehicleCard);
    });
}

// Edit Vehicle
function editVehicle(index) {
    editIndex = index;
    openVehicleForm(vehicles[index]);
}

// Delete Vehicle
function deleteVehicle(index) {
    vehicles.splice(index, 1);
    localStorage.setItem("vehicles", JSON.stringify(vehicles));
    renderVehicles();
    updateDashboard(); // Update dashboard statistics
}

// Close Modal when Clicking Outside
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// Update Dashboard Statistics
function updateDashboard() {
    const vehiclesData = JSON.parse(localStorage.getItem("vehicles")) || [];
    const availableVehicles = vehiclesData.filter(v => v.condition === "available").length;
    const underMaintenance = vehiclesData.filter(v => v.condition === "maintenance").length;
    availableVehiclesElement.textContent = `Available Vehicles: ${availableVehicles}`;
    underMaintenanceElement.textContent = `Under Maintenance: ${underMaintenance}`;
}

// Load Vehicles on Page Load
document.addEventListener("DOMContentLoaded", () => {
    vehicles = JSON.parse(localStorage.getItem("vehicles")) || [];
    renderVehicles();
    updateDashboard(); // Initialize dashboard statistics
});
