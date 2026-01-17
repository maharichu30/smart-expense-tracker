import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function ExpenseChart({ expenses }) {
  const expenseOnly = expenses.filter((e) => e.type === "expense");

  if (!expenseOnly.length)
    return (
      <div className="bg-white p-6 rounded-2xl shadow-lg text-center text-gray-400">
        No expense data available
      </div>
    );

  const categories = [...new Set(expenseOnly.map((e) => e.category))];

  const data = categories.map((cat) =>
    expenseOnly
      .filter((e) => e.category === cat)
      .reduce((sum, e) => sum + Number(e.amount), 0)
  );

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-center font-semibold text-gray-700 mb-4 text-lg">
        Expense Distribution
      </h2>

      <Pie
        key={JSON.stringify(data)}
        data={{
          labels: categories,
          datasets: [
            {
              data,
              backgroundColor: [
                "#f87171",
                "#60a5fa",
                "#34d399",
                "#fbbf24",
                "#a78bfa",
              ],
              borderWidth: 0,
            },
          ],
        }}
      />
    </div>
  );
}

export default ExpenseChart;
