import "./styles.css"
import { loadProjectDialog, loadTaskDialog } from "./formsDOM.js"
import { defaultProject } from "./projectAndTaskData.js";
import { loadProjectDisplay, loadSideBar} from "./generateDOM.js";



const pageLoad = (() => {

  loadProjectDialog(); 
  loadTaskDialog();
  loadSideBar();
  loadProjectDisplay(defaultProject);

})()




