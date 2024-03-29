import Project from "./Project";
import Task from "./Task";
import { add } from "date-fns";

const defaultProject = new Project(
  "Odin-6: To Do List",
  "Tasks to complete this To Do List tool."
);
const odinWeatherApp = new Project(
  "Odin-8: Weather App",
  "Odin project focusing on asynchronous calls"
);

const userProjects = (function () {
  function initialiseProjectData() {
    return [defaultProject, odinWeatherApp];
  }

  let projectArray = initialiseProjectData();

  const getProjectArray = () => projectArray;

  const addToProjectArray = (newProject) => projectArray.push(newProject);

  const getProjectById = (id) => {
    let filteredArray = projectArray.filter((ele) => ele.projId === id);
    return filteredArray[0];
  };

  return { getProjectArray, addToProjectArray, getProjectById };
})();

const userTasks = (function () {
  function initialiseTaskData() {
    function createTask(name, desc, dueDate, priority, project) {
      const task = new Task(name, desc, dueDate, priority, project);
      task.project = project;
      if (name === "Format complete tasks") {
        task.toggleComplete();
      }
      if (name === "Card design") {
        task.toggleComplete();
      }
      return task;
    }

    let taskArray = [];

    // default project - to do list improvements
    taskArray.push(
      createTask(
        `Edit task`,
        `Add edit task functionality, currently the button isn't active.`,
        add(new Date(), { days: 1 }),
        "Top priority!",
        defaultProject
      )
    );
    taskArray.push(
      createTask(
        `Tidy up generateDOM module`,
        `Needs tidying up, focussing on single responsibility principle in particular.`,
        add(new Date(), { days: 1 }),
        "Top priority!",
        defaultProject
      )
    );
    taskArray.push(
      createTask(
        "Format complete tasks",
        "When a task is incomplete, strike out all the text on the cards",
        add(new Date(), { days: 3 }),
        "Top priority!",
        defaultProject
      )
    );
    taskArray.push(
      createTask(
        `Form validation`,
        `Add validatoin on text in particular to avoid task description being too long.`,
        add(new Date(), { days: 1 }),
        "Fairly important",
        defaultProject
      )
    );
    taskArray.push(
      createTask(
        `Task sorting`,
        `Sort task by ascending due date, and possibly add an option to sort by priority.`,
        add(new Date(), { days: 1 }),
        "Fairly important",
        defaultProject
      )
    );
    taskArray.push(
      createTask(
        "Show complete tasks option",
        "Add an option to the project display to show complete tasks or not",
        add(new Date(), { days: 4 }),
        "Do it later...",
        defaultProject
      )
    );
    taskArray.push(
      createTask(
        `Mobile friendly`,
        `When I've covered this part of the Odin Project course, update the styling to cope with mobile screens.`,
        add(new Date(), { days: 1 }),
        "Do it later...",
        defaultProject
      )
    );
    taskArray.push(
      createTask(
        `Back-end database`,
        `When I've covered this part of the Odin Project course, add a back-end, likely using MongoDb, to manage the projects and the tasks.`,
        add(new Date(), { days: 1 }),
        "Do it later...",
        defaultProject
      )
    );

    taskArray.push(
      createTask(
        `API error handling`,
        `Improve the API handling to give information on the UI, and generally revisit when have better experience with promises.`,
        add(new Date(), { days: 3 }),
        "Top priority!",
        odinWeatherApp
      )
    );
    taskArray.push(
      createTask(
        `Cent / Fahr toggle`,
        `Add a toggle button to switch from centigrade to fahrenheit.`,
        add(new Date(), { days: 3 }),
        "Top priority!",
        odinWeatherApp
      )
    );
    taskArray.push(
      createTask(
        `Tidy current weather window`,
        `Temperature and weather speed and direction need tidying up along side the weather icon.`,
        add(new Date(), { days: 3 }),
        "Top priority!",
        odinWeatherApp
      )
    );
    taskArray.push(
      createTask(
        `Window size responsiveness`,
        `App doesn't react correctly to narrow windows in particular.`,
        add(new Date(), { days: 3 }),
        "Top priority!",
        odinWeatherApp
      )
    );
    taskArray.push(
      createTask(
        `Dom script tidy up`,
        `Dom script would benefit from a tidy up, focussing on S of SOLID principles.`,
        add(new Date(), { days: 3 }),
        "Top priority!",
        odinWeatherApp
      )
    );
    taskArray.push(
      createTask(
        `OOP structure`,
        `If ever have time, look at making the code more object orientated.`,
        add(new Date(), { days: 3 }),
        "Top priority!",
        odinWeatherApp
      )
    );

    return taskArray;
  }

  let taskArray = initialiseTaskData();

  const getTaskArray = () => taskArray;

  const addToTaskArray = (newTask) => taskArray.push(newTask);

  const deleteById = (id) => {
    const taskIndex = taskArray.findIndex((element) => element.taskId === id);
    taskArray.splice(taskIndex, 1);
  };

  return { getTaskArray, addToTaskArray, deleteById };
})();

export {
  userProjects,
  userTasks,
  defaultProject, // default project used in tasks
};
