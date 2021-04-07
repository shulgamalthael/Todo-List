import { renderTasks } from './renderer';
import { getItem, setItem } from './storage';
import { updateTask, getTasksList, deleteTask } from './tasksGateway';

export const onToggleTask = e => {
    const isCheckbox = e.target.classList.contains('list-item__checkbox');

    if (!isCheckbox) {
        return;
    }

    const taskId = e.target.dataset.id;
    const tasksList = getItem('tasksList');
    const { text, createDate } = tasksList
        .find(task => task.id === taskId);
    const done = e.target.checked;

    const updatedTask = {
        text,
        createDate,
        done,
        endEvent: done
            ? new Date().toISOString()
            : null
    };

    updateTask(taskId, updatedTask)
        .then(() => getTasksList())
        .then(newTasksList => {
            setItem('tasksList', newTasksList);
            renderTasks();
        });
};

export const onDeleteTask = e => {
    const isDelete = e.target.classList.contains('list-item__delete-btn');

    if (!isDelete) {
        return;
    }

    const taskId = e.target.dataset.id;
    const tasksList = getItem('tasksList');
    const { text, createDate } = tasksList
        .find(task => task.id === taskId);
    const done = e.target.checked;

    const updatedTask = {
        text,
        createDate,
        done,
        endEvent: done 
            ? new Date().toISOString()
            : null
    };

    deleteTask(taskId, updatedTask)
        .then(() => getTasksList())
        .then(newTasksList => {
            setItem('tasksList', newTasksList);
            renderTasks();
        });
};

export const onListClick = e => {
    const checkboxItem = e.target.classList.contains('list-item__checkbox');
    const deleteItem = e.target.classList.contains('list-item__delete-btn');

    if (deleteItem) {
        onDeleteTask(e)
    }
    if (checkboxItem) {
        onToggleTask(e)
    }
};