const Products = require('../models/product.model.js')
const uploadOnCloud =require('../utils/cloudinary.js')

const addProduct = async (req, res) => {
    try {
        const { productName, price, description } = req.body
        const getProductImage = await req.file?.path
        if (!getProductImage) return res.status(400).json('oplease upload product image')
            const productImageUpload = await uploadOnCloud(getProductImage)
        if (!productImageUpload) return res.status(400).json('product image not upload on cloudinary ')
        const createdProduct = await Products.create({ productName, price, description, productImage:productImageUpload.url })
        return res.status(201).json({data:createdProduct})
    } catch (error) {
        console.error(error, 'error while creating product')
       return res.status(400).json('error while creating products')
    }
}
const getAllProducts = async (req, res) => {
    try {
        const allProducts = await Products.find({})
        return res.status(200).json(allProducts)
    } catch (error) {
        res.status(400).json('error fetching all products', error)
    }
}



module.exports = { addProduct, getAllProducts }