const express = require('express');
require('dotenv').config()
const mongoose = require('mongoose')
const bodyParser = require("body-parser");

const cors = require('cors')
const router = require('./routes/index')
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const MONGO_URI = process.env.MONGO_URI;
mongoose
   .connect(MONGO_URI, { useNewUrlParser: true })
   .then(() => console.log("Mongo Connection successful"))
   .catch(err => console.log(err));

mongoose.set("useFindAndModify", false);
mongoose.Promise = global.Promise;


app.use(cors())
app.get('/', (req, res) => {
     res.send('Hello World!') 
});

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
       res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
 }

const PORT = process.env.PORT || 3001

app.listen(PORT, function() { console.log(`Server listening on port ${PORT}`) });