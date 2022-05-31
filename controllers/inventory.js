// Models
import Inventory from '../models/inventory.js'

// Controllers
export const getAllInventory = async (_req, res) => {
  try {
    const inventory = await Inventory.find()
    console.log(inventory)
    return res.status(200).json(inventory)
  } catch (err) {
    console.log(err)
  }
}

export const addInventory = async (req, res) => {
  try {
    console.log('req.body', req.body)
    const inventoryToAdd = await Inventory.create({ ...req.body })
    return res.status(201).json(inventoryToAdd)
  } catch (err) {
    console.log(err)
    return res.status(422).json(err)
  }
}

export const getSingleInventory = async (req, res) => {
  try {
    const { id } = req.params
    const inventory = await Inventory.findById(id)
    console.log(inventory)
    return res.status(200).json(inventory)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: 'Not Found' })
  }
}

export const updateInventory = async (req, res) => {
  try {
    const { id } = req.params
    const inventoryToUpdate = await Inventory.findById(id)
    // console.log('Check >>>>>>', inventoryToUpdate)
    Object.assign(inventoryToUpdate, req.body)
    await inventoryToUpdate.save()
    return res.status(202).json(inventoryToUpdate)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: err.message })
  }
}

export const deleteInventory = async (req, res) => {
  try {
    const { id } = req.params
    const inventoryToDelete = await Inventory.findById(id)
    await inventoryToDelete.remove()
    return res.sendStatus(204)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: err.message })
  }
}


// Comments

// Add a comment
export const addComment = async (req, res) => {
  try {
    const { id } = req.params
    // Get the inventory
    const inventory = await Inventory.findById(id)
    // Check inventory exists
    if (!inventory) throw new Error('Inventory not found')
    // Define new comment
    const newComment = { ...req.body }
    // Push newComment to Inventory.comments
    inventory.comments.push(newComment)
    // Once we've pushed newComment to Inventory.comments, we need to save to finalise the changes
    await inventory.save()
    // console.log('Inventory comments', Inventory.comments)
    return res.status(201).json(inventory)
  } catch (err) {
    console.log(err)
    return res.status(422).json({ message: err.message })
  }
}

//Update Comment
export const updateComment = async (req, res) => {
  try {
    const { id, reviewId } = req.params
    const inventory = await Inventory.findById(id)
    if (!inventory) throw new Error('Inventory was not found')
    const commentToUpdate = inventory.reviews.id(reviewId)
    // console.log(commentToUpdate)
    if (!commentToUpdate) throw new Error('No comment found!')
    Object.assign(commentToUpdate, req.body)
    await inventory.save()
    return res.status(202).json(commentToUpdate)
  } catch (err) {
    console.log(err)
    return res.status(401).json({ message: err.message })
  }
}

// Delete Review
// endpoint: /movies/:id/reviews/:reviewId
export const deleteComment = async (req, res) => {
  try {
    // Extracting both the Inventory id (id) and the commentId from the params
    const { id, commentId } = req.params
    const inventory = await Inventory.findById(id)
    if (!inventory) throw new Error('Inventory not found')
    // id() returns the first item that has a _id field matching the argument
    const commentToDelete = inventory.reviews.id(commentId)
    // Check commentToDelete is not null
    if (!commentToDelete) throw new Error('Commnet not found')
    // Remove the review
    await commentToDelete.remove()
    // Save the movie with the updated path
    await inventory.save()
    // Return response to user
    return res.sendStatus(204)
  } catch (err) {
    console.log(err)
  }
}