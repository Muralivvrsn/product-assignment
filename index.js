const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
const databaseId = 'AlphaTest';
const collectionId = 'Job';


//middleware
const app = express();
app.use(cors());
app.use(express.json());


//mongodb url
const mongoClientURI =
  "mongodb://forwardappdb:aXWqHXoAq110hcDseuIk32gmeDiefOYwQwELCXYGchRHFvOjWj40wFQ0OHhTcBdTp66idpLoGJ32ACDbjm0auw%3D%3D@forwardappdb.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@forwardappdb@";


let collection;
//function to connect mongodb
async function connectToMongoDB() {
  try {
    const client = new MongoClient(mongoClientURI);
    await client.connect();
    console.log("Connected to MongoDB");
    const database = client.db(databaseId);
    collection = database.collection(collectionId);
  } catch (err) {
    console.error("Error:", err);
  }
}



// Call the function to connect to MongoDB
connectToMongoDB();



app.get("/", async (req, res) => {
  const {skipValue} = req.query;
  console.log(req.query)
    try {
        const documents = await collection.find().skip(parseInt(skipValue)).limit(10).toArray();
        res.json(documents);
      } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: "An error occurred" });
      }
});

app.get("/:id", async(req,res)=>{
  const {id} = req.params;
  console.log(id)
  try{
    const document = await collection.findOne({_id: new ObjectId(id)});
    console.log(document)
    res.json(document)
  }
  catch(err){
    console.log(err)
    res.json(err)
  }
})

app.listen(4000, () => {
  console.log("Listening on port 4000");
});
