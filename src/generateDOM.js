import NotePlusIcon from "./note-plus.svg"
import PlusIcon from "./plus.svg"


function pageLoad() {

  loadSideBar();


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

export {
  pageLoad
};