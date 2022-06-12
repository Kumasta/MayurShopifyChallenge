// Models
import Inventory from '../models/inventory.js'

// Controllers
export const getAllInventory = async (_req, res) => {
  try {
    const inventory = await Inventory.find()
    // console.log(inventory)
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
    // console.log(inventory)
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
    const inventory = await Inventory.findById(id)
    Object.assign(inventory, inventory.deletedComment = `Inventory deleted at ${new Date()}`)
    await inventory.delete()
    await inventory.save()
    return res.sendStatus(204)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: err.message })
  }
}

export const restoreInventory = async (req, res) => {
  try {
    const { id } = req.params
    const inventory = await Inventory.findById(id)
    Object.assign(inventory, inventory.deletedComment = '')
    await inventory.restore()
    await inventory.save()
    return res.sendStatus(204)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: err.message })
  }
}