function ExpenseList({
  expenses,
  deleteExpense,
  startEditExpense,
  editingExpense,
}) {
  if (expenses.length === 0)
    return (
      <p className="text-center text-gray-400 mt-6">
        No transactions found
      </p>
    );

  return (
    <div className="space-y-4">
      {expenses.map((exp) => {
        const isEditing = editingExpense?.id === exp.id;

        return (
          <div
            key={exp.id}
            className={`
              bg-white rounded-2xl p-5 shadow-md
              flex justify-between items-center
              transition-all duration-300
              hover:shadow-xl hover:-translate-y-1
              ${
                isEditing
                  ? "ring-2 ring-indigo-400"
                  : "ring-1 ring-gray-100"
              }
            `}
          >
            {/* Left info */}
            <div>
              <p
                className={`font-semibold text-lg ${
                  exp.type === "income"
                    ? "text-emerald-600"
                    : "text-red-500"
                }`}
              >
                {exp.category} • ₹{exp.amount}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                {exp.date}
                {exp.note && ` • ${exp.note}`}
              </p>

              <span
                className={`inline-block mt-2 text-xs px-3 py-1 rounded-full
                  ${
                    exp.type === "income"
                      ? "bg-emerald-100 text-emerald-600"
                      : "bg-red-100 text-red-500"
                  }
                `}
              >
                {exp.type.toUpperCase()}
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => startEditExpense(exp)}
                className="
                  px-4 py-2 rounded-xl text-sm font-medium
                  bg-gradient-to-r from-yellow-400 to-orange-400
                  text-white hover:scale-105 transition
                "
              >
                ✏️ Edit
              </button>

              <button
                onClick={() => deleteExpense(exp.id)}
                className="
                  px-4 py-2 rounded-xl text-sm font-medium
                  bg-gradient-to-r from-red-500 to-pink-500
                  text-white hover:scale-105 transition
                "
              >
                🗑 Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ExpenseList;
