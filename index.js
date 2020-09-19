const express = require('express');
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient;

const app = express();
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

const dbUser = 'dbUser';
const pass = '1viB7L9dgwvDSXcx';
const uri = "mongodb+srv://dbUser:1viB7L9dgwvDSXcx@cluster0.m8yu3.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

const user = ['Asad','Puspuita','shakil','sony'];


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

//post
app.post('/addProduct',(req,res)=>{
    const product = req.body;
    console.log(product);
      //mongodb connection
        client.connect(err => {
            const collection = client.db("onlineshopping").collection("products");
            collection.insertOne(product,(err,result)=>{
               if(err)
               {
                   console.log(err);
               }
               else{
                res.send(result.ops[0] );
               }
               
            })
           
            client.close();
          });
       
    });
    



app.listen(3000, ()=>console.log('Listenig to port 3000'));