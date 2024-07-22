const {v2:cloudinary} = require('cloudinary')
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET_KEY
});

const uploadOnCloud =async (filePath)=>{
    try {
        if(!filePath) return null
        const response= await cloudinary.uploader.upload(filePath,{
            resource_type:'auto'
        })
        return response
    } catch (error) {
        fs.unlinkSync(filePath)
        console.error(`cloudinary file unlink ${error} `)
        return null
    }
}

module.exports = uploadOnCloud