document.addEventListener("DOMContentLoaded", () => {
    displayTasks();
    updateTaskCount();
});

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const task = taskInput.value.trim();

    if (task !== "") {
        const tasks = getTasks();
        tasks.push({ text: task, completed: false });
        localStorage.setItem("tasks", JSON.stringify(tasks));

        taskInput.value = "";
        displayTasks();
        updateTaskCount();
        playTaskCreatedSound();
    }
}

function displayTasks() {
    const tasksContainer = document.getElementById("tasks");
    tasksContainer.innerHTML = "";

    const tasks = getTasks();
    tasks.forEach((task, index) => {
        const taskItem = document.createElement("li");
        const checkbox = document.createElement("input");
        const text = document.createElement("span");

        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => toggleTask(index));

        text.innerText = task.text;
        text.classList.toggle("completed-task", task.completed);

        const editButton = document.createElement("button");
        editButton.innerHTML = 'EDIT <i class="fa fa-pencil-square" aria-hidden="true"></i>';
        editButton.addEventListener("click", () => editTask(index));

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = 'DELETE <i class="fa fa-trash" aria-hidden="true"></i>';
        deleteButton.addEventListener("click", () => deleteTask(index));

        taskItem.appendChild(checkbox);
        taskItem.appendChild(text);
        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);

        tasksContainer.appendChild(taskItem);
    });
}

function toggleTask(index) {
    const tasks = getTasks();
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();
    updateTaskCount();
    playTingSound();
}

function deleteTask(index) {
    const tasks = getTasks();
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();
    updateTaskCount();
}

function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function updateTaskCount() {
    const totalTasks = getTasks().length;
    const completedTasks = getTasks().filter(task => task.completed).length;

    document.getElementById("totalTasks").innerText = totalTasks;
    document.getElementById("completedTasks").innerText = completedTasks;
}

function editTask(index) {
    const tasks = getTasks();
    const newText = prompt("Edit task:", tasks[index].text);

    if (newText !== null) {
        tasks[index].text = newText.trim();
        localStorage.setItem("tasks", JSON.stringify(tasks));

        displayTasks();
        updateTaskCount();
    }
}

function playTaskCreatedSound() {
    const taskCreatedSound = new Audio("ding.mp3");
    taskCreatedSound.play();
}

function playTingSound() {
    const tingSound = new Audio("ting.mp3");
    tingSound.play();
}
