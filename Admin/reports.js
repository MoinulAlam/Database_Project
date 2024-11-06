// Load reports on page load
document.addEventListener("DOMContentLoaded", loadReports);

// Generate new report
function generateReport() {
    const reports = JSON.parse(localStorage.getItem("reports")) || [];
    const newReport = {
        date: new Date().toLocaleString(),
        details: `Report generated at ${new Date().toLocaleString()}`
    };

    reports.push(newReport);
    localStorage.setItem("reports", JSON.stringify(reports));
    loadReports();
}

// Display all reports
function loadReports() {
    const reports = JSON.parse(localStorage.getItem("reports")) || [];
    const reportList = document.getElementById("reportList");

    reportList.innerHTML = reports.map((report, index) => `
        <div class="report-item">
            <span>${report.date} - ${report.details}</span>
            <button onclick="deleteReport(${index})">Delete</button>
        </div>
    `).join("");
}

// Delete a specific report
function deleteReport(index) {
    const reports = JSON.parse(localStorage.getItem("reports"));
    reports.splice(index, 1);
    localStorage.setItem("reports", JSON.stringify(reports));
    loadReports();
}
