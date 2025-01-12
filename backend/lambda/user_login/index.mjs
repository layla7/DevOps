import { DynamoDBClient, GetItemCommand} from "@aws-sdk/client-dynamodb";
import crypto from "crypto";

//Lowrie woz here!

const client = new DynamoDBClient({ region: "us-east-1" });

//Password hashing and Verification code adapted from https://dev.to/farnabaz/hash-your-passwords-with-scrypt-using-nodejs-crypto-module-316k
async function verify(password, hash) {
  return new Promise((resolve, reject) => {
    const [salt, key] = hash.split(":");
    crypto.scrypt(password, salt, 32, (err, derivedKey) => {
      if (err) reject(err);
      resolve(key == derivedKey.toString("hex"));
    });
  });
}

"use strict"
export const handler = async (event, context) => {
  const requestBody = JSON.parse(event.body);
  const paramsGet = {
    TableName: "Users",
    Key: {
      user_id: { S: requestBody.username },
    },
  };


  const commandGet = new GetItemCommand(paramsGet);
  const response = await client.send(commandGet);
  if (!response.Item) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: "User does not exist" }),
    };
  }
  const password = response.Item.password.S;
  
  if(await verify(requestBody.password, password)){
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Login Successful" }),
    };
  }else{
    return {
      statusCode: 401,
      body: JSON.stringify({ message: "Password incorrect" }),
    };
  };
};
