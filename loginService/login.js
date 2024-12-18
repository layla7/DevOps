const dotenv = require("dotenv");
dotenv.config();

console.log(process.env.API_PORT);

const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded()) 

const crypto = require("crypto");

const port = process.env.API_PORT || 3000;

app.get("/login", async (req, res) => {
    const pw = await hash(req.body.password);
    res.json({"pw": pw});
})



//Our hashing function
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
  
  //Our password verification function
  async function verify(password, hash) {
    return new Promise((resolve, reject) => {
      const [salt, key] = hash.split(":");
      crypto.scrypt(password, salt, 32, (err, derivedKey) => {
        if (err) reject(err);
        resolve(key == derivedKey.toString("hex"));
      });
    });
  }

app.listen(port, () => console.log(`Listening on port ${port}...`));
