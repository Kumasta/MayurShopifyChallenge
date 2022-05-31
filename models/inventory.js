import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import mongooseDelete from 'mongoose-delete'


const { Schema } = mongoose


///Comment
const commentSchema = new Schema({
  text: { type: String, required: true, maxlength: 300 },
  // isDeleted: { type: Boolean, required: true, default: false },
}, {
  timestamps: true,
})


const inventorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true, maxlength: 500 },
  stock: { type: Number, required: true, default: 0, min: 0 },
  imageUrl: { type: String, required: false },
  comments: [commentSchema],
}, {
  timestamps: true,
})


inventorySchema.set('toJSON', {
  virtuals: true,
})

commentSchema.set('toJSON', {
  virtuals: true,
})

// Plugins
inventorySchema.plugin(uniqueValidator)
commentSchema.plugin(mongooseDelete)

export default mongoose.model('Inventory', inventorySchema)