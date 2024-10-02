async function getCellData(range) {
    // await doc.useServiceAccountAuth(serviceAccountAuth);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    await sheet.loadCells(range);
    // Create an array to hold cell values
    const cellData = [];

    // Retrieve cell values and add them to the array
    for (let row = 4; row <= 12; row++) {
        const rowData = [];
        for (let col = 2; col <= 5; col++) {
            const cell = sheet.getCell(row, col);
            rowData.push(cell.formattedValue);
        }
        cellData.push(rowData);
    }

    // Convert the array to a JSON object
    const jsonData = {
        cellData,
    };
    console.log(JSON.stringify(jsonData, null, 2));
    return jsonData;

}

exports.handler = async function (event, context) {
    const cellData = await getCellData('C2:F13');

    return {
        statusCode: 200,
        body: JSON.stringify(cellData),
    };
}
