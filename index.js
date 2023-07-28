import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";

const app = express();
const PORT = process.env.PORT

const MONGO_URL = process.env.MONGO_URL;
const client = new MongoClient(MONGO_URL);
await client.connect();
console.log("MONGODB Started")

//! Must use cors and express.json()
app.use(cors())
app.use(express.json())


app.get("/", function (req, res) {
  res.json({
    Mobile_List:"/mobile"
  });
});

app.get("/mobile", async function (req, res) {
    const mobile = await client
    .db("b42wd2").collection('mobile').find({}).toArray();
  
    res.send(mobile);
})

app.post("/mobile", async function (req, res) {
    const data = req.body;
    const result = await client
    .db("b42wd2").collection('mobile').insertMany(data);
    res.send(result);
})

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));