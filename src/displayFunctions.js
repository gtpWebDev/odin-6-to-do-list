
import { format } from "date-fns"
import  { prioOptions } from "./Task"

function friendlyDate(inputDate) {

  return format(inputDate, "eeee, do MMMM, yyyy")

}


function priorityBackground(taskPriority) {

  if (prioOptions.includes(taskPriority)) {

    switch (taskPriority) {
      case "Top priority!":
        return "#ffcccc";

      case "Fairly important":
        return "#ffffcc";

      case "Do it later...":
        return "#ccffcc";
   
    }
  } else {
    throw "Invalid task priority."
  }

}


export {
  friendlyDate,
  priorityBackground
};