const {
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
  BatchGetItemCommand,
} = require("@aws-sdk/client-dynamodb");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");

const client = new DynamoDBClient({ region: "us-east-1" });

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded());

const port = process.env.API_PORT || 3005;

app.get("/watchlist", async (req, res) => {
  if (!req.query.user_id) return res.status(400).json("Incorrect params");

  const user = req.query.user_id;

  const params = {
    TableName: "Users",
    Key: {
      user_id: { S: user },
    },
  };

  const getCommand = new GetItemCommand(params);
  const response = await client.send(getCommand);

  if (!response.Item) {
    return res.status(404).json("user not found");
  }

  if (!response.Item.watchlist) {
    return res.status(404).json("user watchlist not found");
  }

  const id_list = response.Item.watchlist.SS;
  let id_list_formatted = [];

  id_list.forEach((id) => {
    id_list_formatted.push({ video_id: { S: id } });
  });

  const batchParams = {
    RequestItems: {
      Videos: {
        Keys: id_list_formatted,
      },
    },
  };

  const batchGetCommand = new BatchGetItemCommand(batchParams);
  const batchResponse = await client.send(batchGetCommand);

  return res.json(batchResponse.Responses);
});

app.post("/watchlist", async (req, res) => {
  const videoID = req.body.video_id;
  const userID = req.body.user_id;
  const getParams = {
    TableName: "Users",
    Key: {
      user_id: { S: userID },
    },
  };

  const getCommand = new GetItemCommand(getParams);
  const response = await client.send(getCommand);

  if (!response.Item) {
    return res.status(404).json("user not found");
  }

  let putItems = response.Item;

  try {
    if (!putItems.watchlist) {
      putItems.watchlist = {
        SS: [videoID],
      };
    } else if (!putItems.watchlist.SS.includes(videoID)) {
      putItems.watchlist.SS.push(videoID);
    } else {
      return res
        .status(403)
        .json("Cannot add video to watchlist multiple times");
    }

    const putParams = {
      TableName: "Users",
      Item: putItems,
    };

    const putCommand = new PutItemCommand(putParams);
    await client.send(putCommand);

    return res.status(200).json("success!");
  } catch (error) {
    return res.status(500).json(error);
  }
});

app.delete("/watchlist", async (req, res) => {
  const videoID = req.body.video_id;
  const userID = req.body.user_id;

  const getParams = {
    TableName: "Users",
    Key: {
      user_id: { S: userID },
    },
  };

  const getCommand = new GetItemCommand(getParams);
  const response = await client.send(getCommand);

  if (!response.Item) {
    return res.status(404).json("user not found");
  }

  let putItems = response.Item;

  try {
    putItems.watchlist.SS = putItems.watchlist.SS.filter(
      (item) => item !== videoID
    );
    
    if (putItems.watchlist.SS.length === 0) delete putItems["watchlist"]

    const putParams = {
      TableName: "Users",
      Item: putItems,
    };

    const putCommand = new PutItemCommand(putParams);
    await client.send(putCommand);

    return res.status(200).json("success!");
  } catch (error) {
    return res.status(500).json(error);
  }
});

app.get("/demo", async (req, res) => {
  res.json({"message": "CI/CD!!!"})
});


// Only start the server if the script is run directly
if (require.main === module) {
  app.listen(port, () => console.log(`Listening on port ${port}...`));
}

module.exports = app;  // Export the app for testing
