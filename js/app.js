// Execute code when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Add student information dynamically
    var studentInfo = document.getElementById('student-info');
    studentInfo.textContent = 'Student ID: 200550743 | Name: Karan Gill';

    // API Key and API URL
    const apiKey = '3270052faf0a48728618afb5a6c1bc78';
    const apiUrl = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`;

    // Function to fetch exchange rates from the API
    function fetchExchangeRates() {
        // Fetch data from the API
        fetch(apiUrl)
            .then(response => response.json()) // Parse response as JSON
            .then(data => {
                // Call function to display exchange rates
                displayExchangeRates(data);
            })
            .catch(error => {
                // Log error message to console if fetch fails
                console.log('Error fetching exchange rates:', error);
            });
    }

    // Function to display exchange rates in a table
    function displayExchangeRates(data) {
        // Create a table element for displaying exchange rates
        const exchangeRatesTable = document.createElement('table');
        exchangeRatesTable.classList.add('table', 'table-striped', 'mt-4'); // Add Bootstrap table classes

        // Create table header
        const tableHeader = document.createElement('thead');
        tableHeader.innerHTML = `
            <tr>
                <th>Currency</th>
                <th>Rate</th>
            </tr>
        `;
        exchangeRatesTable.appendChild(tableHeader);

        // Create table body and populate with exchange rate data
        const tableBody = document.createElement('tbody');
        for (const currency in data.rates) {
            const rate = data.rates[currency].toFixed(2); // Format rate to two decimal places
            const row = `
                <tr>
                    <td>${currency}</td>
                    <td>${rate}</td>
                </tr>
            `;
            tableBody.innerHTML += row; // Append row to table body
        }
        exchangeRatesTable.appendChild(tableBody); // Append table body to table

        // Append table to the page
        document.getElementById('exchange-rates').appendChild(exchangeRatesTable);
    }

    // Fetch exchange rates when the page loads
    fetchExchangeRates();
});
