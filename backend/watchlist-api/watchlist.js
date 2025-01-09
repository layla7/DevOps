import { DynamoDBClient, ScanCommand, GetItemCommand } from "@aws-sdk/client-dynamodb";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

const client = new DynamoDBClient({ region : "us-east-1" });


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded());

const port = process.env.API_PORT || 3000;

app.get("/watchlist", async (req, res) => {
    const user = req.query.userID

    const params = {
        TableName : URLSearchParams,
        Key : {
            user_id : {S : user}
        }
    }

    const getCommand = new GetItemCommand(params);
    const response = await client.send(getCommand);

    if (!response.Item) {
        return res.sendStatus(404);
    }

    return res.send(response.Item)

})

app.post("/watchlist", async (req, res) => {
    
})


app.listen(port, () => console.log(`Listening on port ${port}...`));