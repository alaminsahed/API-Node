const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json())

const user = ['Asad','Puspuita','shakil','sony'];

// const rootCall = (req,res) =>res.send('Thank you');

app.get('/',(req,res)=>{
    res.send ("Thank you");
}); //add rootcall after coma

app.get('/user/:id',(req,res)=>{   //:id determines the dynamic value according to user arry
    const id = req.params.id;
    // console.log(id);  id is the parameter of request
    const name = user[id];
    // res.send(name);  name output as simple string
    res.send ({id,name}); // output as a json and object
})

//post [in large file page are different]

app.post('/addUser',(req,res)=>{
    // console.log(req.body);
    //save to database. database add id auto
    const user = req.body;
    user.id = 55; // add extra element in req.body
    res.send(user);
})

app.listen(3000, ()=>console.log('Listenig to port 3000'));