import express from 'express'
import ctrl from '../controllers/qualification.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()

// Reads are public; writes require a signed-in user (JWT)
router
  .route('/api/qualifications')
  .get(ctrl.list)
  .post(authCtrl.requireSignin, ctrl.create)
  .delete(authCtrl.requireSignin, ctrl.removeAll)

router
  .route('/api/qualifications/:id')
  .get(ctrl.read)
  .put(authCtrl.requireSignin, ctrl.update)
  .delete(authCtrl.requireSignin, ctrl.remove)

export default router
