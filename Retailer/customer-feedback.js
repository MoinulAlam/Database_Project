// Get elements
const feedbackContainer = document.getElementById("feedback-container");

let feedbacks = [
    {
        customerName: "Alice Johnson",
        product: "Laptop",
        feedback: "Great performance and battery life!",
        seen: false,
    },
    {
        customerName: "Bob Smith",
        product: "Smartphone",
        feedback: "Very user-friendly and fast.",
        seen: false,
    },
    {
        customerName: "Cathy Brown",
        product: "Headphones",
        feedback: "Sound quality is amazing!",
        seen: false,
    },
    {
        customerName: "David Wilson",
        product: "Monitor",
        feedback: "Excellent clarity and resolution.",
        seen: false,
    },
    {
        customerName: "Emily Davis",
        product: "Keyboard",
        feedback: "The best keyboard I've ever used!",
        seen: false,
    },
    {
        customerName: "Frank Thomas",
        product: "Mouse",
        feedback: "Smooth tracking and comfortable to use.",
        seen: false,
    },
    {
        customerName: "Grace Lee",
        product: "Tablet",
        feedback: "Lightweight and perfect for reading.",
        seen: false,
    },
    {
        customerName: "Hannah Scott",
        product: "Smartwatch",
        feedback: "Stylish and functional!",
        seen: false,
    },
];

// Render Feedbacks
function renderFeedbacks() {
    feedbackContainer.innerHTML = '';
    feedbacks.forEach((feedback) => {
        const feedbackCard = document.createElement("div");
        feedbackCard.classList.add("card");

        feedbackCard.innerHTML = `
            <h3>Customer: ${feedback.customerName}</h3>
            <p>Product: ${feedback.product}</p>
            <p>Feedback: ${feedback.feedback}</p>
            <p>Status: <span class="${feedback.seen ? 'seen' : 'unseen'}">${feedback.seen ? 'Seen' : 'Unseen'}</span></p>
            <button class="btn" onclick="markAsSeen(${feedbacks.indexOf(feedback)})">Mark as Seen</button>
        `;

        feedbackContainer.appendChild(feedbackCard);
    });
}

// Mark Feedback as Seen
function markAsSeen(index) {
    feedbacks[index].seen = true;
    renderFeedbacks();
}

// Initial render of feedbacks
renderFeedbacks();
