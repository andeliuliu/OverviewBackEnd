const fs = require('fs');
const csv = require('csv-parser');

// Specify the path to your CSV file
const filePath = '/../CSV Files/photos.csv';

fs.createReadStream(filePath)
  .pipe(csv())
  .on('data', (row) => {
    // Process each row of the CSV file
    console.log(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });