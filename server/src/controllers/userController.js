const User = require('../models/user.model.js')
const uploadOnCloud = require('../utils/cloudinary.js')

// to generate refresh and access token function
const generateAccessAndRefreshToken = async (user_id) => {
    try {
        const getUser = await User.findById(user_id)
        const accessToken = getUser.accessGenerateToken()
        const refreshToken = getUser.refreshGenerateToken()

        getUser.refreshToken = refreshToken
        await getUser.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }
    } catch (error) {
        res.status(500).json({ message: 'Error while generating access and refresh token' })
    }
}
// options for cookies
const optionsforCookies = {
    httpOnly: false,
    secure: true,
    sameSite: 'None',
}

// register logic
const userRegiter = async (req, res) => {
    try {
        const { email, username, password } = req.body
        if ([email, username, password].some((fields) => fields?.trim() == '')) {
            return res.status(400).json('All fields are required')
        }
        const userExist = await User.findOne({
            $or: [{ email }, { username }]
        })
        if (userExist) {
            return res.status(409).json('User already exist')
        }
        const avatarImage = req.file?.path
        if (!avatarImage) return res.status(400).json('Please upload profile image')
            const avatarImageUpload = await uploadOnCloud(avatarImage)
        if (!avatarImageUpload) return res.status(400).json('profile image not upload on cloudinary ')
        const user = await User.create({ username: username.toLowerCase(), email, password , avatar:avatarImageUpload.url })
        const createdUser = await User.findById(user._id).select('-password -refreshToken')
        if (!createdUser) {
            return res.status(500).json({ msg: 'user not created by backend' })
        }
        res.status(201).json({ data: createdUser })

    } catch (error) {
        res.status(400).json({ message: 'resgisteration failed' })
    }
}


// login logic 
const userLogin = async (req, res) => {
    try {
        const { email, username, password } = req.body
        if (!email && !username) {
            return res.status(400).json('Invalid credentials')
        }
        const user = await User.findOne({ $or: [{ username }, { email }] })
        if (!user) {
            return res.status(400).json({ msg: 'User does not exist' })
        }
        if (password !== user.password) { return res.status(400).json('Invalid credentials pass') };
        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)
        const getLoginUserData = await User.findById(user._id).select('-password -refreshToken')
        return res.status(200).cookie('accessToken', accessToken, optionsforCookies).cookie('refreshToken', refreshToken, optionsforCookies).json({ message: 'User Login Successfull', data: getLoginUserData })

    } catch (error) {
        console.error(error);
        res.status(401).json('User does not login ')
    }
}

// logout user logic
const userLogout = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.user?._id, {
            $unset: {
                refreshToken: 1
            }
        }, { new: true })
        return res.status(200).clearCookie('accessToken', optionsforCookies).clearCookie('refreshToken', optionsforCookies).json({
            data: {},
            msg: 'User logout successfull'
        })
    } catch (error) {
        console.error(error);
        res.status(401).json('User logout failed ')
    }
}


// change password logic
const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body
    const user = await User.findById(req.user?._id)
    if (!user) return res.status(400).json('something went wrong')
    if (oldPassword !== user.password) return res.status(400).json('Old password is incorrect')
    user.password = newPassword
    await user.save({ validateBeforeSave: false })
    return res.status(200).json({ message: 'Your password is changed' })
}

// get login user data
const getLoginUser = async (req, res) => {
    return res.status(200).json({ userData: req.user })
}

const getAllUser = async (req, res) => {
    try {
        const allUser = await User.find({});
        res.status(200).json(allUser);
    } catch (error) {
        res.status(400).json('error fetching all users', error)
    }
}
module.exports = { userRegiter, userLogin, userLogout, changePassword, getLoginUser, getAllUser }
