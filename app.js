'Access-Control-Allow-Origin', '*'
'Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT'
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const leave = require('./leaveSchema')
var cors = require('cors');

const DB = 'mongodb+srv://Ronak:GMAMR@cluster0.jxxzuw1.mongodb.net/first?retryWrites=true&w=majority';

mongoose.connect(DB,{
    useNewUrlParser : true,
}).then(()=>{
    console.log('Connectoin Succ');
    
    const app = express();

    app.use(express.json());
    app.use(bodyParser.urlencoded({extended:false}));
    app.use(cors());

    app.get('/',async(req,res)=>{
        const user = await leave.find();
        console.log("get");
        res.send(user);
    })

    app.get('/:id',async(req,res)=>{
        const user = await leave.findById(req.params.id);
        console.log("get");
        res.send(user);
    })

    app.delete('/:id',async(req,res)=>{
        const user = await leave.findById(req.params.id);
        await user.deleteOne();
        res.send(user);
    })

    app.patch('/:id',async(req,res)=>{
        const user = await leave.findById(req.params.id);

        user.id = req.body.id,
        user.Name = req.body.Name,
        user.type = req.body.type,
        user.fromDate  = req.body.fromDate ,
        user.toDate  = req.body.toDate ,
        user.emailId  = req.body.emailId,
        user.phone = req.body.phone ,
        user.department  = req.body.department

        await user.save();
        res.send(user);
    })

    app.post('/',async(req,res)=>{
        const user = new leave({
            _id : new mongoose.Types.ObjectId(),
            id : req.body.id,
            Name : req.body.Name,
            emailId : req.body.emailId,
            type : req.body.type,
            fromDate  : req.body.fromDate ,
            toDate  : req.body.toDate  ,
            department  : req.body.department  ,
            phone : req.body.phone
        });
        await user.save();
        res.send(user);
    })

    app.listen(3000,()=>{
        console.log("server Started");
    });
}).catch((err)=>console.log('Not connect'));
