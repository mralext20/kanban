import mongoose from "mongoose"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const CommentSchema = new Schema({
  body: { type: String, required: true },
  creatorEmail: { type: String, required: true }
})


CommentSchema.virtual("creator",
  {
    localField: "creatorEmail",
    ref: "Profile",
    foreignField: "email",
    justOne: true
  })


const List = new Schema({
  body: { type: String, required: true },
  creatorEmail: { type: String, required: true },
  taskId: { type: ObjectId, ref: 'Board', required: true },
  comments: [CommentSchema],
}, { timestamps: true, toJSON: { virtuals: true } })


List.virtual("creator",
  {
    localField: "creatorEmail",
    ref: "Profile",
    foreignField: "email",
    justOne: true
  })

List.virtual("tasks",
  {
    localField: "id",
    ref: "Tasks",
    foreignField: "listId",
  })


//CASCADE ON DELETE
List.pre('deleteMany', function (next) {
  //lets find all the lists and remove them
  Promise.all([
    //something like...
    //dbContext.Task.deleteMany({ listId: this._conditions_id }),
  ])
    .then(() => next())
    .catch(err => next(err))
})

//CASCADE ON DELETE
List.pre('findOneAndRemove', function (next) {
  //lets find all the lists and remove them
  Promise.all([
    // dbContext.Task.deleteMany({ boardId: this._conditions._id })
  ])
    .then(() => next())
    .catch(err => next(err))
})

export default List