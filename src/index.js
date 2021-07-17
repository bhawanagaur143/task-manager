const express=require('express');
require('./db/mongoose')
const User=require('./models/user')
const Task=require('./models/tasks')

const app=express();
const port= process.env.PORT || 3000;

app.use(express.json())

//USER CREATION END POINT

app.post('/users',(req,res)=>{
    const user=new User(req.body);
    user.save().then(()=>{
        res.send(user)
    }).catch((e)=>{
        res.status(400).send(e)
    })
})

app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})

//TASK CREATION END POINT

app.post('/tasks',(req,res)=>{
    const task=new Task(req.body)
    task.save().then(()=>{
        res.send(task)
    }).catch((e)=>{
        res.status(400).send(e)
    })
})