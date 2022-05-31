import express from 'express'

// Controllers
import { getAllInventory, addInventory, getSingleInventory, updateInventory, deleteInventory, addComment, deleteComment } from '../controllers/inventory.js'


const router = express.Router()

// Inventory
router.route('/inventory')
  .get(getAllInventory) //✅
  .post(addInventory) //✅

// Single Inventory
router.route('/inventory/:id')
  .get(getSingleInventory) //✅
  .put(updateInventory) //✅
  .delete(deleteInventory) //✅

// Comments
router.route('/inventory/:id/comments')
  .post(addComment) //✅

router.route('/inventory/:id/comments/:commentId')
  .delete(deleteComment)
// .delete(restoreComment)


export default router