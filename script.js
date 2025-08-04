document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage and populate the task list
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => {
            addTask(taskText, false); // false: don't re-save during load
        });
    }

    // Add a task to the list, optionally saving to Local Storage
    function addTask(taskText, save = true) {
        if (taskText.trim() === '') {
            alert('Please enter a task.');
            return;
        }

        // Create new li element
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Remove li from task list on click
        removeBtn.onclick = () => {
            taskList.removeChild(li);

            // Update local storage after removal
            const updatedTasks = [];
            taskList.querySelectorAll('li').forEach(item => {
                updatedTasks.push(item.firstChild.textContent.trim());
            });
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        };

        // Append button to li and li to task list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Save to localStorage
        if (save) {
            const currentTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            currentTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(currentTasks));
        }

        // Clear input field
        taskInput.value = '';
    }

    // Add task when button is clicked
    addButton.addEventListener('click', () => {
        const taskText = taskInput.value;
        addTask(taskText);
    });

    // Add task when Enter key is pressed
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const taskText = taskInput.value;
            addTask(taskText);
        }
    });

    // Load tasks when page loads
    loadTasks();
});
