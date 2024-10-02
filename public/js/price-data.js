fetch('/.netlify/functions/cellData')
    .then(response => response.json())
    .then(data => {
        const tableBody = document.getElementById('table-body');

        // Loop through the cellData array and create rows
        data.cellData.forEach(row => {
            // Create a new table row
            const tr = document.createElement('tr');

            // Create a table cell for the 0th, 3rd, and 2nd elements only
            const tdWeight = document.createElement('td');  // Weight (index 0)
            tdWeight.textContent = row[0];
            tr.appendChild(tdWeight);

            const tdOtherPrice = document.createElement('td');  // Other Price (index 3)
            tdOtherPrice.textContent = row[3];
            tr.appendChild(tdOtherPrice);

            const tdSellPrice = document.createElement('td');  // Sell Price (index 2)
            tdSellPrice.textContent = row[2];
            tr.appendChild(tdSellPrice);

            // Append the row to the table body
            tableBody.appendChild(tr);
        });
    })
    .catch(error => console.error('Error fetching data:', error));
