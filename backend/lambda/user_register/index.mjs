import { DynamoDBClient, PutItemCommand, GetItemCommand} from "@aws-sdk/client-dynamodb";
import crypto from "crypto";

const client = new DynamoDBClient({ region: "us-east-1" });

async function hash(password) {
  return new Promise((resolve, reject) => {
    // generate random 16 bytes long salt
    const salt = crypto.randomBytes(16).toString("hex");

    crypto.scrypt(password, salt, 32, (err, derivedKey) => {
      if (err) reject(err);
      resolve(salt + ":" + derivedKey.toString("hex"));
    });
  });
}

"use strict";
export const handler = async (event, context) => {
  const requestBody = JSON.parse(event.body);

  const paramsGet = {
    TableName: "Users",
    Key: {
      user_id: { S: requestBody.username },
    },
  };
  const commandGet = new GetItemCommand(paramsGet);
  if ((await client.send(commandGet)).Item) {
    const response = {
      statusCode: 400,
      body: JSON.stringify({"message" : 'User already exists'}),
    };
    return response;
  }

  // TODO implement
  const password = await hash(requestBody.password);
  try {
    const params = {
      TableName: "Users",
      Item: {
        user_id: { S: requestBody.username },
        password: { S: password }
      },
    };

    const command = new PutItemCommand(params);
    await client.send(command);

    const response = {
      statusCode: 201,
      body: JSON.stringify({"message" : 'Success'}),
    };
    return response;
  } catch (error) {
    const response = {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
