function addNewExpense(event) {
  event.preventDefault();

  const expenseDetails = {
    expenseamount: event.target.expenseamount.value,
    description: event.target.description.value,
    category: event.target.category.value,
  };
  console.log(expenseDetails);
  axios
    .post("http://localhost:3000/expense/addexpense", expenseDetails)
    .then((response) => {
      addNewExpensetoUI(response.data.expense);
    })
    .catch((err) => {
      // throw new Error(err);
    });
}

window.addEventListener("DOMContentLoaded", async (response) => {
  try {
    axios
      .get("http://localhost:3000/expense/getexpenses")
      .response.data.expenses.forEach((expense) => {
        addNewExpensetoUI(expense);
      });
  } catch (err) {}
});

function addNewExpensetoUI(expense) {
  const parentElement = document.getElementById("listOfExpenses");
  console.log(parentElement);
  const expenseElemId = `expense-${expense.id}`;
  const children = `
    <li id=${expenseElemId}>
        ${expense.expenseamount} - ${expense.category} - ${expense.description}
        <button onclick='deleteExpense(event,${expense.id})'>
        Delete Expense
        </button>
    </li>
  `;
  parentElement.innerHTML = children + parentElement.innerHTML;
}

function deleteExpense(event, expenseid) {
  axios
    .delete(`http://localhost:3000/expense/deleteexpense/${expenseid}`)
    .then(() => {
      removeExpensefromUI(expenseid);
    })
    .catch((err) => {
      // showError(err);
    });
}

function removeExpensefromUI(expenseid) {
  const expenseElemId = `expense-${expenseid}`;
  document.getElementById(expenseElemId).remove();
}
