import {
    TaskListFilterManager,
    TaskListManager
} from "./view.js";

import { LocalStorageManager } from "./lib/local_storage.js";

export {
    listen__TaskList_Button_AddTask__click,
    listen__TaskList_Button_DeleteSelectedTasks__click,
    listen__TaskList_Button_DeleteAllTasks__click,
    listen__TaskList_x__click,
    listen__TaskList_Input_NewTask__key__enter,
    listen__TaskFilter_Input__input,
    listen__TaskFilter_Input__key__enter,
    listen__Button_Undo__click
}

// --------------------------------------------------------------------------------
// TaskList related
// --------------------------------------------------------------------------------
const listen__TaskList_Input_NewTask__key__enter = () => {
    const input = document.querySelector('#task');
    input.addEventListener('keyup', (event) => {
        if ( event.key === 'Enter' ) {
            const task = TaskListManager.getInputAndClear();
            if ( task !== null) {
                LocalStorageManager.backupTasks();
                LocalStorageManager.addTask(task);
                TaskListManager.addTask(task);
            }
        }
    });
}

const listen__TaskList_Button_AddTask__click = () => {
    const btnAddTask = document.querySelector('#input-add-task');
    btnAddTask.addEventListener('click', () => {
        const task = TaskListManager.getInputAndClear();
        if ( task !== null) {
            LocalStorageManager.backupTasks();
            LocalStorageManager.addTask(task);
            TaskListManager.addTask(task);
        }
    });
}

const listen__TaskList_Button_DeleteSelectedTasks__click = () => {
    const btnClearTasks = document.querySelector('.delete-filtered-tasks');
    btnClearTasks.addEventListener('click', () => {
        if ( TaskListFilterManager.isFilterSet()) {
            LocalStorageManager.backupTasks();
            for ( let index of TaskListManager.removeFilteredTasks()) {
                LocalStorageManager.deleteTaskByIndex(index);
            }
        }
    });
}

const listen__TaskList_Button_DeleteAllTasks__click = () => {
    const btnClearTasks = document.querySelector('.delete-all-tasks');
    btnClearTasks.addEventListener('click', () => {
        TaskListManager.removeAllTasks();
        LocalStorageManager.backupTasks();
        LocalStorageManager.deleteAllTasks();
    });
}

const listen__TaskList_x__click = () => {
    const collectionList = document.querySelector('ul.collection');
    collectionList.addEventListener('click', (event) => {
        const classList = event.target.classList;
        let listElement = null;

        if ( classList.contains('fa') || classList.contains('fa-remove') ) {
            listElement = event.target.parentElement.parentElement;

        } else if ( classList.contains('delete-item') || classList.contains('secondary-content') ) {
            listElement = event.target.parentElement;
        }

        if ( listElement !== null) {
            let index    = 0;
            let ptr      = listElement;

            while (ptr.previousElementSibling !== null) {
                ptr = ptr.previousElementSibling;
                index++;
            }

            listElement.remove();
            // trick only scroll to the deleted element's location,
            // when the 'click event -- delete' is outside of the visible range of the user
            if ( event.clientY > window.innerHeight) {
                window.scrollTo(0, event.clientY);
            }

            LocalStorageManager.backupTasks();
            LocalStorageManager.deleteTaskByIndex(index);
        }
    });
}

const listen__Button_Undo__click = () => {
    const btnUndo = document.querySelector('#button-undo');
    btnUndo.addEventListener('click', () => {
        TaskListFilterManager.clearFilters();
        TaskListManager.removeAllTasks();
        LocalStorageManager.restoreTasksFromBackup();

        const tasks = LocalStorageManager.getTasks();
        if ( tasks !== null ) {
            tasks.forEach((task) => {
                TaskListManager.addTask(task);
            });
        }
    });
}


// --------------------------------------------------------------------------------
// TaskFilter related
// --------------------------------------------------------------------------------
const listen__TaskFilter_Input__input = () => {
    const input = document.querySelector('#task-filter');
    input.addEventListener('input', () => {
        TaskListFilterManager.filterTasks(input.value);
    });
}

const listen__TaskFilter_Input__key__enter = () => {
    const input = document.querySelector('#task-filter');
    input.addEventListener('keyup', (event) => {
        if ( event.key === 'Enter' ) {
            TaskListFilterManager.clearFilters();
        }
    });
}