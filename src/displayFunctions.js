
import { format } from "date-fns"
import  { prioOptions } from "./Task"

function friendlyDate(inputDate) {

  return format(inputDate, "eeee, do MMMM, yyyy")

}


function priorityClassType(taskPriority) {

  if (prioOptions.includes(taskPriority)) {

    switch (taskPriority) {
      case "Top priority!":
        return "indiv-task-priority-high";

      case "Fairly important":
        return "indiv-task-priority-mid";

      case "Do it later...":
        return "indiv-task-priority-low";
   
    }
  } else {
    throw "Invalid task priority."
  }

}


export {
  friendlyDate,
  priorityClassType
};