import express from 'express';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';


// Initialize auth - see https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication
const app = express();
const jsonDataBase64 = process.env.KEY;
const decode = JSON.parse(Buffer.from(jsonDataBase64, 'base64').toString());
const serviceAccountAuth = new JWT({
  // env var values here are copied from service account credentials generated by google
  // see "Authentication" section in docs for more info
  email: process.env.EMAIL,
  key: decode.private_key,
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets',
  ],
});

// Set the view engine to Pug
// app.set('view engine', 'pug');
// app.set('views', './new_views'); // Specify the folder where your Pug templates are located
app.use(express.static('public')); // Assuming 'public' is your assets folder name


// Initialize the document
const doc = new GoogleSpreadsheet('1BsEIF91CGBQjni0O4XDIpMFsk1i9ldo0Rv6-meCa6Hc', serviceAccountAuth);

// Load the document properties and worksheets
await doc.loadInfo();
console.log(doc.title);

// Access a specific sheet
const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
console.log(sheet.title);
console.log(sheet.rowCount);

//
// const sheet = doc.sheetsByTitle["Harga hari ini"]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
// console.log(sheet.getRows());


// await sheet.loadCells('B2:F13');
// console.log(sheet.cellStats);

// // Read rows
// const rows = await sheet.getRows();
// console.log(rows[0].name); // logs the first row's name column

//commented because moving to netlify functions
// async function getCellData(range) {
//   // await doc.useServiceAccountAuth(serviceAccountAuth);
//   await doc.loadInfo();
//   const sheet = doc.sheetsByIndex[0];
//   await sheet.loadCells(range);
//   // Create an array to hold cell values
//   const cellData = [];

//   // Retrieve cell values and add them to the array
//   for (let row = 4; row <= 12; row++) {
//     const rowData = [];
//     for (let col = 2; col <= 5; col++) {
//       const cell = sheet.getCell(row, col);
//       rowData.push(cell.formattedValue);
//     }
//     cellData.push(rowData);
//   }

//   // Convert the array to a JSON object
//   const jsonData = {
//     cellData,
//   };
//   console.log(JSON.stringify(jsonData, null, 2));
//   return jsonData;

// }

// app.get('/simulator', async (req, res) => {
//   res.render('simulator')
// });

// app.get('/cellData', async (req, res) => {
//   const jsonData = await getCellData('C2:F13');
//   res.json(jsonData);  // Send cellData as JSON
// });


//Render the index.pug template with the provided data
// app.get('/', async (req, res) => {
//   // const jsonData = await getCellData('C2:F13'); // Load your JSON data
//   const day = new Date().toLocaleDateString('id-ID', { weekday: 'long' });
//   const date = new Date().toLocaleDateString('id-ID');
//   res.render('index', { cellData: jsonData.cellData, day, date });
// }); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
