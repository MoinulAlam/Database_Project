// Get elements
const modal = document.getElementById("modal");
const openModalBtn = document.querySelector(".open-modal");
const closeModalBtn = document.querySelector(".close-modal");
const saveShipmentBtn = document.getElementById("saveShipmentBtn");
const shipmentForm = document.getElementById("shipmentForm");
const shipmentsContainer = document.getElementById("shipments-container");

let shipments = [];
let editIndex = null;

// Open Modal for Adding Shipment
openModalBtn.addEventListener("click", () => {
    openShipmentForm();
});

// Function to Open Shipment Form (Add/Edit Mode)
function openShipmentForm(shipment = {}) {
    shipmentForm.reset();
    document.getElementById("modal-title").textContent = editIndex !== null ? "Edit Shipment" : "Add New Shipment";
    document.getElementById("shipmentIndex").value = editIndex !== null ? editIndex : '';
    document.getElementById("shipmentName").value = shipment.name || '';
    document.getElementById("destination").value = shipment.destination || '';
    document.getElementById("date").value = shipment.date || '';
    document.getElementById("status").value = shipment.status || '';
    modal.style.display = "flex";
}

// Close Modal
closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
    editIndex = null;
});

// Save Shipment
saveShipmentBtn.addEventListener("click", () => {
    const newShipment = {
        name: document.getElementById("shipmentName").value,
        destination: document.getElementById("destination").value,
        date: document.getElementById("date").value,
        status: document.getElementById("status").value,
    };

    if (editIndex !== null) {
        // Edit mode - update shipment
        shipments[editIndex] = newShipment;
        editIndex = null;
    } else {
        // Add mode - add new shipment
        shipments.push(newShipment);
    }
    
    renderShipments();
    modal.style.display = "none";
    shipmentForm.reset();
});

// Render Shipments
function renderShipments() {
    shipmentsContainer.innerHTML = '';
    shipments.forEach((shipment, index) => {
        const shipmentCard = document.createElement("div");
        shipmentCard.classList.add("card");

        shipmentCard.innerHTML = `
            <h3>${shipment.name}</h3>
            <p>Destination: ${shipment.destination}</p>
            <p>Shipment Date: ${shipment.date}</p>
            <p>Status: ${shipment.status}</p>
            <button class="btn" onclick="editShipment(${index})">Edit</button>
            <button class="btn delete-btn" onclick="deleteShipment(${index})">Delete</button>
        `;

        shipmentsContainer.appendChild(shipmentCard);
    });
}

// Edit Shipment
function editShipment(index) {
    editIndex = index;
    openShipmentForm(shipments[index]);
}

// Delete Shipment
function deleteShipment(index) {
    shipments.splice(index, 1);
    renderShipments();
}

// Close Modal when Clicking Outside
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});
