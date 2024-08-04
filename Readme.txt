Expense Splitter Calculator
1. Input the number of people to split with
2. Enter the amount that each person spent
3. Expense Generator will calucate the sum and average and automatically calculates which person has to pay whom and how much.

Function : 
1.Generate Table () : Generates the Table that has person number and their expenses.
2.Caculate Sum() : Caculates the sum of the expenses and average and pass those values to GenerateExpense.
3.GenerateExpense() : Adjusts the sums with the average and put them in an array with curresponding amount and person number.
4.GenerateExpenseTable() : Generates the final Table that has person number, credit/debit amount (adjusted_expense), amount owed and amount owed to.
5.findData (cellValue, Transactions) : Finds the key value pair by the personId and returns to whom they owe.
6.findData (cellValue, Transactions) : Finds the key value pair by the personId and returns the amount owed.  

Challenges:
1. Not knowing the proper data structure to use.
2. Made my own data structure consisting of arrays and dictionaries.
3. Made my own logic of lend and borrow.
4. Each person has to pay one person only once, (instead of lend and borrow system where one person has to pay multiple people).
