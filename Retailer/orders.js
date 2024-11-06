// Get elements
const ordersContainer = document.getElementById("orders-container");
const orderModal = document.getElementById("orderModal");
const orderForm = document.getElementById("orderForm");
const modalTitle = document.getElementById("modal-title");

let orders = JSON.parse(localStorage.getItem("orders")) || [];
let editIndex = null;

// Open Order Form (Add/Edit Mode)
function openOrderForm(order = {}) {
    orderForm.reset();
    modalTitle.textContent = editIndex !== null ? "Edit Order" : "Add New Order";
    document.getElementById("orderIndex").value = editIndex !== null ? editIndex : '';
    document.getElementById("customerName").value = order.customerName || '';
    document.getElementById("orderDate").value = order.orderDate || '';
    document.getElementById("totalAmount").value = order.totalAmount || '';
    document.getElementById("status").value = order.status || 'pending';
    orderModal.style.display = "flex";
}

// Close Order Form
function closeOrderForm() {
    orderModal.style.display = "none";
    editIndex = null;
}

// Save Order to Local Storage
function saveOrder() {
    const newOrder = {
        customerName: document.getElementById("customerName").value,
        orderDate: document.getElementById("orderDate").value,
        totalAmount: document.getElementById("totalAmount").value,
        status: document.getElementById("status").value
    };

    if (editIndex !== null) {
        // Edit mode - update order
        orders[editIndex] = newOrder;
        editIndex = null;
    } else {
        // Add mode - add new order
        orders.push(newOrder);
    }

    localStorage.setItem("orders", JSON.stringify(orders));
    renderOrders();
    closeOrderForm();
}

// Render Orders
function renderOrders() {
    ordersContainer.innerHTML = '';
    orders.forEach((order, index) => {
        const orderCard = document.createElement("div");
        orderCard.classList.add("card");

        orderCard.innerHTML = `
            <h3>Customer: ${order.customerName}</h3>
            <p>Order Date: ${order.orderDate}</p>
            <p>Total Amount: $${order.totalAmount}</p>
            <p>Status: ${order.status}</p>
            <button class="btn" onclick="editOrder(${index})">Edit</button>
            <button class="btn delete-btn" onclick="deleteOrder(${index})">Delete</button>
        `;

        ordersContainer.appendChild(orderCard);
    });
}

// Edit Order
function editOrder(index) {
    editIndex = index;
    openOrderForm(orders[index]);
}

// Delete Order
function deleteOrder(index) {
    orders.splice(index, 1);
    localStorage.setItem("orders", JSON.stringify(orders));
    renderOrders();
}

// Close Modal when Clicking Outside
window.addEventListener("click", (event) => {
    if (event.target === orderModal) {
        closeOrderForm();
    }
});

// Initial render of orders
renderOrders();
