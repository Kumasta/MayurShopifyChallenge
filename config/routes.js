import express from 'express'

// Controllers
import { getAllInventory, addInventory, getSingleInventory, updateInventory, deleteInventory, restoreInventory } from '../controllers/inventory.js'
import { addComment, deleteComment, restoreComment } from '../controllers/comments.js'


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
  .patch(restoreInventory)

// Comments
router.route('/inventory/:id/comments')
  .post(addComment) //✅

router.route('/inventory/:id/comments/:commentId')
  .delete(deleteComment) //✅
  .patch(restoreComment) //✅


export default router