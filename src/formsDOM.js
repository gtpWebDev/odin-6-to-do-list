import Project from "./Project.js";
import Task, { prioOptions } from "./Task.js";
import { userProjects } from "./projectAndTaskData.js";
import { userTasks } from "./projectAndTaskData.js";
import { loadSideBar, loadProjectDisplay } from "./generateDOM.js";



function loadProjectDialog() {

  const addProjectDialogLoc = document.querySelector("#dialog-project-loc");

  const constructedDOM = `
    <dialog class="dialog-no-display" id="project-dialog">
      <h2>Please provide the project details...</h2>
      <!-- method dialog necessary when form located in a dialog -->
      <form id="add-project-form" action="" method="dialog">
        <div id="project-form-inputs">
          <label class="form-label" for="project-name">Project Name:</label>
          <input id="form-project-name" class="form-input" type="text" name="project-name" placeholder="e.g. House Chores" required>
          <label class="form-label" for="project-desc">Project Description:</label>
          <input id="form-project-desc" class="form-input" type="text" name="project-desc" placeholder="more details here..." required>
        </div>
        <div id="form-buttons">
          <button id="add-project-submit" class="form-button" type="submit">Submit</button>
          <button id="add-project-cancel" class="form-button" type="cancel" autofocus>Cancel</button>
        </div>
      </form>
    </dialog>
  `
  addProjectDialogLoc.innerHTML = constructedDOM;

  // Add submit and cancel on the modal dialog

  let addProjectCancel = document.querySelector("#add-project-cancel")
  addProjectCancel.addEventListener("click", (event) => {
    // prevent usual behaviour of form submit to send information to a server
    event.preventDefault();
    // return the modal to display: none
    const addProjectDialog = document.querySelector("#project-dialog")
    addProjectDialog.setAttribute("class","dialog-no-display")
    addProjectDialog.close();
  })

  let addBookForm = document.querySelector("#add-project-form")
  addBookForm.addEventListener("submit", (event) => {
    // prevent usual behaviour of form submit to send information to a server
    event.preventDefault();
    const newProject = new Project(
      document.querySelector("#form-project-name").value,
      document.querySelector("#form-project-desc").value
    )
    userProjects.addToProjectArray(newProject);
    console.table(userProjects.getProjectArray())
    resetProjectForm()
    const addProjectDialog = document.querySelector("#project-dialog")
    addProjectDialog.setAttribute("class","dialog-no-display")
    addProjectDialog.close();
    loadSideBar()

  })

}

function resetProjectForm() {
  document.querySelector("#form-project-name").value = "";
  document.querySelector("#form-project-desc").value = "";
}



function loadTaskDialog() {


  const addTaskDialogLoc = document.querySelector("#dialog-task-loc")

  const constructedDOM = `
    <dialog class="dialog-no-display" id="task-dialog">
      <h2>Please provide the task details...</h2>
      <!-- method dialog necessary when form located in a dialog -->
      <form id="add-task-form" action="" method="dialog">
        <div id="task-form-inputs">
          <label class="form-label" for="task-name">Task Name:</label>
          <input id="form-task-name" class="form-input" type="text" name="task-name" placeholder="e.g. House Chores" required>
          <label class="form-label" for="task-desc">Task Description:</label>
          <input id="form-task-desc" class="form-input" type="text" name="task-desc" placeholder="more details here..." required>
          <label class="form-label" for="task-date">Due Date</label>
          <input id="form-task-date" class="form-input" type="date" name="task-date" placeholder="J R R Tolkein" required>
          <label class="form-label" for="task-priority">Priority</label>
        </div>
        <div id="form-buttons">
          <button id="add-task-submit" class="form-button" type="submit">Submit</button>
          <button id="add-task-cancel" class="form-button" type="cancel" autofocus>Cancel</button>
        </div>
      </form>
    </dialog>
  `
  addTaskDialogLoc.innerHTML = constructedDOM;

  const formInputs = document.querySelector("#task-form-inputs");
  formInputs.appendChild(constructPrioritySelector());
  

  // Add submit and cancel buttons on the modal dialog

  let addTaskCancel = document.querySelector("#add-task-cancel")
  addTaskCancel.addEventListener("click", (event) => {
    // prevent usual behaviour of form submit to send information to a server
    event.preventDefault();
    // return the modal to display: none
    const addTaskDialog = document.querySelector("#task-dialog")
    addTaskDialog.setAttribute("class","dialog-no-display")
    addTaskDialog.close();
  })



  let addTaskForm = document.querySelector("#add-task-form")
  addTaskForm.addEventListener("submit", (event) => {
    // prevent usual behaviour of form submit to send information to a server
    event.preventDefault();

    const addTaskIcon = document.querySelector("#add-task-icon");
    const currentProject = userProjects.getProjectById(addTaskIcon.dataset.projectId);

    const newTask = new Task(
      document.querySelector("#form-task-name").value,
      document.querySelector("#form-task-desc").value,
      document.querySelector("#form-task-date").value,
      document.querySelector("#form-task-priority").value,
      currentProject
    )

    userTasks.addToTaskArray(newTask);
    resetTaskForm()
    const addTaskDialog = document.querySelector("#task-dialog")
    addTaskDialog.setAttribute("class","dialog-no-display")
    addTaskDialog.close();
    loadProjectDisplay(currentProject);

  })

}


function constructPrioritySelector() {

  const projectSelector = document.createElement("select")

  let optionList = projectSelector.options
  
  prioOptions.forEach(prio => {
    optionList.add( new Option(prio, prio) )
  })
  
  projectSelector.setAttribute("id","form-task-priority");
  projectSelector.setAttribute("name","task-priority");

  return projectSelector

}


function resetTaskForm() {
  document.querySelector("#form-task-name").value = "";
  document.querySelector("#form-task-desc").value = "";
  document.querySelector("#form-task-date").value,
  document.querySelector("#form-task-priority").value
}


export {
  loadProjectDialog,
  loadTaskDialog
};