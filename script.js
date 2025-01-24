document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage when the page loads
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]'); // Retrieve tasks or default to an empty array
        storedTasks.forEach(taskText => addTask(taskText, false)); // Add each task to the list, without re-saving to Local Storage
    }

    // Add a new task
    function addTask(taskText, save = true) {
        // Check if the taskText is empty
        if (!taskText) {
            alert('Please enter a task.');
            return;
        }

        // Create a new <li> element for the task
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        // Create a "Remove" button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');

        // Add an event listener to the "Remove" button
        removeButton.onclick = () => {
            taskList.removeChild(taskItem); // Remove the <li> from the DOM
            removeTaskFromLocalStorage(taskText); // Remove the task from Local Storage
        };

        // Append the "Remove" button to the <li>
        taskItem.appendChild(removeButton);

        // Append the <li> to the <ul>
        taskList.appendChild(taskItem);

        // Save to Local Storage if required
        if (save) {
            saveTaskToLocalStorage(taskText);
        }
    }

    // Save a task to Local Storage
    function saveTaskToLocalStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]'); // Retrieve existing tasks
        storedTasks.push(taskText); // Add the new task
        localStorage.setItem('tasks', JSON.stringify(storedTasks)); // Save updated tasks back to Local Storage
    }

    // Remove a task from Local Storage
    function removeTaskFromLocalStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]'); // Retrieve existing tasks
        const updatedTasks = storedTasks.filter(task => task !== taskText); // Filter out the task to be removed
        localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Save the updated tasks back to Local Storage
    }

    // Add event listener to the "Add Task" button
    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim(); // Get and trim input value
        addTask(taskText); // Add the task
        taskInput.value = ''; // Clear the input field
    });

    // Add event listener to the input field for the "Enter" key
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim(); // Get and trim input value
            addTask(taskText); // Add the task
            taskInput.value = ''; // Clear the input field
        }
    });

    // Load tasks from Local Storage on page load
    loadTasks();
});
