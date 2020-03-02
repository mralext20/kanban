import mongoose from "mongoose";
import ValueSchema from "../models/Value";
import ProfileSchema from "../models/Profile";
import BoardSchema from '../models/Board';
import ListSchema from '../models/List';
import TaskSchema from "../models/Task";
class DbContext {
  Values = mongoose.model("Value", ValueSchema);
  Profile = mongoose.model("Profile", ProfileSchema);
  Boards = mongoose.model("Boards", BoardSchema);
  Lists = mongoose.model("Lists", ListSchema);

  Tasks = mongoose.model("Tasks", TaskSchema);
}

export const dbContext = new DbContext();
