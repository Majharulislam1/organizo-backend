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
 ;


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        const User = Organizo.collection('user');
        const Add_Task = Organizo.collection('add_task');


        app.post('/user', async (req, res) => {
            const data = req.body;
            const result = await User.insertOne(data);
            res.send(result);
        })

        app.post('/add_task',async(req,res)=>{
            const data = req.body;
            const result = await Add_Task.insertOne(data);
            res.send(result);
        })

        // app.post('/add_task', async (req, res) => {
        //     const data = req.body;
        //     const result = await Add_Task.insertOne(data);
            
        //     if (result.insertedId) {
              
        //         io.emit("taskAdded", data);
        //     }
        
        //     res.send(result);
        // });


        app.get('/task/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email }
            const result = await Add_Task.find(query).toArray();
            res.send(result);
          })


          app.put('/task/:id', async (req, res) => {
            const { id } = req.params;
            const { title, description, category, email } = req.body;

            const updatedTask = await Add_Task.updateOne(
                { _id: new ObjectId(id) },  
                {
                  $set: {
                    title,
                    description,
                    category,  
                    email,  
                    time_stamp: new Date(),  
                  },
                }
              );

            res.send(updatedTask);

          });


          app.delete('/task/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = Add_Task.deleteOne(query);
            res.send(result);
          })


          app.put("/task/:id", async (req, res) => {
            const taskId = req.params.id;
            const updatedTask = req.body;
            console.log(updatedTask);
            const filter = { _id: new ObjectId(taskId) };
            const updateDoc = { $set: updatedTask };
            const result = await tasksCollection.updateOne(filter, updateDoc);
            res.send(result);
          });



        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {

        // await client.close();
    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
