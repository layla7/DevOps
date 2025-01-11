import { DynamoDBClient, ScanCommand, GetItemCommand, BatchGetItemCommand } from "@aws-sdk/client-dynamodb";
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
        TableName : "Users",
        Key : {
            user_id : {S : user}
        }
    }

    const getCommand = new GetItemCommand(params);
    const response = await client.send(getCommand);
    
    if (!response.Item.watchlist){
        return res.sendStatus(404);
    }

    const id_list = response.Item.watchlist.SS;
    let id_list_formatted = [];

    id_list.forEach(id => {
        id_list_formatted.push({"video_id" : { S : id}})
    });

    const batchParams = {
        RequestItems : {
            "Videos" :  {
                Keys : id_list_formatted
            }
        }
    }

    const batchGetCommand = new BatchGetItemCommand(batchParams);
    const batchResponse = await client.send(batchGetCommand);

    return res.json(batchResponse.Responses)

})

app.post("/watchlist", async (req, res) => {
    const videoID =  req.body.video_id;

})


app.listen(port, () => console.log(`Listening on port ${port}...`));