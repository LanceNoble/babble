const { User } = require('../models/User.js')

const get = async (req, res) => {
    let user = await User.findOne({ ip: `${req.ip}` }).lean()
    if (!user) {
        user = await User.create({ ip: req.ip })
        user = await User.findOne({ ip: `${req.ip}` }).lean()
    }
    return res.status(200).json(user)
}

const post = async (req, res) => {
    try {
        await User.updateOne({ ip: `${req.ip}` }, req.body)
        res.status(201).json({ msg: "created" })
    } catch (err) {
        res.status(400).json(err)
    }
}

module.exports = {
    get,
    post
}