import { getItem } from "./storage";

// const tasks = [
//     {
//         text: "Buy milk",
//         done: false,
//         startEvent: new Date(),
//         endEvent: new Date(),
//     },
//     {
//         text: "Pick up Tom from airport",
//         done: false,
//         startEvent: new Date(),
//         endEvent: new Date(),
//     },
//     {
//         text: "Visit party",
//         done: false,
//         startEvent: new Date(),
//         endEvent: new Date(),
//     },
//     {
//         text: "Visit doctor",
//         done: true,
//         startEvent: new Date(),
//         endEvent: new Date(),
//     },
//     {
//         text: "Buy meat",
//         done: true,
//         startEvent: new Date(),
//         endEvent: new Date(),
//     }
// ];

const listElem = document.querySelector('.list');
// listElem.innerHTML = "";

const compareTasks = (a, b) => {

    if (a.done - b.done !== 0) {
        return a.done - b.done;
    };
    if (a.done) {
        return new Date(b.endEvent) - new Date(a.endEvent);
    };
    return new Date(b.startEvent) - new Date(a.startEvent);
};

const createCheckbox = ({ done, id }) => {
    const checkboxElem = document.createElement('input');
    checkboxElem.setAttribute('type', 'checkbox');
    checkboxElem.setAttribute('data-id', id);
    checkboxElem.checked = done;
    checkboxElem.classList.add('list-item__checkbox');

    return checkboxElem;
};

const createListItem = ({ text, done, id }) => {
    const listItemElem = document.createElement('li');
    listItemElem.classList.add('list-item', 'list__item');
    const checkboxElem = createCheckbox({ done, id });
    if (done) {
        listItemElem.classList.add('list-item_done');
    }

    const textElem = document.createElement('span');
    textElem.classList.add('list-item__text');
    textElem.textContent = text;

    const deleteBtnElem = document.createElement('button');
    deleteBtnElem.classList.add('list-item__delete-btn')
    deleteBtnElem.setAttribute('data-id', id)
    listItemElem.append(checkboxElem, textElem, deleteBtnElem);

    return listItemElem;
};

export const renderTasks = () => {
    const tasksList = getItem('tasksList') || [];

    listElem.innerHTML = '';
    console.log(listElem)
    const tasksElems = tasksList
        .sort(compareTasks)
        .map(createListItem);

    listElem.append(...tasksElems);
};