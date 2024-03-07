import { v4 as uuidv4 } from "uuid";


class Project {

  constructor(name, description) {
    this.name = name;
    this.description = description;
    this.projId = uuidv4()
  }

}

export {
  Project as default,
};