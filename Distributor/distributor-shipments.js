// Get elements
const shipmentsContainer = document.getElementById("shipments-container");
const shipmentModal = document.getElementById("shipmentModal");
const shipmentForm = document.getElementById("shipmentForm");
const modalTitle = document.getElementById("modal-title");

let shipments = JSON.parse(localStorage.getItem("shipments")) || [];
let editIndex = null;

// Open Shipment Form (Add/Edit Mode)
function openShipmentForm(shipment = {}) {
    shipmentForm.reset();
    modalTitle.textContent = editIndex !== null ? "Edit Shipment" : "Add New Shipment";
    document.getElementById("shipmentIndex").value = editIndex !== null ? editIndex : '';
    document.getElementById("destination").value = shipment.destination || '';
    document.getElementById("status").value = shipment.status || 'active';
    document.getElementById("expectedDate").value = shipment.expectedDate || '';
    document.getElementById("vehicle").value = shipment.vehicle || '';
    shipmentModal.style.display = "flex";
}

// Close Shipment Form
function closeShipmentForm() {
    shipmentModal.style.display = "none";
    editIndex = null;
}

// Save Shipment to Local Storage
function saveShipment() {
    const newShipment = {
        destination: document.getElementById("destination").value,
        status: document.getElementById("status").value,
        expectedDate: document.getElementById("expectedDate").value,
        vehicle: document.getElementById("vehicle").value
    };

    if (editIndex !== null) {
        // Edit mode - update shipment
        shipments[editIndex] = newShipment;
        editIndex = null;
    } else {
        // Add mode - add new shipment
        shipments.push(newShipment);
    }

    localStorage.setItem("shipments", JSON.stringify(shipments));
    renderShipments();
    closeShipmentForm();
}

// Render Shipments
function renderShipments() {
    shipmentsContainer.innerHTML = '';
    shipments.forEach((shipment, index) => {
        const shipmentCard = document.createElement("div");
        shipmentCard.classList.add("card");

        shipmentCard.innerHTML = `
            <h3>Destination: ${shipment.destination}</h3>
            <p>Status: ${shipment.status}</p>
            <p>Expected Delivery: ${shipment.expectedDate}</p>
            <p>Assigned Vehicle: ${shipment.vehicle}</p>
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
    localStorage.setItem("shipments", JSON.stringify(shipments));
    renderShipments();
}

// Close Modal when Clicking Outside
window.addEventListener("click", (event) => {
    if (event.target === shipmentModal) {
        closeShipmentForm();
    }
});

// Initial render of shipments
renderShipments();
