import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";


class CommentsService {
  async getById(id) {
    let data = await dbContext.Tasks.findOne({ "comments._id": id });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
    let comment = data.comments.filter(c => c.id == id)
    return comment;
  }

  async create(rawData) {
    if (!rawData.taskId) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
    let data = await dbContext.Tasks.findOne({ _id: rawData.taskId });
    let comment = data.comments.create(rawData);
    await data.save()
    return comment;
  }

  async edit(id, userEmail, update) {
    let data = await (await dbContext.Tasks.findOne({ "comments._id": id, creatorEmail: userEmail })).updateOne(update, { new: true });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
    return data;
  }

  async delete(id, userEmail) {
    let data = await dbContext.Tasks.findOne({ "comments._id": id, creatorEmail: userEmail }).remove();
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
  }

}


export const commentsService = new CommentsService();