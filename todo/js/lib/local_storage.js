export  { LocalStorageManager }

// Simple class with static method, to make life easier to work with localStorage.
class LocalStorageManager {
    static getTasks() {
        if ( localStorage.getItem('tasks') !== null) {
            return JSON.parse(localStorage.getItem('tasks'));

        } else {
            return null;
        }
    }

    static addTask(task) {
        if ( task === null) {
            return;
        }

        let savedTasks = LocalStorageManager.getTasks();
        if ( savedTasks === null) {
            savedTasks = [];
        }

        savedTasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(savedTasks));
    }

    static deleteTaskByIndex = (index) => {
        if ( ! Number.isInteger(index) && index >= 0) {
            console.error(`Index must be an integer and equal to zero or greater! -- ${index}`);
            return;
        }

        const savedTasks = LocalStorageManager.getTasks();
        if ( savedTasks !== null && savedTasks[index] !== null) {
            savedTasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(savedTasks));
        }
    }

    static deleteAllTasks() {
        localStorage.setItem('tasks', null);
    }

    static backupTasks() {
        localStorage.setItem('tasks-backup', localStorage.getItem('tasks'));
    }

    static restoreTasksFromBackup() {
        localStorage.setItem('tasks', localStorage.getItem('tasks-backup'));
    }
}
