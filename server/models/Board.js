import mongoose from "mongoose";
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const Board = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  creatorEmail: { type: String, required: true }
}, { timestamps: true, toJSON: { virtuals: true } });

Board.virtual("creator",
  {
    localField: "creatorEmail",
    ref: "Profile",
    foreignField: "email",
    justOne: true
  });
Board.virtual("lists", {
  localField: "_id",
  ref: "Lists",
  foreignField: "boardId"
});

//CASCADE ON DELETE
// Board.pre('findOneAndRemove', function (next) {
//   //lets find all the lists and remove them
//   Promise.all([
//     dbContext.List.deleteMany({ boardId: this._conditions._id })
//   ])
//     .then(() => next())
//     .catch(err => next(err))
// })

export default Board;