const express = require('express');
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/tasks')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

//USER CREATION END POINT

app.post('/users', async (req, res) => {
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
app.get('/users', async (req, res) => {

    //uses await method to send a promise
    try {
        const users = await User.find({})
        res.send(users)

    } catch (e) {
        res.status(500).send()
    }
})

//find specific user
app.get('/users/:id', async (req, res) => {
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

//TASK CREATION END POINT

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(200).send(task)
    } catch (e) {
        res.status(400).send()
    }
})

//READ CREATION ENDPOINT FOT TASKS
//read all the task
app.get('/tasks', async (req, res) => {

    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(400).send()
    }
})

//read single task
app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)
        res.send(task)

    } catch (e) {
        res.status(404).send()
    }
})


//UPDATE CREATION ENDPOINT

app.patch('/users/:id',async(req,res)=>{

    const updates=Object.keys(req.body)
    const allowed=['name','email','password','age']
    const isValidOperation=updates.every((update)=>allowed.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error:'Invalid updates'})
    }

    try{
      const user=  await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})

      if(!user){
          return res.status(404).send()
      }
      res.send(user)
    }catch(e){
        res.status(400).send(e)
    }
})

//TASK UPDATE ENDPOINT

app.patch('/tasks/:id',async(req,res)=>{

    const updates=Object.keys(req.body)
    const allowed=['description','completed']
    const isValidOperation=updates.every((update)=>allowed.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error:'Invalid updates'})
    }

    try{
      const task=  await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})

      if(!task){
          return res.status(404).send()
      }
      res.send(task)
    }catch(e){
        res.status(400).send(e)
    }
})

//DELETE USERS ENDPOINT

app.delete('/users/:id',async(req,res)=>{
    try{
        const user=await User.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }catch(e){

        res.status(500).send()
    }
})

//DELETE TASK ENDPOINT

app.delete('/tasks/:id',async(req,res)=>{
    try{
        const task=await Task.findByIdAndDelete(req.params.id)
        if(!task){
           return res.status(404).send()
        }
        res.send(task)

    }catch(e){
        res.status(500).send()
    }
})

app.listen(port, () => {
    console.log(`server is running on ${port}`);
})
