document.addEventListener("DOMContentLoaded", () => {
    loadSettings();

    const settingsForm = document.getElementById("settingsForm");

    // Handle form submission to save settings
    settingsForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const temperatureThreshold = document.getElementById("temperatureThreshold").value;
        const notificationsEnabled = document.getElementById("notificationsEnabled").checked;

        const settings = {
            temperatureThreshold,
            notificationsEnabled
        };

        localStorage.setItem("settings", JSON.stringify(settings));
        alert("Settings saved successfully!");
    });

    // Load settings from local storage on page load
    function loadSettings() {
        const settings = JSON.parse(localStorage.getItem("settings")) || {
            temperatureThreshold: "",
            notificationsEnabled: false
        };

        document.getElementById("temperatureThreshold").value = settings.temperatureThreshold;
        document.getElementById("notificationsEnabled").checked = settings.notificationsEnabled;
    }
});
