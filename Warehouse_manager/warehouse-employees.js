// Get elements
const modal = document.getElementById("modal");
const openModalBtn = document.querySelector(".open-modal");
const closeModalBtn = document.querySelector(".close-modal");
const saveEmployeeBtn = document.getElementById("saveEmployeeBtn");
const employeeForm = document.getElementById("employeeForm");
const employeesContainer = document.getElementById("employees-container");

let employees = [];
let editIndex = null;

// Open Modal for Adding Employee
openModalBtn.addEventListener("click", () => {
    openEmployeeForm();
});

// Function to Open Employee Form (Add/Edit Mode)
function openEmployeeForm(employee = {}) {
    employeeForm.reset();
    document.getElementById("modal-title").textContent = editIndex !== null ? "Edit Employee" : "Add New Employee";
    document.getElementById("employeeIndex").value = editIndex !== null ? editIndex : '';
    document.getElementById("employeeName").value = employee.name || '';
    document.getElementById("role").value = employee.role || '';
    document.getElementById("contact").value = employee.contact || '';
    document.getElementById("assignedWarehouse").value = employee.assignedWarehouse || '';
    modal.style.display = "flex";
}

// Close Modal
closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
    editIndex = null;
});

// Save Employee
saveEmployeeBtn.addEventListener("click", () => {
    const newEmployee = {
        name: document.getElementById("employeeName").value,
        role: document.getElementById("role").value,
        contact: document.getElementById("contact").value,
        assignedWarehouse: document.getElementById("assignedWarehouse").value
    };

    if (editIndex !== null) {
        // Edit mode - update employee
        employees[editIndex] = newEmployee;
        editIndex = null;
    } else {
        // Add mode - add new employee
        employees.push(newEmployee);
    }
    
    renderEmployees();
    modal.style.display = "none";
    employeeForm.reset();
});

// Render Employees
function renderEmployees() {
    employeesContainer.innerHTML = '';
    employees.forEach((employee, index) => {
        const employeeCard = document.createElement("div");
        employeeCard.classList.add("card");

        employeeCard.innerHTML = `
            <h3>${employee.name}</h3>
            <p>Role: ${employee.role}</p>
            <p>Contact: ${employee.contact}</p>
            <p>Assigned Warehouse: ${employee.assignedWarehouse}</p>
            <button class="btn" onclick="editEmployee(${index})">Edit</button>
            <button class="btn delete-btn" onclick="deleteEmployee(${index})">Delete</button>
        `;

        employeesContainer.appendChild(employeeCard);
    });
}

// Edit Employee
function editEmployee(index) {
    editIndex = index;
    openEmployeeForm(employees[index]);
}

// Delete Employee
function deleteEmployee(index) {
    employees.splice(index, 1);
    renderEmployees();
}

// Close Modal when Clicking Outside
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});
