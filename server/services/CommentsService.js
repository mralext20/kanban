import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";


class CommentsService {
  async getById(id) {
    let data = await dbContext.Tasks.findOne({ "comments._id": id });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this comment");
    }
    let comment = data.comments.filter(c => c.id == id)
    return comment;
  }

  async create(rawData) {
    if (!rawData.taskId) {
      throw new BadRequest("Invalid ID or you do not own this comment");
    }
    let data = await dbContext.Tasks.findOne({ _id: rawData.taskId });
    let comment = data.comments.create(rawData);
    await data.save()
    return comment;
  }

  async edit(id, userEmail, update) {
    let data = await dbContext.Tasks.findOne({ "comments._id": id, creatorEmail: userEmail });
    let comments = data.comments
    let commentIndex = comments.findIndex(c => c.id == id)
    if (commentIndex === -1) {
      throw new BadRequest("Invalid ID or you do not own this comment");
    }
    comments[commentIndex].body = update.body || comments[commentIndex].body;
    await data.save()
    return comments[commentIndex];
  }

  async delete(id, userEmail) {
    let data = await dbContext.Tasks.findOne({ "comments._id": id, creatorEmail: userEmail })
    data.comments.pull(id)
    data.save()
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this comment");
    }
  }

}


export const commentsService = new CommentsService();