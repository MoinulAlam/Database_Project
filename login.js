function login() {
    const username = document.getElementById('loginUserName').value;
    const password = document.getElementById('loginPassword').value;
    const userType = document.getElementById('userType').value;
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.name === username && u.password === password && u.role === userType);

    if (user) {
        // Successful login, redirect to the appropriate dashboard based on user role
        switch (userType) {
            case 'Farmer':
                window.location.href = 'file:///C:/Users/moinu/OneDrive/Desktop/DBMS%20Project/Farmer/farmers-dashboard.html'; // Farmer dashboard
                break;
            case 'Retailer':
                window.location.href = 'file:///C:/Users/moinu/OneDrive/Desktop/DBMS%20Project/Retailer/retailer-dashboard.html'; // Retailer dashboard
                break;
            case 'Distributor':
                window.location.href = 'file:///C:/Users/moinu/OneDrive/Desktop/DBMS%20Project/Distributor/distributor_dashboard.html'; // Distributor dashboard
                break;
            case 'Admin':
                window.location.href = 'file:///C:/Users/moinu/OneDrive/Desktop/DBMS%20Project/Admin/admin-dashboard.html'; // Admin dashboard
                break;
            default:
                break;
        }
    } else {
        document.getElementById('loginError').innerText = 'Invalid username or password';
    }
}
