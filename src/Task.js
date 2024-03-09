
import Project from "./Project.js";
import { v4 as uuidv4 } from "uuid";

const prioOptions = [
  "Top priority!",
  "Fairly important",
  "Do it later..."
]

/* The Task class represents the individual "to do"s.
    Tasks either have a "General" project tag, or are associated with a specific Project class entity
*/


class Task {

  constructor(name, description, dueDate, priority, project) {
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.taskId = uuidv4()
    this.complete = false;
    this.project = project;
  }

  toggleComplete() {
    this.complete = !this.complete
  }

  get project() {
    return this._project;
  }

  set project(existingProject) {
    if (existingProject instanceof Project) {
      this._project = existingProject;
    } else {
      throw "This project is invalid."
    }

  }

  get priority() {
    return this._priority;
  }

  set priority(newPrio) {
    if (prioOptions.includes(newPrio)) {
      this._priority = newPrio
    } else {
      throw "This priority is invalid."
    }
  }

  

}

export {
  Task as default,
  prioOptions
};