import { useEffect, useState } from "react";

function ExpenseForm({ addExpense, editingExpense, updateExpense }) {
  const [form, setForm] = useState({
    type: "expense",
    amount: "",
    category: "Food",
    date: "",
    note: "",
  });

  useEffect(() => {
    if (editingExpense) setForm(editingExpense);
  }, [editingExpense]);

  const submit = (e) => {
    e.preventDefault();

    const data = {
      ...form,
      id: editingExpense ? editingExpense.id : Date.now(),
    };

    editingExpense ? updateExpense(data) : addExpense(data);

    setForm({
      type: "expense",
      amount: "",
      category: "Food",
      date: "",
      note: "",
    });
  };

  return (
    <form
      onSubmit={submit}
      className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
    >
      <h2 className="text-xl font-bold mb-4 text-gray-700">
        {editingExpense ? "✏️ Edit Transaction" : "➕ Add Transaction"}
      </h2>

      <div className="space-y-3">
        {/* TYPE */}
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="w-full px-4 py-2 rounded-xl bg-gray-100 border-0
          focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        {/* AMOUNT */}
        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          className="w-full px-4 py-2 rounded-xl bg-gray-100 border-0
          focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
          required
        />

        {/* CATEGORY */}
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="w-full px-4 py-2 rounded-xl bg-gray-100 border-0
          focus:ring-2 focus:ring-pink-500 focus:bg-white transition"
        >
          <option>Food</option>
          <option>Travel</option>
          <option>Bills</option>
          <option>Others</option>
          <option>Salary</option>
        </select>

        {/* DATE */}
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="w-full px-4 py-2 rounded-xl bg-gray-100 border-0
          focus:ring-2 focus:ring-green-500 focus:bg-white transition"
          required
        />

        {/* NOTE */}
        <input
          type="text"
          placeholder="Note (optional)"
          value={form.note}
          onChange={(e) => setForm({ ...form, note: e.target.value })}
          className="w-full px-4 py-2 rounded-xl bg-gray-100 border-0
          focus:ring-2 focus:ring-purple-500 focus:bg-white transition"
        />

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full mt-3 py-3 rounded-xl text-white font-semibold
          bg-gradient-to-r from-indigo-500 to-purple-600
          hover:from-indigo-600 hover:to-purple-700
          transform hover:-translate-y-0.5 transition-all duration-300"
        >
          {editingExpense ? "Update Transaction" : "Add Transaction"}
        </button>
      </div>
    </form>
  );
}

export default ExpenseForm;
