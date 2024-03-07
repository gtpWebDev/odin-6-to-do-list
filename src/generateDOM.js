import NotePlusIcon from "./note-plus.svg"
import PlusIcon from "./plus.svg"
import DeleteIcon from "./delete.svg"
import EditIcon from "./edit.svg"
import TickIcon from "./check.svg"

import { userTasks, defaultProject, userProjects } from "./projectAndTaskData.js";
import { friendlyDate } from "./displayFunctions.js";
import { priorityBackground } from "./displayFunctions.js";
import { loadProjectDialog, loadTaskDialog } from "./formsDOM.js"



function pageLoad() {

  // must maintain sequence, modal forms first
  loadProjectDialog(); 
  loadTaskDialog();
  loadSideBar();
  loadProjectDisplay(defaultProject);

}



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
  addProjName.setAttribute("id","add-proj-name");
  addProjName.textContent = "Add Project";

  const addProjIcon = document.createElement("img");
  addProjIcon.setAttribute("id","add-proj-icon");
  addProjIcon.setAttribute("src",NotePlusIcon);

  // create listener to open project modal form
  const addBookDialog = document.querySelector("#add-project-dialog-no-display")
  addProjIcon.addEventListener("click", () => {
    addBookDialog.showModal()
    // The css for this id removes display: none, so styling has to be applied after showModal
    addBookDialog.setAttribute("id","add-project-dialog")
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
      <div class="indiv-task" style="background-color:${priorityBackground(element.priority)}">
        <div>
          <div class="indiv-task-name">${element.name}</div>
          <div class="indiv-task-description">- ${element.description}</div>
          <div>${friendlyDate(element.dueDate)}</div>
          <div>${element.complete}</div>
        </div>
        <div class="indiv-task-icon-container">
          <img id="toggle-complete-${element.taskId}" data-task-id=${element.taskId} class="indiv-task-icon-img" src="${TickIcon}">
          <img id="edit-${element.taskId}" data-task-id=${element.taskId} class="indiv-task-icon-img" src="${EditIcon}">
          <img id="delete-${element.taskId}" data-task-id=${element.taskId} class="indiv-task-icon-img" src="${DeleteIcon}">
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
  pageLoad,
  loadSideBar
};