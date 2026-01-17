function ExpenseFilter({
  selectedCategory,
  setSelectedCategory,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  minAmount,
  setMinAmount,
  maxAmount,
  setMaxAmount,
}) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 space-y-4">
      <h2 className="text-lg font-bold text-gray-700">
        🔍 Filters
      </h2>

      {/* CATEGORY */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="w-full px-4 py-2 rounded-xl bg-gray-100 border-0
        focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
      >
        <option value="All">All Categories</option>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Bills">Bills</option>
        <option value="Others">Others</option>
      </select>

      {/* DATE RANGE */}
      <div>
        <p className="text-sm font-medium text-gray-600 mb-1">
          Date Range
        </p>
        <div className="flex gap-3">
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-gray-100 border-0
            focus:ring-2 focus:ring-green-500 focus:bg-white transition"
          />
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-gray-100 border-0
            focus:ring-2 focus:ring-green-500 focus:bg-white transition"
          />
        </div>
      </div>

      {/* AMOUNT RANGE */}
      <div>
        <p className="text-sm font-medium text-gray-600 mb-1">
          Amount Range
        </p>
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Min ₹"
            value={minAmount}
            onChange={(e) => setMinAmount(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-gray-100 border-0
            focus:ring-2 focus:ring-purple-500 focus:bg-white transition"
          />
          <input
            type="number"
            placeholder="Max ₹"
            value={maxAmount}
            onChange={(e) => setMaxAmount(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-gray-100 border-0
            focus:ring-2 focus:ring-purple-500 focus:bg-white transition"
          />
        </div>
      </div>
    </div>
  );
}

export default ExpenseFilter;
