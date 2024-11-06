// Get elements
const modal = document.getElementById("modal");
const openModalBtn = document.querySelector(".open-modal");
const closeModalBtn = document.querySelector(".close-modal");
const saveContractBtn = document.getElementById("saveContractBtn");
const contractForm = document.getElementById("contractForm");
const contractsContainer = document.getElementById("contracts-container");

let contracts = [];
let editIndex = null;

// Open Modal for Adding Contract
openModalBtn.addEventListener("click", () => {
    openContractForm();
});

// Function to Open Contract Form (Add/Edit Mode)
function openContractForm(contract = {}) {
    contractForm.reset();
    document.getElementById("modal-title").textContent = editIndex !== null ? "Edit Contract" : "Add New Contract";
    document.getElementById("contractIndex").value = editIndex !== null ? editIndex : '';
    document.getElementById("contractName").value = contract.name || '';
    document.getElementById("partnerName").value = contract.partnerName || '';
    document.getElementById("startDate").value = contract.startDate || '';
    document.getElementById("endDate").value = contract.endDate || '';
    modal.style.display = "flex";
}

// Close Modal
closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
    editIndex = null;
});

// Save Contract
saveContractBtn.addEventListener("click", () => {
    const newContract = {
        name: document.getElementById("contractName").value,
        partnerName: document.getElementById("partnerName").value,
        startDate: document.getElementById("startDate").value,
        endDate: document.getElementById("endDate").value,
    };

    if (editIndex !== null) {
        // Edit mode - update contract
        contracts[editIndex] = newContract;
        editIndex = null;
    } else {
        // Add mode - add new contract
        contracts.push(newContract);
    }
    
    renderContracts();
    modal.style.display = "none";
    contractForm.reset();
});

// Render Contracts
function renderContracts() {
    contractsContainer.innerHTML = '';
    contracts.forEach((contract, index) => {
        const contractCard = document.createElement("div");
        contractCard.classList.add("card");

        contractCard.innerHTML = `
            <h3>${contract.name}</h3>
            <p>Partner Name: ${contract.partnerName}</p>
            <p>Start Date: ${contract.startDate}</p>
            <p>End Date: ${contract.endDate}</p>
            <button class="btn" onclick="editContract(${index})">Edit</button>
            <button class="btn delete-btn" onclick="deleteContract(${index})">Delete</button>
        `;

        contractsContainer.appendChild(contractCard);
    });
}

// Edit Contract
function editContract(index) {
    editIndex = index;
    openContractForm(contracts[index]);
}

// Delete Contract
function deleteContract(index) {
    contracts.splice(index, 1);
    renderContracts();
}

// Close Modal when Clicking Outside
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});
