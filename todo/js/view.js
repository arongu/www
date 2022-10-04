import { LocalStorageManager } from "./lib/local_storage.js";

export {
    TaskListManager,
    TaskListFilterManager
}

class TaskListManager {
    static addTask(task) {
        const icon = document.createElement('i');
        const link = document.createElement('a');
        const li   = document.createElement('li');
        const ul   = document.querySelector('ul.collection');

        icon.setAttribute('class', 'fa fa-remove');

        link.className = 'delete-item secondary-content';
        link.setAttribute('href', '#?'); // value '#?' prevents jumping to the top of the documentation when it is clicked

        li.setAttribute('class', 'collection-item');
        li.textContent = task;

        // assemble the list element and add it to the ul
        link.appendChild(icon);
        li.appendChild(link);
        ul.appendChild(li);
    }

    static getInputAndClear() {
        const input_task = document.querySelector('#task');
        let task = input_task.value.trim();

        if ( task === '' ) {
            task = null;
        }

        input_task.value = null;
        return task;
    }

    static removeAllTasks() {
        const list = document.querySelector('ul.collection');

        if ( list !== null) {
            while ( list.childElementCount !== 0 ) {
                list.removeChild(list.firstElementChild);
            }
        }
    }

    static removeFilteredTasks() {
        const removedIndices = [];
        const collectionItems = document.querySelectorAll('.collection-item');

        collectionItems.forEach((listElement) => {
            if ( listElement.style.display === 'block') {
                let index = 0;
                let sibling = listElement;

                while (sibling.previousElementSibling !== null) {
                    sibling = sibling.previousElementSibling;
                    index++;
                }

                listElement.remove();
                LocalStorageManager.deleteTaskByIndex(index);
            }
        });

        return removedIndices;
    }
}

class TaskListFilterManager {
    static filterTasks(text) {
        const collectionItems = document.querySelectorAll('.collection-item');

        collectionItems.forEach((listItem) => {
            const taskString = listItem.firstChild.textContent.toLowerCase();
            if ( taskString.indexOf(text.toLowerCase()) !== -1 ) {
                listItem.style.display = 'block';
            } else {
                listItem.style.display = 'none';
            }
        });
    }

    static clearFilters() {
        const emptyString = '';
        const input = document.querySelector('#task-filter');

        input.value = emptyString;
        TaskListFilterManager.filterTasks(emptyString);
    }

    static isFilterSet() {
        const input = document.querySelector('#task-filter');
        return input.value !== '';
    }
}
