import { useEffect, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseFilter from "./components/ExpenseFilter";
import ExpenseChart from "./components/ExpenseChart";
import { saveExpenses, getExpenses } from "./utils/localStorage";

function App() {
  const [expenses, setExpenses] = useState(() => getExpenses());
  const [editingExpense, setEditingExpense] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [filterType, setFilterType] = useState("expense");

  useEffect(() => {
    saveExpenses(expenses);
  }, [expenses]);

  //add
  const addExpense = (data) => {
    setExpenses((prev) => [data, ...prev]);
    setFilterType(data.type);
  };

  //update
  const updateExpense = (data) => {
    setExpenses((prev) => prev.map((e) => (e.id === data.id ? data : e)));
    setEditingExpense(null);
    setFilterType(data.type);
  };

  //delete
  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  //filter
  const filteredExpenses = expenses.filter((e) => {
    const typeMatch = e.type === filterType;
    const categoryMatch =
      selectedCategory === "All" || e.category === selectedCategory;

    const dateMatch =
      (!fromDate || e.date >= fromDate) && (!toDate || e.date <= toDate);

    const minMatch = minAmount === "" || Number(e.amount) >= Number(minAmount);

    const maxMatch = maxAmount === "" || Number(e.amount) <= Number(maxAmount);

    return typeMatch  && categoryMatch && dateMatch && minMatch && maxMatch;
  });

  const expenseCategories = ["Food", "Travel", "Shopping", "Bills", "Other"];
  const incomeCategories = [
    "Salary",
    "Business",
    "Freelance",
    "Bonus",
    "Other",
  ];

  //sorting
  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    if (sortBy === "high") return Number(b.amount) - Number(a.amount);
    if (sortBy === "low") return Number(a.amount) - Number(b.amount);
    return b.id - a.id; // recent
  });

  const incomeTotal = expenses
    .filter((e) => e.type === "income")
    .reduce((sum, e) => sum + Number(e.amount), 0);

  const expenseTotal = expenses
    .filter((e) => e.type === "expense")
    .reduce((sum, e) => sum + Number(e.amount), 0);

  const balance = incomeTotal - expenseTotal;

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center blur-2xl scale-110"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1526304640581-d334cdbbf45e)",
        }}
      ></div>

      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-indigo-400 to-emerald-400 text-transparent bg-clip-text">
            Smart Expense Tracker
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <SummaryCard
              title="Total Income"
              value={incomeTotal}
              color="emerald"
            />
            <SummaryCard
              title="Total Expense"
              value={expenseTotal}
              color="red"
            />
            <SummaryCard title="Balance" value={balance} color="indigo" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <ExpenseForm
                addExpense={addExpense}
                editingExpense={editingExpense}
                updateExpense={updateExpense}
              />
            </div>
            <ExpenseChart 
            expenses={sortedExpenses}
            filterType={filterType}
            />
          </div>
          <div className="my-10">
            <ExpenseFilter
              filterType={filterType}
              setFilterType={setFilterType}
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
              sortBy={sortBy}
              setSortBy={setSortBy}
              expenseCategories={expenseCategories}
              incomeCategories={incomeCategories}
            />
          </div>

          <div className="mt-14">
            <ExpenseList
              expenses={sortedExpenses}
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

function SummaryCard({ title, value, color }) {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg">
      <p className="text-sm text-gray-500">{title}</p>
      <h2
        className={`text-2xl font-bold mt-1 ${
          color === "emerald"
            ? "text-emerald-600"
            : color === "red"
              ? "text-red-600"
              : "text-indigo-600"
        }`}
      >
        {" "}
        ₹{value}
      </h2>
    </div>
  );
}

export default App;
