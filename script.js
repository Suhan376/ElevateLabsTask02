const inputBox = document.querySelector(".todo-input");
const addBtn = document.querySelector(".add-btn");
const tbody = document.querySelector(".todo-list");
let startDate = document.querySelector(".start-date");
let endDate = document.querySelector(".end-date");


function formatDate(dateStr) {
  let [year, month, day] = dateStr.split("-");
  return `${day}-${month}-${year}`;
}


function applyStatusColor(row, status) {
  row.classList.remove("status-pending", "status-in-progress", "status-completed");

  if (status === "pending") row.classList.add("status-pending");
  else if (status === "in-progress") row.classList.add("status-in-progress");
  else if (status === "completed") row.classList.add("status-completed");
}


function updateSrNo() {
  let rows = tbody.querySelectorAll("tr");
  rows.forEach((row, index) => {
    let firstCell = row.querySelector("td");
    if (firstCell) firstCell.textContent = index;
  });
}




addBtn.addEventListener("click", () => {
  if (!inputBox.value || !startDate.value || !endDate.value) {
    alert("Please fill all fields.");
    return;
  }

  let start = formatDate(startDate.value);
  let end = formatDate(endDate.value);

  if (end < start) {
    alert("End date cannot be before start date!");
    return;
  }

  let tr = document.createElement("tr");
  let SrNo = tbody.rows.length;

  tr.innerHTML = `
  
    <td>${SrNo}</td>
    <td>
      <select class="status-select">
        <option value="pending" selected>Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    </td>
    <td>${inputBox.value.trim()}</td>
    <td>${start}</td>
    <td>${end}</td>
    <td>
      <button class="delete-btn">
        <img class="delete-icon" src="./assets/delete.png" alt="delete">
      </button>
    </td>
  `;

  tbody.appendChild(tr);

  applyStatusColor(tr, "pending");


  inputBox.value = "";
});


tbody.addEventListener("click", (e) => {
  if (e.target.closest(".delete-btn")) {
    e.target.closest("tr").remove();
    updateSrNo();
    
  }
});


tbody.addEventListener("change", (e) => {
  if (e.target.classList.contains("status-select")) {
    let row = e.target.closest("tr");
    applyStatusColor(row, e.target.value);
   
  }
});
