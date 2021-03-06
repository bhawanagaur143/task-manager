const express = require('express')
const User = require('../models/user')
const router = new express.Router()

//USER CREATION END POINT

router.post('/users', async (req, res) => {
    const user = new User(req.body);
    //uses await method to send a promise
    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }

})

//READ CREATION ENDPOINT FOR USERS
//find all users data
router.get('/users', async (req, res) => {

    //uses await method to send a promise
    try {
        const users = await User.find({})
        res.send(users)

    } catch (e) {
        res.status(500).send()
    }
})

//find specific user
router.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    //uses await method to send a promise
    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(400).send()
    }
})

//UPDATE CREATION ENDPOINT

router.patch('/users/:id', async (req, res) => {

    const updates = Object.keys(req.body)
    const allowed = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowed.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' })
    }

    try {

        const user = await User.findById(req.params.id)

        // update dynamically
        updates.forEach((update) => user[update] = req.body[update])

        await user.save()

        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})
//DELETE USERS ENDPOINT

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {

        res.status(500).send()
    }
})

module.exports = router