const express = require('express')
const router = express.Router()
const profile = require('../controllers/userController.js')
const CheckUserLoginOrNot = require('../middlewares/authCheck.middleware.js')
const upload = require('../middlewares/multer.middleware.js')


router.route('/register').post(upload.single('avatar'),profile.userRegiter)
router.route('/login').post(profile.userLogin)
router.route('/logout').post(CheckUserLoginOrNot,profile.userLogout)
router.route('/change-password').post(CheckUserLoginOrNot, profile.changePassword)
router.route('/getUser').get(CheckUserLoginOrNot, profile.getLoginUser)
router.route('/getAllUser').get(profile.getAllUser)

module.exports = router