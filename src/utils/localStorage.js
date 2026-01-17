export const saveExpenses = (expenses) => {
  localStorage.setItem("expenses", JSON.stringify(expenses));
};

export const getExpenses = () => {
  const data = localStorage.getItem("expenses");
  return data ? JSON.parse(data) : [];
};
