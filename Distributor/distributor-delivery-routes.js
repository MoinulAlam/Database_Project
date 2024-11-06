// Get elements
const modal = document.getElementById("modal");
const openModalBtn = document.querySelector(".open-modal");
const closeModalBtn = document.querySelector(".close-modal");
const saveRouteBtn = document.getElementById("saveRouteBtn");
const routeForm = document.getElementById("routeForm");
const routesContainer = document.getElementById("routes-container");

let routes = [];
let editIndex = null;

// Open Modal for Adding Delivery Route
openModalBtn.addEventListener("click", () => {
    openRouteForm();
});

// Function to Open Route Form (Add/Edit Mode)
function openRouteForm(route = {}) {
    routeForm.reset();
    document.getElementById("modal-title").textContent = editIndex !== null ? "Edit Delivery Route" : "Add New Delivery Route";
    document.getElementById("routeIndex").value = editIndex !== null ? editIndex : '';
    document.getElementById("routeName").value = route.routeName || '';
    document.getElementById("assignedVehicle").value = route.assignedVehicle || '';
    document.getElementById("destination").value = route.destination || '';
    document.getElementById("status").value = route.status || 'in-progress';
    document.getElementById("deliveryDate").value = route.deliveryDate || '';
    modal.style.display = "flex";
}

// Close Modal
closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
    editIndex = null;
});

// Save Delivery Route
saveRouteBtn.addEventListener("click", () => {
    const newRoute = {
        routeName: document.getElementById("routeName").value,
        assignedVehicle: document.getElementById("assignedVehicle").value,
        destination: document.getElementById("destination").value,
        status: document.getElementById("status").value,
        deliveryDate: document.getElementById("deliveryDate").value
    };

    if (editIndex !== null) {
        // Edit mode - update route
        routes[editIndex] = newRoute;
        editIndex = null;
    } else {
        // Add mode - add new route
        routes.push(newRoute);
    }

    localStorage.setItem("routes", JSON.stringify(routes));
    renderRoutes();
    updateDashboard(); // Update dashboard statistics
    modal.style.display = "none";
    routeForm.reset();
});

// Render Delivery Routes
function renderRoutes() {
    routesContainer.innerHTML = '';
    routes.forEach((route, index) => {
        const routeCard = document.createElement("div");
        routeCard.classList.add("card");

        routeCard.innerHTML = `
            <h3>${route.routeName}</h3>
            <p>Assigned Vehicle: ${route.assignedVehicle}</p>
            <p>Destination: ${route.destination}</p>
            <p>Status: ${route.status}</p>
            <p>Expected Delivery Date: ${route.deliveryDate}</p>
            <button class="btn" onclick="editRoute(${index})">Edit</button>
            <button class="btn delete-btn" onclick="deleteRoute(${index})">Delete</button>
        `;

        routesContainer.appendChild(routeCard);
    });
}

// Edit Delivery Route
function editRoute(index) {
    editIndex = index;
    openRouteForm(routes[index]);
}

// Delete Delivery Route
function deleteRoute(index) {
    routes.splice(index, 1);
    localStorage.setItem("routes", JSON.stringify(routes));
    renderRoutes();
    updateDashboard(); // Update dashboard statistics
}

// Close Modal when Clicking Outside
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// Load Routes on Page Load
document.addEventListener("DOMContentLoaded", () => {
    routes = JSON.parse(localStorage.getItem("routes")) || [];
    renderRoutes();
});
