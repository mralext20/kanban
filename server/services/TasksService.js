import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";


class TasksService {
  async getById(id, userEmail) {
    let data = await (await dbContext.Tasks.findOne({ _id: id, creatorEmail: userEmail }));
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
    await data.populate("creator", "name picture").execPopulate();
    return data;
  }

  async create(rawData) {
    let data = await dbContext.Tasks.create(rawData);
    await data.populate("creator").execPopulate()

    return data;
  }

  async edit(id, userEmail, update) {
    let data = await dbContext.Tasks.findOneAndUpdate({ _id: id, creatorEmail: userEmail }, update, { new: true });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
    await data.populate("creator", "name picture").execPopulate()
    return data;
  }

  async delete(id, userEmail) {
    let data = await dbContext.Tasks.findOneAndRemove({ _id: id, creatorEmail: userEmail });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
    await data.populate("creator", "name picture").execPopulate()
  }

}


export const tasksService = new TasksService();