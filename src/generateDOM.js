import NotePlusIcon from "./note-plus.svg"
import PlusIcon from "./plus.svg"
import DeleteIcon from "./delete.svg"
import EditIcon from "./edit.svg"

import { projects, tasks, projectGeneral } from "./projectAndTaskData.js";
import { friendlyDate } from "./displayFunctions.js";
import { priorityBackground } from "./displayFunctions.js";


function pageLoad() {

  loadSideBar();
  loadMainContainer(
    projects.getProjectArray(),
    tasks.getTaskArray()
  );

}


function loadSideBar() {

  const sidebar = document.querySelector("#sidebar");
  
  const addProjItem = constructSidebarItem("Add Project",NotePlusIcon)
  sidebar.appendChild(addProjItem);

  const addTaskItem = constructSidebarItem("Add Task",PlusIcon)
  sidebar.appendChild(addTaskItem);

}


function constructSidebarItem(text,imageUrl) {
  
  const sidebarItem = document.createElement("div");
  sidebarItem.setAttribute("class","sidebarItem");

  const sidebarName = document.createElement("p");
  sidebarName.setAttribute("class","sidebarName");
  sidebarName.textContent = text;

  const sidebarIcon = document.createElement("img");
  sidebarIcon.setAttribute("class","sidebarIcon");
  sidebarIcon.setAttribute("src",imageUrl);
  
  sidebarItem.appendChild(sidebarName);
  sidebarItem.appendChild(sidebarIcon);

  return sidebarItem;

}




function loadMainContainer(projectArray, taskArray) {

  // Creates the project selector and project display
  // Apply filter for default "general" project

  const mainContainer = document.querySelector("#main-container");

  const projectSelectorContainer = document.createElement("div");
  projectSelectorContainer.setAttribute("id","project-selector-container");
  const projectSelectorLabel = document.createElement("p");
  projectSelectorLabel.textContent = "Please select a project: ";
  projectSelectorLabel.setAttribute("id","project-selector-text");
  projectSelectorContainer.appendChild(projectSelectorLabel)

  const projectSelectorInput = constructProjectSelector(projectArray, taskArray);
  projectSelectorContainer.appendChild(projectSelectorInput);

  mainContainer.appendChild(projectSelectorContainer);

  const projectDisplay = document.createElement("div");
  projectDisplay.setAttribute("id","project-display");
  mainContainer.appendChild(projectDisplay);

  const defaultProjId = projectGeneral.projId
  const filteredTasks = applyProjFilter(defaultProjId, taskArray);
  loadProjectDisplay(defaultProjId, filteredTasks)

}


function constructProjectSelector(projectArray, taskArray) {

  const projectSelector = document.createElement("select")

  let optionList = projectSelector.options
  
  projectArray.forEach(project => {
    optionList.add( new Option(project.name, project.projId) )
  })
  
  projectSelector.setAttribute("id","project-selector-select");

  projectSelector.addEventListener(
    "change",
    (event) => {
      const filteredTasks = applyProjFilter(event.target.value, taskArray)
      loadProjectDisplay(event.target.value, filteredTasks)
    }
  )

  return projectSelector

}



function applyProjFilter(projId, taskArray) {

  return taskArray.filter( ele => 
    ele.project.projId === projId
  )

}



function loadProjectDisplay(projId, taskArray) {

  // Loads general project details for projId
  // Includes tasks in taskArray below

  const selectedProject = projects.getProjectById(projId)

  const projDisplay = document.querySelector("#project-display");

  // construct task cards

  let taskCardDOM = (taskArray.map((element) => {
    return `
      <div class="indiv-task" style="background-color:${priorityBackground(element.priority)}">
        <div id="indiv-task-name">${element.name}</div>
        <div>${element.description}</div>
        <div>${friendlyDate(element.dueDate)}</div>
        <div>${element.complete}</div>

        <div class="indiv-task-icon-container">
          <img class="indiv-task-icon-img" src="${EditIcon}">
          <img class="indiv-task-icon-img" src="${DeleteIcon}">
        </div>

      </div>`
  })).join("");

  let constructedDOM = `
    <h2 id="project-title">Project: ${selectedProject.name}</h2>
    <p id="project-description">- ${selectedProject.description}</p>
    <div id="project-panel">
      <div id="task-container">
        ${taskCardDOM}
      </div>
    </div>
  `
  
  projDisplay.innerHTML = constructedDOM;

  // add event listeners

}





export {
  pageLoad,
};