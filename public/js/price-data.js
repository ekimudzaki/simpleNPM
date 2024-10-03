fetch('/.netlify/functions/cellData')
    .then(response => response.json())
    .then(data => {
        // Get the current hour
        const now = new Date();
        const currentHourUTC = now.getUTCHours();

        // Adjust the current hour to GMT+7 (UTC+7)
        const currentHourGMT7 = (currentHourUTC + 7) % 24; // Adjust for time difference and wrap around 24-hour format

        //cek element body
        const tableBody = document.getElementById('table-body');

        // Logic: Check if it's before 9 AM (09:00)
        if (currentHourGMT7 < 9) {
            // Create a new <tr> element
            const newRow = document.createElement("tr");

            // Create a new <td> element
            const newCell = document.createElement("td");

            // Set the id attribute for the <td> element
            newCell.id = "message-cell";
            newCell.setAttribute('colspan', '3');
            newCell.style.textAlign = 'center';
            newCell.style.verticalAlign = 'middle';

            // Optionally, you can add text or other content inside the cell
            newCell.textContent = "Harga Emas hari ini akan di update setiap jam 9 WIB, Klik tombol di bawah untuk penjelasan lebih lanjut";

            //line break
            const lineBreak = document.createElement('br');
            newCell.appendChild(lineBreak);

            // Create a Bootstrap-styled button
            const button = document.createElement('button');
            button.classList.add('btn', 'btn-primary'); // Bootstrap button classes
            button.textContent = 'Hubungi Kami';
            // Add an onclick event to the button to redirect to a URL
            button.onclick = function () {
                window.location.href = 'https://www.google.com';  // The target URL
            };
            newCell.appendChild(button);

            // Append the <td> to the <tr>
            newRow.appendChild(newCell);

            // Append the new <tr> to the table's <tbody>
            tableBody.appendChild(newRow);

        } else {
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
        }
    })
    .catch(error => console.error('Error fetching data:', error));
