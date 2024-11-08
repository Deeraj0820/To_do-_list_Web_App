// /public/app.js
document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Fetch tasks from the server
    function fetchTasks() {
        fetch('/api/tasks')
            .then((response) => response.json())
            .then((tasks) => {
                taskList.innerHTML = ''; // Clear the list first
                tasks.forEach((task) => {
                    const li = document.createElement('li');
                    li.innerHTML = ${task.task} <button class="delete" data-id="${task.id}">Delete</button>;
                    taskList.appendChild(li);
                });
            });
    }

    // Add a new task
    taskForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const task = taskInput.value.trim();
        if (task) {
            fetch('/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ task }),
            })
                .then((response) => response.json())
                .then(() => {
                    fetchTasks();
                    taskInput.value = ''; // Clear the input
                });
        }
    });

    // Delete a task
    taskList.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete')) {
            const taskId = event.target.getAttribute('data-id');
            fetch(/api/tasks/${taskId}, { method: 'DELETE' })
                .then(() => fetchTasks());
        }
    });

    // Initial fetch of tasks
    fetchTasks();
});