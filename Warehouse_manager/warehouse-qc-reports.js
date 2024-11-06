// Get elements
const modal = document.getElementById("modal");
const openModalBtn = document.querySelector(".open-modal");
const closeModalBtn = document.querySelector(".close-modal");
const saveQcReportBtn = document.getElementById("saveQcReportBtn");
const qcReportForm = document.getElementById("qcReportForm");
const qcReportsContainer = document.getElementById("qc-reports-container");

let qcReports = JSON.parse(localStorage.getItem("qcReports")) || [];
let editIndex = null;

// Open Modal for Adding QC Report
openModalBtn.addEventListener("click", () => {
    openQcReportForm();
});

// Function to Open QC Report Form (Add/Edit Mode)
function openQcReportForm(report = {}) {
    qcReportForm.reset();
    document.getElementById("modal-title").textContent = editIndex !== null ? "Edit QC Report" : "Add New QC Report";
    document.getElementById("qcReportIndex").value = editIndex !== null ? editIndex : '';
    document.getElementById("itemName").value = report.itemName || '';
    document.getElementById("inspector").value = report.inspector || '';
    document.getElementById("date").value = report.date || '';
    document.getElementById("qualityStatus").value = report.qualityStatus || '';
    document.getElementById("remarks").value = report.remarks || '';
    modal.style.display = "flex";
}

// Close Modal
closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
    editIndex = null;
});

// Save QC Report
saveQcReportBtn.addEventListener("click", () => {
    const newReport = {
        itemName: document.getElementById("itemName").value,
        inspector: document.getElementById("inspector").value,
        date: document.getElementById("date").value,
        qualityStatus: document.getElementById("qualityStatus").value,
        remarks: document.getElementById("remarks").value
    };

    if (editIndex !== null) {
        // Edit mode - update QC report
        qcReports[editIndex] = newReport;
        editIndex = null;
    } else {
        // Add mode - add new QC report
        qcReports.push(newReport);
    }
    
    // Update localStorage
    localStorage.setItem("qcReports", JSON.stringify(qcReports));

    renderQcReports();
    modal.style.display = "none";
    qcReportForm.reset();
});

// Render QC Reports
function renderQcReports() {
    qcReportsContainer.innerHTML = '';
    qcReports.forEach((report, index) => {
        const reportCard = document.createElement("div");
        reportCard.classList.add("card");

        reportCard.innerHTML = `
            <h3>${report.itemName}</h3>
            <p>Inspector: ${report.inspector}</p>
            <p>Date: ${report.date}</p>
            <p>Quality Status: ${report.qualityStatus}</p>
            <p>Remarks: ${report.remarks}</p>
            <button class="btn" onclick="editQcReport(${index})">Edit</button>
            <button class="btn delete-btn" onclick="deleteQcReport(${index})">Delete</button>
        `;

        qcReportsContainer.appendChild(reportCard);
    });
}

// Edit QC Report
function editQcReport(index) {
    editIndex = index;
    openQcReportForm(qcReports[index]);
}

// Delete QC Report
function deleteQcReport(index) {
    qcReports.splice(index, 1);
    localStorage.setItem("qcReports", JSON.stringify(qcReports)); // Update localStorage after deletion
    renderQcReports();
}

// Close Modal when Clicking Outside
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// Initial Render on Page Load
document.addEventListener("DOMContentLoaded", renderQcReports);
