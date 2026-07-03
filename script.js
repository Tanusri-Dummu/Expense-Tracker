const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");

const description = document.getElementById("description");
const amount = document.getElementById("amount");

const incomeBtn = document.getElementById("incomeBtn");
const expenseBtn = document.getElementById("expenseBtn");

const transactionList = document.getElementById("transactionList");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function saveData() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function updateUI() {

    transactionList.innerHTML = "";

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((item, index) => {

        if (item.type === "income") {
            totalIncome += item.amount;
        } else {
            totalExpense += item.amount;
        }

        const li = document.createElement("li");

        li.className = item.type;

        li.innerHTML = `
        <div class="transaction-info">

            <span class="transaction-title">${item.description}</span>

            <span class="transaction-date">${item.date}</span>

        </div>

        <div>

            <span class="amount">

                ${item.type === "income" ? "+" : "-"}₹${item.amount}

            </span>

            <button class="delete-btn" onclick="deleteTransaction(${index})">

            <i class="fa-solid fa-trash"></i>

            </button>

        </div>
        `;

        transactionList.appendChild(li);

    });

    income.textContent = "₹" + totalIncome;
    expense.textContent = "₹" + totalExpense;
    balance.textContent = "₹" + (totalIncome - totalExpense);

    saveData();
}

function addTransaction(type) {

    const desc = description.value.trim();

    const amt = Number(amount.value);

    if (desc === "" || amt <= 0) {

        alert("Please enter valid details");

        return;

    }

    const today = new Date().toLocaleDateString();

    transactions.push({

        description: desc,

        amount: amt,

        type: type,

        date: today

    });

    description.value = "";

    amount.value = "";

    updateUI();

}

incomeBtn.addEventListener("click", () => {

    addTransaction("income");

});

expenseBtn.addEventListener("click", () => {

    addTransaction("expense");

});

updateUI();
// =============================
// Delete Transaction
// =============================

function deleteTransaction(index) {

    if (confirm("Delete this transaction?")) {

        transactions.splice(index, 1);

        updateUI();

    }

}

// =============================
// Clear All Transactions
// =============================

const clearBtn = document.getElementById("clearAll");

clearBtn.addEventListener("click", () => {

    if (transactions.length === 0) {
        alert("No transactions available.");
        return;
    }

    if (confirm("Clear all transactions?")) {

        transactions = [];

        updateUI();

    }

});

// =============================
// Empty State
// =============================

const emptyState = document.getElementById("emptyState");

function toggleEmptyState() {

    if (transactions.length === 0) {

        emptyState.style.display = "block";
        transactionList.style.display = "none";

    } else {

        emptyState.style.display = "none";
        transactionList.style.display = "block";

    }

}

// =============================
// Theme Toggle
// =============================

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        themeBtn.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

    } else {

        themeBtn.innerHTML =
        '<i class="fa-solid fa-moon"></i>';

    }

});

// =============================
// Update UI Override
// =============================

const oldUpdateUI = updateUI;

updateUI = function () {

    oldUpdateUI();

    toggleEmptyState();

};

// =============================
// Initial Load
// =============================

toggleEmptyState();

updateUI();