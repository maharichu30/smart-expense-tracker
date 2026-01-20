import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function ExpenseChart({ expenses, filterType }) {
  // 🔥 Dynamic filter based on radio
  const filteredData = expenses.filter(
    (e) => e.type === filterType
  );

  if (filteredData.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg text-center text-gray-500">
        No {filterType} data to show
      </div>
    );
  }

  // Category-wise calculation
  const categoryMap = {};
  filteredData.forEach((e) => {
    categoryMap[e.category] =
      (categoryMap[e.category] || 0) + Number(e.amount);
  });

  const labels = Object.keys(categoryMap);
  const data = Object.values(categoryMap);

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg h-[420px] flex flex-col">
      <h2 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
        📊 {filterType === "expense" ? "Expense" : "Income"} Distribution
      </h2>

      <div className="flex-1 flex items-center justify-center">
        <div className="w-[260px] h-[260px]">
          <Pie
            data={{
              labels,
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
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "bottom",
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ExpenseChart;
