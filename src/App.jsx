import { useEffect, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseFilter from "./components/ExpenseFilter";
import ExpenseChart from "./components/ExpenseChart";
import { saveExpenses, getExpenses } from "./utils/localStorage";

function App() {
  const [expenses, setExpenses] = useState(getExpenses);
  const [editingExpense, setEditingExpense] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");

  useEffect(() => {
    saveExpenses(expenses);
  }, [expenses]);

  const addExpense = (data) => {
    setExpenses((prev) => [data, ...prev]);
  };

  const updateExpense = (data) => {
    setExpenses((prev) => prev.map((e) => (e.id === data.id ? data : e)));
    setEditingExpense(null);
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  // 🔹 FILTER
  const filteredExpenses = expenses.filter((e) => {
    const categoryMatch =
      selectedCategory === "All" || e.category === selectedCategory;

    const dateMatch =
      (!fromDate || e.date >= fromDate) && (!toDate || e.date <= toDate);

    // 🔥 AMOUNT RANGE (THIS WAS MISSING)
    const minMatch = !minAmount || Number(e.amount) >= Number(minAmount);

    const maxMatch = !maxAmount || Number(e.amount) <= Number(maxAmount);
    return categoryMatch && dateMatch && minMatch && maxMatch;
  });

  // 🔹 SUMMARY
  const incomeTotal = expenses
    .filter((e) => e.type === "income")
    .reduce((s, e) => s + Number(e.amount), 0);

  const expenseTotal = expenses
    .filter((e) => e.type === "expense")
    .reduce((s, e) => s + Number(e.amount), 0);

  const balance = incomeTotal - expenseTotal;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 🔥 BLUR BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-2xl scale-110"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1526304640581-d334cdbbf45e)",
        }}
      ></div>

      {/* 🔹 DARK OVERLAY FOR READABILITY */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* 🔹 MAIN CONTENT */}
      <div className="relative z-10 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <h1
            className="
          text-4xl font-extrabold text-center mb-10
          bg-gradient-to-r from-indigo-400 to-emerald-400
          text-transparent bg-clip-text drop-shadow-lg
        "
          >
            💸 Smart Expense Tracker
          </h1>

          {/* SUMMARY */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg hover:shadow-2xl transition">
              <p className="text-sm text-gray-500">Total Income</p>
              <h2 className="text-2xl font-bold text-emerald-600 mt-1">
                ₹{incomeTotal}
              </h2>
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg hover:shadow-2xl transition">
              <p className="text-sm text-gray-500">Total Expense</p>
              <h2 className="text-2xl font-bold text-red-500 mt-1">
                ₹{expenseTotal}
              </h2>
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg hover:shadow-2xl transition">
              <p className="text-sm text-gray-500">Balance</p>
              <h2
                className={`text-2xl font-bold mt-1 ${
                  balance >= 0 ? "text-indigo-600" : "text-red-600"
                }`}
              >
                ₹{balance}
              </h2>
            </div>
          </div>

          {/* FORM + FILTER + CHART */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <ExpenseForm
                addExpense={addExpense}
                editingExpense={editingExpense}
                updateExpense={updateExpense}
              />

              <ExpenseFilter
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                fromDate={fromDate}
                setFromDate={setFromDate}
                toDate={toDate}
                setToDate={setToDate}
                minAmount={minAmount}
                setMinAmount={setMinAmount}
                maxAmount={maxAmount}
                setMaxAmount={setMaxAmount}
              />
            </div>

            <ExpenseChart expenses={filteredExpenses} />
          </div>

          {/* LIST */}
          <div className="mt-14">
            <ExpenseList
              expenses={filteredExpenses}
              deleteExpense={deleteExpense}
              startEditExpense={setEditingExpense}
              editingExpense={editingExpense}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
