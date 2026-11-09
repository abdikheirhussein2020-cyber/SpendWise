SpendWise – Interactive Budget Tracker
1. Project Overview

SpendWise is an interactive personal budgeting application developed using HTML, CSS and JavaScript.

The application helps users manage their finances by recording income and expenses, setting monthly budgets, monitoring spending and viewing their remaining balance.

2. Improvements Made This Week

The following improvements were made to SpendWise:

Added a monthly budget setting feature.
Added income and expense transaction records.
Added automatic financial calculations.
Added a remaining budget indicator.
Added a visual budget progress bar.
Added budget warnings when spending approaches or exceeds the budget.
Added transaction filtering.
Added transaction deletion.
Improved the dashboard design and responsiveness.
3. Decision Making Using Conditionals

JavaScript conditional statements are used to evaluate financial situations.

The application checks the percentage of the monthly budget used.

Below 80%: Spending is within budget.
80% to below 100%: A warning is displayed.
100% or above: A budget exceeded warning is displayed.

Conditionals are also used to distinguish between income and expenses and validate user input.

4. Arrays for Multiple Records

The application uses a JavaScript array called transactions to store multiple transaction records.

Each transaction contains:

Transaction ID
Description
Amount
Type
Category

The push() method adds transactions, while filter() removes selected records.

5. Processing Data with Loops

The application uses for loops and forEach() to process transaction records.

These loops calculate total income, total expenses and display transaction history.

6. DOM Manipulation

The Document Object Model (DOM) is updated dynamically using JavaScript.

Methods include:

getElementById()
createElement()
appendChild()
textContent
innerHTML

These methods update the dashboard and transaction history without refreshing the page.

7. Event Handling

Event listeners handle user interactions.

Submit events add transactions.
Budget form events update the monthly budget.
Click events delete transactions.
Change events filter transaction records.
8. Challenges and Solutions
Budget calculations

Challenge: Keeping dashboard totals accurate when transactions change.

Solution: Created reusable calculation and dashboard update functions.

Transaction management

Challenge: Managing multiple expense and income records.

Solution: Used an array of transaction objects.

Dynamic webpage updates

Challenge: Updating information without refreshing the page.

Solution: Used DOM manipulation and event listeners.

Budget monitoring

Challenge: Informing users when their spending becomes too high.

Solution: Used conditional statements and a visual progress indicator.

9. Technologies Used
HTML5
CSS3
JavaScript
Visual Studio Code
Git
GitHub