
// ======================================
// SPENDWISE - SMART BUDGET TRACKER
// ======================================

// Array to store multiple transactions
let transactions = [];

// Monthly budget
let monthlyBudget = 0;

// Select HTML elements
const transactionForm =
    document.getElementById("transactionForm");

const budgetForm =
    document.getElementById("budgetForm");

const transactionList =
    document.getElementById("transactionList");

const feedback =
    document.getElementById("feedback");

const filterSelect =
    document.getElementById("filter");


// ======================================
// 1. SET MONTHLY BUDGET
// ======================================

budgetForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const budgetInput =
        Number(document.getElementById("budget").value);

    if (!Number.isFinite(budgetInput) || budgetInput <= 0) {

        document.getElementById("budgetMessage").textContent =
            "Please enter a valid budget.";

        return;
    }

    monthlyBudget = budgetInput;

    document.getElementById("budgetMessage").textContent =
        "Monthly budget successfully updated!";

    updateDashboard();

    budgetForm.reset();

});


// ======================================
// 2. ADD NEW TRANSACTIONS
// ======================================

transactionForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const description =
        document.getElementById("description").value.trim();

    const amount =
        Number(document.getElementById("amount").value);

    const type =
        document.getElementById("type").value;

    const category =
        document.getElementById("category").value;


    // Conditional validation
    if (description === "" ||
        !Number.isFinite(amount) ||
        amount <= 0) {

        showFeedback(
            "Please enter a valid description and amount.",
            "danger"
        );

        return;
    }


    // Create transaction object
    const transaction = {

        id: Date.now() + Math.random(),

        description: description,

        amount: amount,

        type: type,

        category: category

    };


    // Add record to array
    transactions.push(transaction);


    // Display appropriate feedback
    if (type === "income") {

        showFeedback(
            "Income added successfully!",
            "success"
        );

    } else {

        showFeedback(
            "Expense added successfully!",
            "success"
        );

    }


    // Update webpage
    updateDashboard();

    transactionForm.reset();

});


// ======================================
// 3. CALCULATE INCOME AND EXPENSES
// ======================================

function calculateTotals() {

    let totalIncome = 0;

    let totalExpenses = 0;


    // Loop through every transaction
    for (let i = 0; i < transactions.length; i++) {

        const transaction = transactions[i];


        // Conditional decision making
        if (transaction.type === "income") {

            totalIncome += transaction.amount;

        } else if (transaction.type === "expense") {

            totalExpenses += transaction.amount;

        }

    }

    return {

        income: totalIncome,

        expenses: totalExpenses,

        balance: totalIncome - totalExpenses

    };

}


// ======================================
// 4. UPDATE DASHBOARD
// ======================================

function updateDashboard() {

    const totals = calculateTotals();

    const remainingBudget =
        monthlyBudget - totals.expenses;


    // Update dashboard using DOM manipulation
    document.getElementById("balance").textContent =
        "KES " + totals.balance.toFixed(2);

    document.getElementById("income").textContent =
        "KES " + totals.income.toFixed(2);

    document.getElementById("expenses").textContent =
        "KES " + totals.expenses.toFixed(2);

    document.getElementById("remainingBudget").textContent =
        "KES " + remainingBudget.toFixed(2);


    // Update budget progress
    let percentage = 0;

    if (monthlyBudget > 0) {

        percentage =
            (totals.expenses / monthlyBudget) * 100;

    }

    const progressBar =
        document.getElementById("progressBar");

    progressBar.style.width =
        Math.min(percentage, 100) + "%";

    progressBar.className = "";


    // Budget decision making
    const budgetMessage =
        document.getElementById("budgetMessage");

    if (monthlyBudget <= 0) {

        budgetMessage.textContent =
            "Set your monthly budget to monitor spending.";

    } else if (percentage >= 100) {

        budgetMessage.textContent =
            "Warning! You have exceeded your monthly budget.";

        progressBar.classList.add("danger");

    } else if (percentage >= 80) {

        budgetMessage.textContent =
            "Careful! You have used most of your budget.";

        progressBar.classList.add("warning");

    } else {

        budgetMessage.textContent =
            "Great! Your spending is within your budget.";

        progressBar.classList.add("success");

    }


    document.getElementById("progressText").textContent =
        percentage.toFixed(1) + "% of budget used";


    // Refresh transaction history
    displayTransactions();

}


// ======================================
// 5. DISPLAY TRANSACTIONS
// ======================================

function displayTransactions() {

    transactionList.innerHTML = "";

    const selectedFilter = filterSelect.value;


    // Loop through array records
    transactions.forEach(function(transaction) {

        // Conditional filtering
        if (selectedFilter !== "all" &&
            transaction.type !== selectedFilter) {

            return;

        }

        const li = document.createElement("li");

        const info = document.createElement("div");

        info.className = "transaction-info";


        const description =
            document.createElement("strong");

        description.textContent =
            transaction.description;


        const category =
            document.createElement("small");

        category.textContent =
            transaction.category;


        info.appendChild(description);

        info.appendChild(category);


        // Display income or expense
        const amount =
            document.createElement("strong");

        if (transaction.type === "income") {

            amount.textContent =
                "+ KES " + transaction.amount.toFixed(2);

            amount.className = "income";

        } else {

            amount.textContent =
                "- KES " + transaction.amount.toFixed(2);

            amount.className = "expense";

        }


        // Create delete button
        const deleteButton =
            document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.className = "delete-btn";


        // Delete transaction event
        deleteButton.addEventListener("click", function() {

            transactions = transactions.filter(function(item) {

                return item.id !== transaction.id;

            });

            showFeedback(
                "Transaction deleted successfully.",
                "success"
            );

            updateDashboard();

        });


        li.appendChild(info);

        li.appendChild(amount);

        li.appendChild(deleteButton);

        transactionList.appendChild(li);

    });


    // Show message when there are no matching records
    const visibleTransactions = transactions.filter(function(item) {

        return selectedFilter === "all" ||
            item.type === selectedFilter;

    });

    document.getElementById("emptyMessage").style.display =
        visibleTransactions.length === 0 ? "block" : "none";

}


// ======================================
// 6. FILTER TRANSACTIONS
// ======================================

filterSelect.addEventListener("change", function() {

    displayTransactions();

});


// ======================================
// 7. DISPLAY FEEDBACK
// ======================================

function showFeedback(message, type) {

    feedback.textContent = message;

    feedback.className = type;

}


// ======================================
// INITIAL DASHBOARD UPDATE
// ======================================

updateDashboard();
