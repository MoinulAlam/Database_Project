// demand-forecasting.js

// Function to forecast demand based on historical sales data
function forecastDemand() {
    const historicalSales = document.getElementById('historicalSales').value.split(',').map(Number);
    const resultsList = document.getElementById('resultsList');
    const salesChart = document.getElementById('salesChart');
    const ctx = salesChart.getContext('2d');
    
    resultsList.innerHTML = ''; // Clear previous results

    // Validate input
    if (historicalSales.length === 0 || historicalSales.includes(NaN)) {
        alert("Please enter valid numerical sales data.");
        return;
    }

    // Calculate linear regression to forecast demand
    const n = historicalSales.length;
    const x = Array.from({ length: n }, (_, i) => i + 1); // Months (1, 2, 3, ...)
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = historicalSales.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((acc, val, index) => acc + val * historicalSales[index], 0);
    const sumX2 = x.reduce((acc, val) => acc + val * val, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    // Predict future demand for the next month
    const nextMonthIndex = n + 1; // Index for next month
    const predictedDemandNextMonth = Math.round(slope * nextMonthIndex + intercept);

    // Display forecast results
    const resultItem = document.createElement('li');
    resultItem.textContent = `Forecasted Demand for next month: ${predictedDemandNextMonth}`;
    resultsList.appendChild(resultItem);

    // Prepare data for the chart
    salesChart.style.display = 'block'; // Show the chart canvas
    const chartData = {
        labels: historicalSales.map((_, index) => `Month ${index + 1}`), // Create labels (Month 1, Month 2, ...)
        datasets: [
            {
                label: 'Historical Sales',
                data: historicalSales,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false, // No fill under the line
                tension: 0.1 // Smooth line
            },
            {
                label: 'Predicted Demand',
                data: [...historicalSales, predictedDemandNextMonth], // Append the next month's prediction
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                fill: false,
                tension: 0 // Straight line
            }
        ]
    };

    // Create the chart
    new Chart(ctx, {
        type: 'line', // Change to line chart
        data: chartData,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Sales'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Months'
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                },
            },
        },
    });
}
