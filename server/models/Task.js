import mongoose from "mongoose"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const CommentSchema = new Schema({
  body: { type: String, required: true },
  creatorEmail: { type: String, required: true },
},
  { timestamps: true, toJSON: { virtuals: true } })


CommentSchema.virtual("creator",
  {
    localField: "creatorEmail",
    ref: "Profile",
    foreignField: "email",
    justOne: true
  })


const Task = new Schema({
  body: { type: String, required: true },
  creatorEmail: { type: String, required: true },
  listId: { type: ObjectId, required: true },
  comments: [CommentSchema],
}, { timestamps: true, toJSON: { virtuals: true } })


Task.virtual("creator",
  {
    localField: "creatorEmail",
    ref: "Profile",
    foreignField: "email",
    justOne: true
  })


//CASCADE ON DELETE
Task.pre('deleteMany', function (next) {
  //lets find all the Tasks and remove them
  Promise.all([
    //something like...
    //dbContext.Task.deleteMany({ listId: this._conditions_id }),
  ])
    .then(() => next())
    .catch(err => next(err))
})

//CASCADE ON DELETE
Task.pre('findOneAndRemove', function (next) {
  //lets find all the Tasks and remove them
  Promise.all([
    // dbContext.Task.deleteMany({ boardId: this._conditions._id })
  ])
    .then(() => next())
    .catch(err => next(err))
})

export default Task