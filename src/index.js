import "./styles.css"
import Icon from './icon.png';
import { checkModuleBundling } from "./other.js";

import { Task } from "./Task.js"

const newTask = new Task("Name", "Description", new Date(), "Top priority!");

console.table(newTask);

console.log("Complete?", newTask.complete);
newTask.toggleComplete();
console.log("Complete?", newTask.complete);



console.log("Priority", newTask.priority); // uses the getter

newTask.priority = "Do it later..."; // uses the setter

console.log("Priority", newTask.priority);

