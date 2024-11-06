// Function to update Dashboard with data from Local Storage
function updateDashboard() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
    const demandData = JSON.parse(localStorage.getItem('demandData')) || {};

    // Update Orders Summary
    const totalOrders = orders.length;
    const completedOrders = orders.filter(order => order.status === 'Completed').length;
    const pendingOrders = orders.filter(order => order.status === 'Pending').length;

    document.getElementById('orders-count').innerText = `Total Orders: ${totalOrders}`;
    document.getElementById('completed-orders').innerText = `Completed: ${completedOrders}`;
    document.getElementById('pending-orders').innerText = `Pending: ${pendingOrders}`;

    // Update Forecasted Demand
    const forecastedDemand = demandData.forecasted || 0;
    document.getElementById('forecasted-demand').innerText = `Forecasted Demand for Next Month: ${forecastedDemand}`;

    // Update Customer Feedback Summary
    const totalFeedback = feedbacks.length;
    const unseenFeedback = feedbacks.filter(feedback => !feedback.seen).length;

    document.getElementById('total-feedback').innerText = `Total Feedback: ${totalFeedback}`;
    document.getElementById('unseen-feedback').innerText = `Unseen Feedback: ${unseenFeedback}`;
}

// Initial call to update the dashboard
updateDashboard();
