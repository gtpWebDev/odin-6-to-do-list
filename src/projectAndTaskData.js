import Task from "./Task"
import Project from "./Project"
import { add } from "date-fns"

const defaultProject = new Project("General", "This is a general catch-all project which will show by default.");
const projectDIY = new Project(`DIY jobs`, `Jobs around the house`);
const projectWork = new Project(`Work things`, `Related to my job`);
const projectMisc = new Project(`Miscellaneous`, `Lots of random tasks...`);


const userProjects = (function() {

  function initialiseProjectData() {

    return [
      defaultProject,
      projectDIY,
      projectWork,
      projectMisc
    ]
  
  }

  let projectArray = initialiseProjectData()

  const getProjectArray = () => projectArray;

  const addToProjectArray = (newProject) => {

    projectArray.push(newProject)

  }

  const getProjectById = (id) => {
    
    let filteredArray = projectArray.filter(
      ele => ele.projId === id
    )
    return filteredArray[0]

  }

  return { getProjectArray, addToProjectArray, getProjectById }

})()



const userTasks = (function() {

  function initialiseTaskData() {

    // general
    const taskShop = new Task(`Weekly shopping`, `Don't forget bread, milk and sugar`, add(new Date(), {days: 5}), "Fairly important");
    taskShop.project = defaultProject;
    const taskToDo = new Task(`To Do Project`, `Finish the Odin Project To Do project`, add(new Date(), {days: 8}), "Top priority!");
    taskShop.project = defaultProject;
    const taskWebsite = new Task(`Personal Website`, `Develop personal website to help advertise my capabilities to potential employers.`, add(new Date(), {days: 30}), "Do it later...");
    taskShop.project = defaultProject;
  
    // misc.
    const taskDryCleaners = new Task(`Dry cleaners`, `Pick up suit from dry cleaner`, add(new Date(), {days: 3}), "Fairly important");
    taskDryCleaners.project = projectMisc;
    const taskPayWindows = new Task(`Pay window cleaner`, `£8.00 on Wednesday`, add(new Date(), {days: 0}), "Do it later...");
    taskPayWindows.project = projectMisc;
  
    // work
    const taskOdin = new Task(`Odin javascript module`, `Finish module on classes`, add(new Date(), {days: 2}), "Top priority!");
    taskOdin.project = projectWork;
    const taskApply = new Task(`Apply for jobs`, `Search web dev jobs on job sites`, add(new Date(), {days: 2}), "Top priority!");
    taskApply.project = projectWork;
  
    // diy
    const taskFixFence = new Task(`Fix fence`, `Buy a new fence panel, concrete,  and fix it!`, add(new Date(), {days: 8}), "Fairly important");
    taskFixFence.project = projectDIY;
    const taskPaintGate = new Task(`Paint gate`, `Buy black and gold paint, paint the fence.`, add(new Date(), {days: 8}), "Fairly important");
    taskPaintGate.project = projectDIY;
  
    return [
      taskShop,
      taskToDo,
      taskWebsite,
      taskDryCleaners,
      taskOdin,
      taskFixFence,
      taskPayWindows,
      taskApply,
      taskPaintGate
    ]
  
  }

  let taskArray = initialiseTaskData()

  const getTaskArray = () => taskArray;

  const deleteById = (id) => {
    const taskIndex = taskArray.findIndex((element) => element.taskId === id);
    taskArray.splice(taskIndex,1);
    console.log(taskIndex);
  }


  return { getTaskArray, deleteById }

})()



export {
  userProjects,
  userTasks,
  defaultProject // default project used in tasks
};