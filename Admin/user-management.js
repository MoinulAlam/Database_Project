let users = []; // Array to store user data
let editIndex = -1; // To track which user is being edited

// Load users from local storage on page load
window.onload = function() {
    loadUsers();
};

function openUserForm() {
    document.getElementById('user-modal').style.display = 'block';
    document.getElementById('userName').value = '';
    document.getElementById('userPassword').value = ''; // Clear password
    document.getElementById('userRole').value = 'Farmer';
    document.getElementById('userStatus').value = 'active';
    editIndex = -1; // Reset index for adding a new user
}

function closeUserForm() {
    document.getElementById('user-modal').style.display = 'none';
}

function saveUser() {
    const userName = document.getElementById('userName').value;
    const userPassword = document.getElementById('userPassword').value; // Get password
    const userRole = document.getElementById('userRole').value;
    const userStatus = document.getElementById('userStatus').value;

    if (editIndex === -1) {
        // Adding a new user
        const newUser = {
            name: userName,
            password: userPassword, // Store password
            role: userRole,
            status: userStatus
        };
        users.push(newUser);
    } else {
        // Editing an existing user
        users[editIndex] = {
            name: userName,
            password: userPassword, // Update password
            role: userRole,
            status: userStatus
        };
    }

    localStorage.setItem('users', JSON.stringify(users));
    closeUserForm();
    loadUsers();
}

function loadUsers() {
    const userListDiv = document.getElementById('user-list');
    userListDiv.innerHTML = ''; // Clear previous user list
    users = JSON.parse(localStorage.getItem('users')) || [];

    users.forEach((user, index) => {
        const userCard = document.createElement('div');
        userCard.classList.add('card');
        userCard.innerHTML = `
            <h4>${user.name}</h4>
            <p>Role: ${user.role}</p>
            <p>Status: ${user.status}</p>
            <button onclick="editUser(${index})">Edit</button>
            <button onclick="deleteUser(${index})">Delete</button>
        `;
        userListDiv.appendChild(userCard);
    });
}

function editUser(index) {
    const user = users[index];
    document.getElementById('userName').value = user.name;
    document.getElementById('userPassword').value = user.password; // Set password
    document.getElementById('userRole').value = user.role;
    document.getElementById('userStatus').value = user.status;
    editIndex = index; // Set edit index
    openUserForm();
}

function deleteUser(index) {
    users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(users));
    loadUsers();
}
