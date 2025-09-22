let expenses = [];  // Store expenses as objects

function addExpense() {
    let name = prompt("Enter expense name:");
    if (!name) {
        alert("Expense name is required!");
        return;
    }

    let amount = prompt("Enter expense amount:");
    amount = Number(amount);
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount!");
        return;
    }

    let category = prompt("Enter expense category (e.g., Food, Transport, Shopping):");
    if (!category) category = "Uncategorized";

    expenses.push({ name: name, amount: amount, category: category });
    alert("Expense added successfully!");
    viewExpenses();
}

function viewExpenses() {
    if (expenses.length === 0) {
        document.getElementById("output").innerHTML = "<p>No expenses to display.</p>";
        return;
    }

    let html = "<h3>Expense List:</h3>";
    expenses.forEach((expense, index) => {
        html += `<div class="expense-item">${index+1}. ${expense.name} - $${expense.amount.toFixed(2)} [${expense.category}]</div>`;
    });
    document.getElementById("output").innerHTML = html;
}

function calculateTotal() {
    if (expenses.length === 0) {
        alert("No expenses recorded yet!");
        return;
    }

    let total = 0;
    for (let i = 0; i < expenses.length; i++) {
        total += expenses[i].amount;
    }

    document.getElementById("output").innerHTML = `
        <h3>Total Expenses</h3>
        <p class="summary">You have spent $${total.toFixed(2)} in total.</p>
    `;
}

function categoryBreakdown() {
    if (expenses.length === 0) {
        alert("No expenses recorded yet!");
        return;
    }

    // Build category totals
    let categories = {};
    for (let i = 0; i < expenses.length; i++) {
        let cat = expenses[i].category;
        if (!categories[cat]) {
            categories[cat] = 0;
        }
        categories[cat] += expenses[i].amount;
    }

    let html = "<h3>Category Breakdown:</h3>";
    for (let cat in categories) {
        html += `<div class="expense-item">${cat}: $${categories[cat].toFixed(2)}</div>`;
    }

    document.getElementById("output").innerHTML = html;
}

function clearExpenses() {
    if (confirm("Are you sure you want to clear all expenses?")) {
        expenses = [];
        document.getElementById("output").innerHTML = "<p>All expenses cleared.</p>";
    }
}
