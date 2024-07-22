const product = require('../controllers/productController.js')
const express = require('express')
const router = express.Router()
const upload = require('../middlewares/multer.middleware.js')



router.route('/add-products').post(upload.single('productImage'),product.addProduct)
router.route('/get-products').get(product.getAllProducts)



module.exports =router