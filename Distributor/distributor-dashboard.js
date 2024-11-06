// Select elements for displaying statistics on the dashboard
const activeShipmentsElement = document.getElementById("active-shipments");
const completedShipmentsElement = document.getElementById("completed-shipments");
const availableVehiclesElement = document.getElementById("available-vehicles");
const underMaintenanceElement = document.getElementById("under-maintenance");
const totalRoutesElement = document.getElementById("total-routes");
const inProgressRoutesElement = document.getElementById("in-progress-routes");

// Fetch data from localStorage
const shipmentsData = JSON.parse(localStorage.getItem("shipments")) || [];
const vehiclesData = JSON.parse(localStorage.getItem("vehicles")) || [];
const routesData = JSON.parse(localStorage.getItem("routes")) || [];

// Calculate and display statistics
// Shipments Overview
const activeShipments = shipmentsData.filter(s => s.status === "active").length;
const completedShipments = shipmentsData.filter(s => s.status === "completed").length;
activeShipmentsElement.textContent = `Active Shipments: ${activeShipments}`;
completedShipmentsElement.textContent = `Completed Shipments: ${completedShipments}`;

// Vehicles Overview
const availableVehicles = vehiclesData.filter(v => v.status === "available").length;
const underMaintenance = vehiclesData.filter(v => v.status === "maintenance").length;
availableVehiclesElement.textContent = `Available Vehicles: ${availableVehicles}`;
underMaintenanceElement.textContent = `Under Maintenance: ${underMaintenance}`;

// Routes Overview
const totalRoutes = routesData.length;
const inProgressRoutes = routesData.filter(r => r.status === "in-progress").length;
totalRoutesElement.textContent = `Total Routes: ${totalRoutes}`;
inProgressRoutesElement.textContent = `Routes In Progress: ${inProgressRoutes}`;

// Save Vehicle Function Update
function saveVehicle() {
    const newVehicle = {
        vehicleName: document.getElementById("vehicleName").value,
        capacity: document.getElementById("capacity").value,
        registrationNumber: document.getElementById("registrationNumber").value,
        condition: document.getElementById("condition").value,
        status: document.getElementById("usageStatus").value.toLowerCase(), // Ensure lowercase for consistency
        maintenanceSchedule: document.getElementById("maintenanceSchedule").value
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
    closeVehicleForm();
}

// Update Dashboard Function
function updateDashboard() {
    // Fetch data from localStorage
    const shipmentsData = JSON.parse(localStorage.getItem("shipments")) || [];
    const vehiclesData = JSON.parse(localStorage.getItem("vehicles")) || [];
    const routesData = JSON.parse(localStorage.getItem("routes")) || [];

    // Calculate and display statistics
    // Shipments Overview
    const activeShipments = shipmentsData.filter(s => s.status === "active").length;
    const completedShipments = shipmentsData.filter(s => s.status === "completed").length;
    document.getElementById("active-shipments").textContent = `Active Shipments: ${activeShipments}`;
    document.getElementById("completed-shipments").textContent = `Completed Shipments: ${completedShipments}`;

    // Vehicles Overview
    const availableVehicles = vehiclesData.filter(v => v.status === "available").length;
    const underMaintenance = vehiclesData.filter(v => v.status === "maintenance").length;
    document.getElementById("available-vehicles").textContent = `Available Vehicles: ${availableVehicles}`;
    document.getElementById("under-maintenance").textContent = `Under Maintenance: ${underMaintenance}`;

    // Routes Overview
    const totalRoutes = routesData.length;
    const inProgressRoutes = routesData.filter(r => r.status === "in-progress").length;
    document.getElementById("total-routes").textContent = `Total Routes: ${totalRoutes}`;
    document.getElementById("in-progress-routes").textContent = `Routes In Progress: ${inProgressRoutes}`;
}
