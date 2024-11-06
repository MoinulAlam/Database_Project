const modal = document.getElementById("modal");
const openModalBtn = document.querySelector(".open-modal");
const closeModalBtn = document.querySelector(".close-modal");
const saveItemBtn = document.getElementById("saveItemBtn");
const inventoryForm = document.getElementById("inventoryForm");
const inventoryContainer = document.getElementById("inventory-container");

let inventory = [];
let editIndex = null;

// Open Modal for Adding Inventory Item
openModalBtn.addEventListener("click", () => {
    openInventoryForm();
});

// Open Inventory Form with Optional Data for Editing
function openInventoryForm(item = {}) {
    inventoryForm.reset();
    document.getElementById("itemIndex").value = editIndex !== null ? editIndex : '';
    document.getElementById("itemName").value = item.name || '';
    document.getElementById("category").value = item.category || '';
    document.getElementById("quantity").value = item.quantity || '';
    document.getElementById("condition").value = item.condition || '';
    modal.style.display = "flex";
}

// Close Modal
closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
    editIndex = null;
});

// Save Inventory Item
saveItemBtn.addEventListener("click", () => {
    const newItem = {
        name: document.getElementById("itemName").value,
        category: document.getElementById("category").value,
        quantity: document.getElementById("quantity").value,
        condition: document.getElementById("condition").value,
    };

    if (editIndex !== null) {
        inventory[editIndex] = newItem;
        editIndex = null;
    } else {
        inventory.push(newItem);
    }
    
    renderInventory();
    modal.style.display = "none";
    inventoryForm.reset();
});

// Render Inventory Items
function renderInventory() {
    inventoryContainer.innerHTML = '';
    inventory.forEach((item, index) => {
        const itemCard = document.createElement("div");
        itemCard.classList.add("card");

        itemCard.innerHTML = `
            <h3>${item.name}</h3>
            <p>Category: ${item.category}</p>
            <p>Quantity: ${item.quantity} kg</p>
            <p>Condition: ${item.condition}</p>
            <button class="btn" onclick="editItem(${index})">Edit</button>
            <button class="btn delete-btn" onclick="deleteItem(${index})">Delete</button>
        `;

        inventoryContainer.appendChild(itemCard);
    });
}

// Edit Inventory Item
function editItem(index) {
    editIndex = index;
    openInventoryForm(inventory[index]);
}

// Delete Inventory Item
function deleteItem(index) {
    inventory.splice(index, 1);
    renderInventory();
}

// Close Modal when Clicking Outside
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});
