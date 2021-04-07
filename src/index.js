import { initTodoListHandlers } from './scripts/todoList.js';
import { renderTasks } from './scripts/renderer.js';
import { getTasksList } from './scripts/tasksGateway.js';
import { setItem } from './scripts/storage.js';

document.addEventListener('DOMContentLoaded', () => {
    getTasksList()
        .then(tasksList => {
            setItem('tasksList', tasksList)
            renderTasks();
        });

    initTodoListHandlers();
});

const onStorageChange = e => {
    console.log(e)
    if (e.key === 'tasksList') {
        renderTasks();
    }
};

window.addEventListener('storage', onStorageChange);