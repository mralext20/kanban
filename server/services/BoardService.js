import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";


class BoardService {
  async getAll(userEmail) {
    let board = await dbContext.Boards.find({ creatorEmail: userEmail })
      .populate("creator", "name picture")
      .populate("lists")
      .populate({ path: "lists", populate: { path: "tasks" } })

    return board;
  }

  async getById(id, userEmail) {
    let data = await dbContext.Boards.findOne({ _id: id, creatorEmail: userEmail })
      .populate("creator", "name picture")
      .populate("lists")
      .populate({ path: "lists", populate: { path: "tasks" } });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
    return data;
  }

  async create(rawData) {
    let data = await dbContext.Boards.create(rawData);
    await data.populate("creator", "name picture")
      .populate("lists")
      .populate({ path: "lists", populate: { path: "tasks" } })
      .execPopulate()
    return data;
  }

  async edit(id, userEmail, update) {
    let data = await dbContext.Boards.findOneAndUpdate({ _id: id, creatorEmail: userEmail }, update, { new: true });
    await data.populate("creator", "name picture")
      .populate("lists")
      .populate({ path: "lists", populate: { path: "tasks" } })
      .execPopulate();
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
    return data;
  }

  async delete(id, userEmail) {
    let data = await dbContext.Boards.findOneAndRemove({ _id: id, creatorEmail: userEmail });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
  }

}


export const boardService = new BoardService();