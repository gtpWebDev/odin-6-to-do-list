import NotePlusIcon from "./note-plus.svg"
import PlusIcon from "./plus.svg"
import { testData } from "./testDataLoading";

// Note, I am using diffeent method of DOM consstruction for practice.


function pageLoad() {

  loadSideBar();
  loadProjectDisplay();

}

function loadSideBar() {

  const sidebar = document.querySelector("#sidebar");
  
  const addProject = constructSidebarItem("Add Project",NotePlusIcon)
  sidebar.appendChild(addProject);

  const addTask = constructSidebarItem("Add Task",PlusIcon)
  sidebar.appendChild(addTask);

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

function loadProjectDisplay() {

  console.table(testData.taskArray)
  console.table(testData.projectArray)

  const sidebar = document.querySelector("#project-display");

  

//   <div>
//   <p id="project-title">Project Select Project:</p>
//   <input type="text">
// </div>
// <h2 id="project-title">Project Title</h2>
// <h4 id="project-description">Project Description</h4>
// <div id="project-panel">
//   <div id="show-tasks-container">
//     <p>Show complete tasks?</p>
//     <input type="text">
//   </div>
//   <div id="task-container">
//     <div class="indiv-task">Indiv task</div>
//     <div class="indiv-task">Indiv task</div>
//     <div class="indiv-task">Indiv task</div>
//   </div>

// </div>
  


}


export {
  pageLoad,
};