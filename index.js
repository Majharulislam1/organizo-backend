require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors');
const port = 3000;


app.use(express.json())
app.use(cors());


app.get('/', (req, res) => {
    res.send('Hello World!')
})


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5g7cb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

 
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        
        await client.connect();

        const Organizo = client.db("Organizo");
        


       




        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
       
        // await client.close();
    }
}
run().catch(console.dir);
