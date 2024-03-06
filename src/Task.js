

/* The Task class represents the individual "to do"s.
    Tasks either have a "General" project tag, or are associated with a specific Project class entity
*/

const prioOptions = [
  "Top priority!",
  "Fairly important",
  "Do it later..."
]

class Task {

  constructor(name, description, dueDate, priority) {
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.complete = false;
    this.project = "General";
  }

  toggleComplete() {
    this.complete = !this.complete
  }

  assignProject() {
    // to complete
  }

  addDay() {
    // add a single day to the due date
  }

  // Priority getter and setter

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
  Task
};