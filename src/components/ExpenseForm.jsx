import { useEffect, useState, useRef } from "react";

function ExpenseForm({ addExpense, editingExpense, updateExpense }) {
  const formRef = useRef(null);

  const [form, setForm] = useState({
    type: "expense",
    amount: "",
    category: "Food",
    date: "",
    note: "",
  });

  const [errors, setErrors] = useState({});

  // 🔹 Auto scroll when edit clicked
  useEffect(() => {
    if (editingExpense) {
      setForm(editingExpense);
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [editingExpense]);

  // 🔹 Category list
  const expenseCategories = ["Food", "Travel", "Bills", "Shopping", "Others"];
  const incomeCategories = ["Salary", "Freelance", "Business", "Bonus","Others"];

  // 🔹 VALIDATION FUNCTION
  const validate = () => {
    const newErrors = {};

    if (!form.amount || Number(form.amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }

    if (!form.date) {
      newErrors.date = "Please select a date";
    }

    if (!form.category) {
      newErrors.category = "Please select a category";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🔹 SUBMIT
  const submit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const data = {
      ...form,
      id: editingExpense ? editingExpense.id : Date.now(),
    };

    editingExpense ? updateExpense(data) : addExpense(data);

    // Reset form
    setForm({
      type: "expense",
      amount: "",
      category: "Food",
      date: "",
      note: "",
    });

    setErrors({});
  };

  return (
    <form
      ref={formRef}
      onSubmit={submit}
      className="bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-lg"
    >
      <h2 className="text-xl font-bold mb-4 text-gray-700">
        {editingExpense ? "✏️ Edit Transaction" : "➕ Add Transaction"}
      </h2>

      <div className="space-y-4">
        {/* TYPE */}
        <select
          value={form.type}
          onChange={(e) =>
            setForm({
              ...form,
              type: e.target.value,
              category:
                e.target.value === "expense"
                  ? expenseCategories[0]
                  : incomeCategories[0],
            })
          }
          className="w-full px-4 py-2 rounded-xl bg-gray-100 border-0 focus:ring-2 focus:ring-indigo-500"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        {/* AMOUNT */}
        <div>
          <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            className="w-full px-4 py-2 rounded-xl bg-gray-100 border-0 focus:ring-2 focus:ring-indigo-500"
          />
          {errors.amount && (
            <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
          )}
        </div>

        {/* CATEGORY */}
        <div>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full px-4 py-2 rounded-xl bg-gray-100 border-0 focus:ring-2 focus:ring-pink-500"
          >
            {(form.type === "expense"
              ? expenseCategories
              : incomeCategories
            ).map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category}</p>
          )}
        </div>

        {/* DATE */}
        <div>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full px-4 py-2 rounded-xl bg-gray-100 border-0 focus:ring-2 focus:ring-green-500"
          />
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">{errors.date}</p>
          )}
        </div>

        {/* NOTE */}
        <input
          type="text"
          placeholder="Note (optional)"
          value={form.note}
          onChange={(e) => setForm({ ...form, note: e.target.value })}
          className="w-full px-4 py-2 rounded-xl bg-gray-100 border-0 focus:ring-2 focus:ring-purple-500"
        />

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl text-white font-semibold
          bg-gradient-to-r from-indigo-500 to-purple-600
          hover:from-indigo-600 hover:to-purple-700 transition"
        >
          {editingExpense ? "Update Transaction" : "Add Transaction"}
        </button>
      </div>
    </form>
  );
}

export default ExpenseForm;
