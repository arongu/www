import { TaskListManager } from "./js/view.js";
import { LocalStorageManager } from "./js/lib/local_storage.js";
import {
   listen__TaskFilter_Input__key__enter,
   listen__TaskFilter_Input__input,
   listen__TaskList_Button_AddTask__click,
   listen__TaskList_Button_DeleteAllTasks__click,
   listen__TaskList_Button_DeleteSelectedTasks__click,
   listen__TaskList_Input_NewTask__key__enter,
   listen__TaskList_x__click, listen__Button_Undo__click
} from "./js/controller.js";


const load_tasks_from_local_storage = () => {
   const tasks = LocalStorageManager.getTasks();
   if ( tasks !== null ) {
      tasks.forEach((task) => {
         TaskListManager.addTask(task);
      });
   }
};


listen__TaskList_Input_NewTask__key__enter();
listen__TaskList_Button_AddTask__click();
listen__TaskList_Button_DeleteSelectedTasks__click();
listen__TaskList_Button_DeleteAllTasks__click();
listen__TaskList_x__click();
listen__TaskFilter_Input__input();
listen__TaskFilter_Input__key__enter();
listen__Button_Undo__click();
// init
load_tasks_from_local_storage();
