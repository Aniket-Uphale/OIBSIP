const addedTasks = [];
const completedTasks = [];

const taskInput = document.getElementById('task-input');
const descriptionInput = document.getElementById('description-input');
const addButton = document.getElementById('add-button');
const addedTasksList = document.getElementById('added-tasks-list');
const completedTasksList = document.getElementById('completed-tasks-list');

addButton.addEventListener('click', () => {
  const taskName = taskInput.value.trim();
  const taskDescription = descriptionInput.value.trim();

  if (taskName !== '') {
    const task = {
      id: Date.now(),
      name: taskName,
      description: taskDescription,
    };

    addedTasks.push(task);

    displayAddedTasks();

    taskInput.value = '';
    descriptionInput.value = '';
  }
});

function createTaskRow(task , isCompletedTable = false) {
  const row = document.createElement('tr');

  const taskCell = document.createElement('td');
  taskCell.textContent = task.name;
  row.appendChild(taskCell);

  const descriptionCell = document.createElement('td');
  descriptionCell.textContent = task.description;
  row.appendChild(descriptionCell);


  const actionsCell = document.createElement('td');
  
  if (!isCompletedTable) {
    const completeButton = document.createElement('button1');
    completeButton.innerHTML = '<i class="fas fa-check"></i> ';
    completeButton.addEventListener('click', () => completeTask(task.id));
    actionsCell.appendChild(completeButton);
  }

  const deleteButton = document.createElement('button');
   deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
  deleteButton.addEventListener('click', () => deleteTask(task.id));
  actionsCell.appendChild(deleteButton);

  row.appendChild(actionsCell);

  return row;
}

function displayAddedTasks() {
  addedTasksList.innerHTML = '';

  addedTasks.forEach((task) => {
    const row = createTaskRow(task);
    addedTasksList.appendChild(row);
  });
}


function displayCompletedTasks() {
  completedTasksList.innerHTML = '';

  completedTasks.forEach((task) => {
    const row = createTaskRow(task, true);
    completedTasksList.appendChild(row);
  });
}


function completeTask(taskId) {
  const taskIndex = addedTasks.findIndex((task) => task.id === taskId);

  if (taskIndex !== -1) {
    const task = addedTasks.splice(taskIndex, 1)[0];
    completedTasks.push(task);

    displayAddedTasks();
    displayCompletedTasks();
  }
}

function deleteTask(taskId) {
  const addedTaskIndex = addedTasks.findIndex((task) => task.id === taskId);
  const completedTaskIndex = completedTasks.findIndex((task) => task.id === taskId);

  if (addedTaskIndex !== -1) {
    addedTasks.splice(addedTaskIndex, 1);
    displayAddedTasks();
  }

  if (completedTaskIndex !== -1) {
    completedTasks.splice(completedTaskIndex, 1);
    displayCompletedTasks();
  }
}

displayAddedTasks();
displayCompletedTasks();
