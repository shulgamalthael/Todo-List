import { initTodoListHandlers } from './todoList';
import { renderTasks } from './renderer';
import { getTasksList } from './tasksGateway';
import { setItem } from './storage';

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