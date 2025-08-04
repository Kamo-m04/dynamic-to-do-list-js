document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage and populate task list
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => {
            addTask(taskText, false); // false = don't re-save during load
        });
    }

    // Add a task to the list, optionally saving to Local Storage
    function addTask(taskText, save = true) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = "remove-btn";

        removeBtn.onclick = () => {
            taskList.removeChild(li);
            // Update storage after removal
            const updatedTasks = [];
            taskList.querySelectorAll('li').forEach(item => {
                updatedTasks.push(item.firstChild.textContent.trim());
            });
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        if (save) {
            const currentTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            currentTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(currentTasks));
        }
    }

    // Handle button click or Enter key
    function handleAddTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }
        addTask(taskText); // Defaults to save = true
        taskInput.value = '';
    }

    // Event listeners
    addButton.addEventListener('click', handleAddTask);
    taskInput.addEventListener('keypress', event => {
        if (event.key === 'Enter') {
            handleAddTask();
        }
    });

    // Load tasks from Local Storage on page load
    loadTasks();
});
