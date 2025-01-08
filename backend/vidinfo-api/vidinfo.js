const dotenv = require("dotenv");
dotenv.config();

//console.log(process.env);

const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded());

const port = process.env.API_PORT || 3000;

app.get("/test", async (req, res) => {
    res.json({"message" : "CI/CD Man!!!!"});
})



app.listen(port, () => console.log(`Listening on port ${port}...`));
