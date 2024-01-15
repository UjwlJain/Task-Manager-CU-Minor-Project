// storage.js

let tasks = [];

function getTasks() {
    return tasks;
}

function saveTasks(updatedTasks) {
    tasks = updatedTasks;
}

module.exports = {
    getTasks,
    saveTasks,
};
