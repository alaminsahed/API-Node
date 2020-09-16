const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

const user = ['Asad','Puspuita','shakil','sony'];

// const rootCall = (req,res) =>res.send('Thank you');

app.get('/',(req,res)=>{
    res.send ("Thank you");
}); //add rootcall after coma

app.get('/fruits/banana',(req,res)=>{
    res.send({fruit:'banana',quantity:1000, price:10000})
})

app.get('/user/:id',(req,res)=>{   //:id determines the dynamic value according to user arry
    const id = req.params.id;
    // console.log(id);  id is the parameter of request
    const name = user[id];
    // res.send(name);  name output as simple string
    res.send ({id,name}); // output as a json and object
})
app.listen(3000, ()=>console.log('Listenig to port 3000'));