const { Story } = require('../models/Story.js')

const get = async (req, res) => {
    let story = await Story.findOne({ existence: true }).lean()
    if (!story) {
        await Story.create({})
        story = await Story.findOne({ existence: true }).lean()
    }
    return res.status(200).json(story)
}

const post = async (req, res) => {
    try {
        await Story.updateOne({ existence: true }, req.body)
        res.status(201).json({msg: "created"})
    } catch (err) {
        res.status(400).json(err)
    }
}

module.exports = {
    get,
    post
}