const express = require('express');
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const app = express();
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

const dbUser = process.env.DB_USER;
const pass = process.env.DB_PASS;
const uri = process.env.DB_PATH;


let client = new MongoClient(uri, { useNewUrlParser: true });

const user = ['Asad','Puspuita','shakil','sony'];


app.get('/product',(req,res)=>{
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("onlineshopping").collection("products");
        collection.find().toArray((err,document)=>{
           if(err)
           {
               console.log(err);
           }
           else{
              res.send(document);
           }
           
        })
       
        client.close();
      });
   
}); 

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
    client = new MongoClient(uri, { useNewUrlParser: true });
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
    

const port = process.env.PORT || 3000;

app.listen({port}, ()=>console.log('Listenig to port 3000'));