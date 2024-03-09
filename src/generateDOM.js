import NotePlusIcon from "./note-plus.svg"
import PlusIcon from "./plus.svg"
import DeleteIcon from "./delete.svg"
import EditIcon from "./edit.svg"
import TickIcon from "./check.svg"
import CrossIcon from "./close.svg"

import { userTasks, userProjects } from "./projectAndTaskData.js";
import { friendlyDate } from "./displayFunctions.js";
import { priorityClassType } from "./displayFunctions.js";



function loadSideBar() {

  const sidebar = document.querySelector("#sidebar");
  sidebar.innerHTML = "";
  
  const addProjContainer = constructProjectAddContainer();
  sidebar.appendChild(addProjContainer);

  const selectProjContainer = constructProjectSelectContainer();
  sidebar.appendChild(selectProjContainer);

}



function constructProjectSelectContainer() {

  const selectProjContainer = document.createElement("div");
  selectProjContainer.setAttribute("id","select-proj-container");

  const selectProjName = document.createElement("p");
  selectProjName.setAttribute("id", "select-proj-name")
  selectProjName.textContent = "Select Project";
  
  const selectProjItem = constructProjectSelector();
  selectProjItem.setAttribute("id","select-proj-selector");
  sidebar.appendChild(selectProjItem);

  selectProjContainer.appendChild(selectProjName);
  selectProjContainer.appendChild(selectProjItem);

  return selectProjContainer;

}



function constructProjectAddContainer() {

  const addProjContainer = document.createElement("div");
  addProjContainer.setAttribute("id","add-project-container");

  const addProjName = document.createElement("p");
  addProjName.setAttribute("class","add-button-name");
  addProjName.textContent = "Add Project";

  const addProjIcon = document.createElement("img");
  addProjIcon.setAttribute("class","add-button-icon");
  addProjIcon.setAttribute("src",NotePlusIcon);

  // create listener to open project modal form
  const addProjectDialog = document.querySelector("#project-dialog")
  addProjIcon.addEventListener("click", () => {
    addProjectDialog.showModal()
    // The css for this id removes display: none, so styling has to be applied after showModal
    addProjectDialog.setAttribute("class","dialog-display")
  })
  
  addProjContainer.appendChild(addProjName);
  addProjContainer.appendChild(addProjIcon);

  return addProjContainer

}



function constructProjectSelector() {

  const projectArray = userProjects.getProjectArray()

  const projectSelector = document.createElement("select")

  let optionList = projectSelector.options
  
  projectArray.forEach(project => {
    optionList.add( new Option(project.name, project.projId) )
  })
  
  projectSelector.setAttribute("id","project-selector-select");

  projectSelector.addEventListener(
    "change",
    (event) => {
      const selectedProject = userProjects.getProjectById(event.target.value)
      loadProjectDisplay(selectedProject)
    }
  )

  return projectSelector

}


function collectProjectTasks (project) {

  return userTasks.getTaskArray().filter( elem => 
    elem.project.projId === project.projId
  )

}



function loadProjectDisplay(selectedProject) {

  const projectTasks = collectProjectTasks(selectedProject);

  const projDisplay = document.querySelector("#project-display");

  // construct task cards

  let taskCardDOM = (projectTasks.map((element) => {
    return `
      <div class="indiv-task" ${element.complete ? 'id="indiv-task-complete"' : 'id="indiv-task-not-complete"'}>
        <div class="indiv-task-text-container">
          <div class="indiv-task-name">${element.name}</div>
          <div class="indiv-task-description">${element.description}</div>
          <div class="indiv-task-due-date">${friendlyDate(element.dueDate)}</div>
          <div class="${priorityClassType(element.priority)}">${element.priority}</div>
        </div>
        <div class="indiv-task-icon-container">
          <img id="toggle-complete-${element.taskId}" data-task-id=${element.taskId} class="indiv-task-icon-img" src="${element.complete ? CrossIcon: TickIcon}">
          <img id="edit-${element.taskId}" data-task-id=${element.taskId} class="indiv-task-icon-img" src="${EditIcon}">
          <img id="delete-${element.taskId}" data-task-id=${element.taskId} class="indiv-task-icon-img" src="${DeleteIcon}">
        </div>

      </div>`
  })).join("");

  let constructedDOM = `
    <h2 id="project-title">Project: ${selectedProject.name}</h2>
    <p id="project-description">${selectedProject.description}</p>
    <div id="add-task-container">
      <p class="add-button-name">Add Task</p>
      <img class="add-button-icon" id="add-task-icon" data-project-id=${selectedProject.projId} src=${PlusIcon}>
    </div>
    <div id="project-panel">
      <div id="task-container">
        ${taskCardDOM}
      </div>
    </div>
  `
  
  projDisplay.innerHTML = constructedDOM;


  // create listener to open project modal form
  const addTaskIcon = document.querySelector("#add-task-icon")
  const addTaskDialog = document.querySelector("#task-dialog")
  addTaskIcon.addEventListener("click", () => {
    addTaskDialog.showModal()
    // The css for this id removes display: none, so styling has to be applied after showModal
    addTaskDialog.setAttribute("class","dialog-display")
  })
    
  // add event listeners to created task cards
  projectTasks.forEach((element) => {

    const toggleButton = document.querySelector(`#toggle-complete-${element.taskId}`)
    toggleButton.addEventListener("click",() => {
      element.toggleComplete();
      loadProjectDisplay(selectedProject);
    })

    const editButton = document.querySelector(`#edit-${element.taskId}`)
    editButton.addEventListener("click",() => {
      // open up form, edit, etc.
      loadProjectDisplay(selectedProject);
    })

    const deleteButton = document.querySelector(`#delete-${element.taskId}`)
    deleteButton.addEventListener("click",() => {
      userTasks.deleteById(element.taskId);
      loadProjectDisplay(selectedProject);
    })


  })


}


export {
  loadSideBar,
  loadProjectDisplay
};