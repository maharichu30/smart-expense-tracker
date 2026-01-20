function ExpenseFilter({
  filterType,
  setFilterType,
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
  sortBy,
  setSortBy,
  expenseCategories,
  incomeCategories,
}) {
  const clearFilters = () => {
    setSelectedCategory("All");
    setSortBy("recent");
    setFromDate("");
    setToDate("");
    setMinAmount("");
    setMaxAmount("");
  };

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-5 shadow-md space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-700 flex items-center gap-2">
          🔍 Filters
        </h2>
        <button
          onClick={clearFilters}
          className="text-sm text-red-500 bg-red-100 px-3 py-1 rounded-full hover:bg-red-200 transition"
        >
          Clear
        </button>
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 font-medium">
          <input
            type="radio"
            value="expense"
            checked={filterType === "expense"}
            onChange={(e) => {
              setFilterType(e.target.value);
              setSelectedCategory("All");
            }}
          />
          Expense
        </label>

        <label className="flex items-center gap-2 font-medium">
          <input
            type="radio"
            value="income"
            checked={filterType === "income"}
            onChange={(e) => {
              setFilterType(e.target.value);
              setSelectedCategory("All");
            }}
          />
          Income
        </label>
      </div>

      {/* ROW 1: Category + Sort */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-4 py-2 rounded-xl bg-gray-100 focus:ring-2 focus:ring-indigo-500"
        >
          <option value="All">All Categories</option>

          {(filterType === "expense"
            ? expenseCategories
            : incomeCategories
          ).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full px-4 py-2 rounded-xl bg-gray-100 focus:ring-2 focus:ring-indigo-500"
        >
          <option value="recent">Recent</option>
          <option value="high">Amount: High → Low</option>
          <option value="low">Amount: Low → High</option>
        </select>
      </div>

      {/* ROW 2: Date filter + Amount filter */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Date range */}
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">Date Range</p>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="px-3 py-2 rounded-xl bg-gray-100 focus:ring-2 focus:ring-green-500"
            />
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="px-3 py-2 rounded-xl bg-gray-100 focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Amount range */}
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">Amount Range</p>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min ₹"
              value={minAmount}
              onChange={(e) => setMinAmount(e.target.value)}
              className="px-3 py-2 rounded-xl bg-gray-100 focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="number"
              placeholder="Max ₹"
              value={maxAmount}
              onChange={(e) => setMaxAmount(e.target.value)}
              className="px-3 py-2 rounded-xl bg-gray-100 focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpenseFilter;
