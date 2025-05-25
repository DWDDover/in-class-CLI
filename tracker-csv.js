// Import the readline module for command-line interaction
const readline = require('readline');
// Import the fs (file system) for file operations
const fs = require('fs');

// Define the file name for storing expenses in JSON format
const FILE = 'expenses.json'

// Initialize the expenses array ; load the data from the file if it exists
let expenses = [];
if(fs.existsSync(FILE)) {
    try{
        //Read and parse the file's contents
        expenses = JSON.parse(fs.readFileSync(FILE, 'utf8'));
    } catch {
        expenses = []; //if error dont print the error but start with an empty array
    }
}

//Create a readline interface for user input and output
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

//Function to save expenses array to the JSON file
function saveExpenses() {
    fs.writeFileSync(FILE, JSON.stringify(expenses, null, 2)); //pretty-print with 2 space indentation
}

// Fucntnion ot display all expenses in a table format
function printExpensesTable() {
    if(expenses.length === 0) { // if there are no expense return a message
        console.log('\nNo expenses recorded');
        return
    }
    //Print table headers
    console.log('\n# | Date | Time | Amount | Category | Description')
    console.log('------------------------------------------------')
    //print each expense as a formatted row
    expenses.forEach((exp, idx) => {
        let row = 
        String(idx + 1).padEnd(2) + '|' +           //expense number, padded for alignment
        exp.date.padEnd(10) + '|' +                 //expense date, padded for alignment
        exp.time.padEnd(8) + '| $' +                //expense time, padded for alignment with '$' for the amount
        exp.amount.toFixed(2).padEnd(7) + '|' +     //expense amount, fixed to 2 decimal places and padded for alignment
        exp.category.padEnd(12) + '|' +             // expense category, padded for alignment
        exp.description                             // expense description, no padding
        console.log(row);
    })
}
