const product = require('../controllers/productController.js')
const express = require('express')
const router = express.Router()
const upload = require('../middlewares/multer.middleware.js')
const CheckUserLoginOrNot = require("../middlewares/authCheck.middleware.js");


router
  .route("/add-products")
  .post(CheckUserLoginOrNot, upload.single("productImage"), product.addProduct);
router.route('/get-products').get(product.getAllProducts)



module.exports =router