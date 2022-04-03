// @route POST api/auth/login
// @desc login user 
// @access Public
router.post('/login', async (req, res) => {
    const {username, password} = req.body

    // Simple valication
    if (!username || !password)
    return res
    .status(400)
    .json({success: false, message: 'Missing username and/or password'})
    
    try {
        // check for existing user
        const user = await User.findOne({ username })
        if(!user)
        return res.status(400).json({success: false, message:'Incorrect username or password'})
        
        // username found
        const passwordValid = await argon2.verify(user.password, password)
        if(!passwordValid)
        return res.status(400).json({success: false, message:'Incorrect username or password'})

        // Return token 
        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.ACCESS_TOKEN_SECRET
        )
        
        res.json({success: true, message: 'User login in successfully', accessToken})
    
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message:'Internal server error'})
    }
})

module.exports = router