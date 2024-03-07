import Project from "./Project.js"
import { userProjects } from "./projectAndTaskData.js"
import { loadSideBar } from "./generateDOM.js"

function loadProjectDialog() {

  const addProjectDialogLoc = document.querySelector("#project-dialog-loc")

  const constructedDOM = `
    <dialog id="add-project-dialog-no-display">
      <h2>Please provide the project details...</h2>
      <!-- method dialog necessary when form located in a dialog -->
      <form id="add-project-form" action="" method="dialog">
        <div id="form-inputs">
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
    const addProjectDialog = document.querySelector("#add-project-dialog")
    addProjectDialog.setAttribute("id","add-project-dialog-no-display")
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
    const addProjectDialog = document.querySelector("#add-project-dialog")
    addProjectDialog.setAttribute("id","add-project-dialog-no-display")
    //addProjectDialog.removeAttribute("id","add-project-dialog")
    addProjectDialog.close();
    loadSideBar()

  })

}

function resetProjectForm() {
  document.querySelector("#form-project-name").value = "";
  document.querySelector("#form-project-desc").value = "";
}



function loadTaskDialog() {

  const pageBody = document.querySelector("#task-dialog-loc")

  const constructedDOM = `
    <dialog id="add-project-dialog-no-display">
      <h2>Please provide the project details...</h2>
      <!-- method dialog necessary when form located in a dialog -->
      <form id="add-project-form" action="" method="dialog">
        <div id="form-inputs">
          <label class="form-label" for="project-name">Project Name:</label>
          <input class="form-input" type="text" name="project-name" placeholder="e.g. House Chores" required>
          <label class="form-label" for="project-desc">Project Description:</label>
          <input class="form-input" type="text" name="project-desc" placeholder="more details here..." required>


          <label class="form-label" for="book-author">Author:</label>
          <input class="form-input" type="text" id="form-book-author" name="book-author" placeholder="J R R Tolkein" required>
          <label class="form-label" for="book-read-or-not">Read this yet?</label>
          <input class="form-input" type="checkbox" id="form-book-read-or-not" name="book-read-or-not">
          <label class="form-label" for="book-synopsis">Synopsis:</label>
          <input class="form-input" type="text" id="form-book-synopsis" name="book-synopsis">
        </div>
        <div id="form-buttons">
          <button id="add-project-submit" class="form-button" type="submit">Submit</button>
          <button id="add-project-cancel" class="form-button" type="cancel" autofocus>Cancel</button>
        </div>
      </form>
    </dialog>
  `
  pageBody.innerHTML = constructedDOM;



  // // Add button functionality  - add button, then submit and cancel on the modal dialog

  // let addBookCancel = document.querySelector("#add-book-cancel")
  // addBookCancel.addEventListener("click", (event) => {
  //   // prevent usual behaviour of form submit to send information to a server
  //   event.preventDefault();
  //   // return the modal to display: none
  //   addBookDialog.setAttribute("id","add-book-dialog-no-display")
  //   addBookDialog.close();
  //   addBookButton.focus();
  // })

  // let addBookForm = document.querySelector("#add-book-form")
  // addBookForm.addEventListener("submit", (event) => {
  //   // prevent usual behaviour of form submit to send information to a server
  //   event.preventDefault();
  //   addBookToLibrary(
  //     document.querySelector("#form-book-name").value,
  //     document.querySelector("#form-book-author").value,
  //     document.querySelector("#form-book-read-or-not").checked,
  //     document.querySelector("#form-book-synopsis").value,
  //   )
  //   resetForm()
  //   addBookDialog.removeAttribute("id","add-book-dialog")
  //   addBookDialog.close();
  //   addBookButton.focus();
  //   displayBooksWithMap()
  // })

}



export {
  loadProjectDialog,
  loadTaskDialog
};