function GenerateTable()
{
    var table_container = document.querySelector("#ExpenseTable");
    table_container.innerHTML = ""; // clear the existing table
    var PeopleNum = document.querySelector("#numPeople").value; // get the number of people
    
    // Create the head columns
    var header = `<head>
                    <tr>
                        <th>Person</th>
                        <th>Expense</th>
                    </tr>
                </head>`
    
    table_container.innerHTML += header; // have to include innerHTML if you write raw HTML code
    
    for (let i = 0; i < PeopleNum; i++)
    {
        var row = document.createElement("tr"); // one row
        var col1 = document.createElement("td");// two columns
        var col2 = document.createElement("td");
        
        //Column 1 : Person#
        col1.textContent = "Person " + (i+1);
        col1.className = "person_id";
        row.append(col1);
        //Column 2 : Expense Input
        var ExpenseInput = document.createElement("input");
        ExpenseInput.type = "number";
        ExpenseInput.className = "expense";
        ExpenseInput.id = "person" + (i+1);
        // ExpenseInput.addEventListener= ("input", updateTotalExpense); // dynamically calculates the sum and average
        col2.append(ExpenseInput);
        row.append(col2);
        //Add row to the table
        table_container.append(row)
    }
    
    // Create a calculate button on the bottom of the table
    var button_generate = document.createElement("button");
    button_generate.textContent = "Calculate";
    button_generate.id = "calculate";
    table_container.append(button_generate);
    button_generate.addEventListener ('click', CalculateSum); // eventlistener has to be added in the last 
}

function CalculateSum()
{
    const peopleNum = document.querySelector("#numPeople").value;
    var expenseInputs = document.querySelectorAll(".expense"); // select all the expense inputs
    var totalExpense = 0;
    var averageExpense = 0;
    // calculate the sum for each input
    expenseInputs.forEach(function(input)
    {
        totalExpense += parseInt(input.value || 0);
    });
    averageExpense = parseInt(totalExpense/peopleNum);

     // Create a paragraph of average and total sum
    var table_container = document.querySelector("#ExpenseTable");
    var summary = document.querySelector("#summary");
    if (summary) {
        summary.remove(); // remove the existing summary paragraph
    }
    //if not then make one
    var summary = document.createElement('p');
    summary.id = "summary";
    summary.textContent = `The sum is ${totalExpense} and the average is ${averageExpense}`;
     // Append the paragraph after the table
     table_container.insertAdjacentElement('afterend', summary);

     //call the function that will calculate the expenses
    GenerateExpense(peopleNum, totalExpense, averageExpense);

}
 // calculates the adjusted expense for each person
function GenerateExpense(peopleNum, totalExpense, averageExpense)
    {
        var expenseInputs = document.querySelectorAll(".expense");
        var adjustedExpenses = []; // array of adjusted expenses
        var TotalPositiveSums = 0;

        for (let i = 0; i < expenseInputs.length; i++)
        {
            var current_value = averageExpense - (expenseInputs[i].value); // adjust the current value by subtracting from the average
            if(current_value > 0) 
               { TotalPositiveSums += current_value;} // if positive keep track of the sum
            adjustedExpenses.push(current_value);
        }
        GenerateExpenseTable(adjustedExpenses, peopleNum, TotalPositiveSums);
    }

    //create the final calculated table
    function GenerateExpenseTable(adjustedExpenses, peopleNum, TotalPositiveSums)
    {
        resultsContainer = document.querySelector("#ResultsTable");
        resultsContainer.innerHTML = ""; //clear existing table

        var header = `<head>
                        <tr>
                            <th>Person</th>
                            <th>Debit/Credit</th>
                            <th>Amount owed To</th>
                            <th>Amount to be Paid</th>
                        </tr>
                        </head>`
        resultsContainer.innerHTML += header;

        //Generate row for each person
        
        for (let i = 0; i < peopleNum; i++)
        {
            var row = document.createElement("tr");
            var col1 = document.createElement("td");
            var col2 = document.createElement("td");

            col1.textContent = "Person" + (i+1);
            row.append(col1);

            col2.value = adjustedExpenses[i]; //col2 contains the adjusted expenses
            col2.textContent = adjustedExpenses[i];
            col2.className = "adjustedExpense";
            col2.id = "Person" + (i+1);
            row.append(col2);

            resultsContainer.append(row); 
        }  

        adjustedExpenses.sort();
        var transactions = [] // dictionary of transactions log for each person
        console.log(adjustedExpenses);

        var min_id = Find_PersonID(adjustedExpenses[0]); // the first element is the smallest number

        var i = 0;
        
        // creates the dictionary that maps who owes what amount to whom
        for (i = 0; adjustedExpenses[i] < 0; i++) 
        {
            var current_val = adjustedExpenses[i];

            var adjusted = TotalPositiveSums + adjustedExpenses[i];

            if (adjusted != 0) {
                var next_val = adjustedExpenses[i + 1];
                var input_id1 = Find_PersonID(current_val);
                var input_id2 = Find_PersonID(next_val);

                var input_ids = Find_PersonID2(current_val);
                console.log(input_ids[0], input_ids[1]);

                transactions.push({
                from: input_id1,
                to: input_id2,
                amount: adjusted,
                });
                
            } else 
            {
                var input_id1 = Find_PersonID(current_val);
                transactions.push({
                from: input_id1,
                to: "Noone",
                amount: adjusted,
                });
            }

            TotalPositiveSums = adjusted;
        }

        for (let j = i; j < adjustedExpenses.length; j++) {
        var current_value = adjustedExpenses[j];
        var input_id1 = Find_PersonID(current_value);
        transactions.push({
            from: input_id1,
            to: min_id,
            amount: current_value,
        });
        }

    console.log(transactions);
        
    
    function Find_PersonID(value)
        {
            averageInputs = document.querySelectorAll(".adjustedExpense");
            for (let i = 0; i < averageInputs.length; i++)
            {
                if (parseFloat(averageInputs[i].textContent) === value)
                {
                    return averageInputs[i].id;
                }
            }
        }
        function Find_PersonID2(value)
        {
            averageInputs = document.querySelectorAll(".adjustedExpense");
            for (let i = 0; i < averageInputs.length; i++)
            {
                if (parseFloat(averageInputs[i].textContent) === value)
                {
                    var first = averageExpense[i].id;
                    var second = averageExpense[i+1].id;
                    return (first, second);
                }
            }
        }
        
        
        
        var resultsTable = document.querySelector("#ResultsTable"); 
        
        var rows = resultsTable.querySelectorAll("tr");// each row selected
        rows.forEach(function (row, index) 
        {
        if (index > 0) { // Skip the header row

            var columnIndex = 0; // index of the person
            var cellValue = row.cells[columnIndex].textContent; // contains the value that i need to search for in the transactions

            // Example data for the new columns
            var personData = findData(cellValue, transactions);
            var amountData = findAmount(cellValue, transactions);

            // Create new cells for the data
            var personCell = document.createElement("td");
            personCell.textContent = personData;
            row.appendChild(personCell);

            var amountCell = document.createElement("td");
            amountCell.textContent = amountData;
            row.appendChild(amountCell);


        }
        });
    }

    function findData(cellValue, transactions)
    {
        for (let i = 0; i < transactions.length; i++)
        {
            if (transactions[i].from === cellValue)
            {
                return(transactions[i].to);
            }
        }
    }

    function findAmount(cellValue, transactions)
    {
        for (let i = 0; i < transactions.length; i++)
        {
            if (transactions[i].from === cellValue)
            {
                return(transactions[i].amount);
            }
        }
    }