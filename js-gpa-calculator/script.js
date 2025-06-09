
const form = document.getElementById('assignment-form');
const list = document.getElementById('assignment-list');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('assignment-name').value;
  const grade = parseFloat(document.getElementById('assignment-grade').value);
  if (!name || isNaN(grade) || grade < 0 || grade > 5) return;

  const assignment = { name, grade };
  assignments.push(assignment);
  renderAssignments();
  updateGPA();
  saveToLocalStorage();

  form.reset();
});

function renderAssignments() {
  list.innerHTML = '';
  assignments.forEach((a, i) => {
    const div = document.createElement('div');
    div.className = 'assignment';
    div.textContent = `${a.name}: ${a.grade}`;
    list.appendChild(div);
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 's' || e.key === 'S') {
    console.log('Assignments:', assignments);
  }
});

function saveToLocalStorage() {
  localStorage.setItem('assignments', JSON.stringify(assignments));
}

function loadFromLocalStorage() {
  const data = localStorage.getItem('assignments');
  if (data) {
    assignments = JSON.parse(data);
    renderAssignments();
    updateGPA();
  }
}

window.addEventListener('load', loadFromLocalStorage);

