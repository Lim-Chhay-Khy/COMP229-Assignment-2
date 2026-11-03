import express from 'express'
import ctrl from '../controllers/contact.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()

// Contact submission is public for portfolio visitors; changes and deletes require JWT
router
  .route('/api/contacts')
  .get(ctrl.list)
  .post(ctrl.create)
  .delete(authCtrl.requireSignin, ctrl.removeAll)

router
  .route('/api/contacts/:id')
  .get(ctrl.read)
  .put(authCtrl.requireSignin, ctrl.update)
  .delete(authCtrl.requireSignin, ctrl.remove)

export default router
