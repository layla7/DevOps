import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import dotenv from "dotenv";
import express from "express";

const client = new DynamoDBClient({ region : "us-east-1" });


dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded());

const port = process.env.API_PORT || 3000;

app.get("/test", async (req, res) => {
    res.json({"message" : "Successful"});
})

app.get("/videos", async(req, res) => {
    const params = {
        TableName : "Videos",
    }

    const scanCommand = new ScanCommand(params);
    const response = await client.send(scanCommand).Item;

    res.send(response);
})



app.listen(port, () => console.log(`Listening on port ${port}...`));