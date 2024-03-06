import { Task } from "./Task"
import { Project } from "./Project"

const testData = (function() { // module pattern

  let projectArray = []
  for (let i = 0; i < 5; i++) {

    const newProject = new Project(`Project ${i}`, `Description ${i}`)
    projectArray.push(newProject)

  }

  let taskArray = []
  for (let i = 0; i < 5; i++) {

    const newTask = new Task(`Task ${i}`, `Description ${i}`, new Date(), "Top priority!")
    taskArray.push(newTask)

  }

  return { taskArray, projectArray }

})()


export {
  testData
};