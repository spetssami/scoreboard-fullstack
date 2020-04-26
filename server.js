const express = require('express'),
      app = express(),
      path = require('path'),
      cors = require('cors'),
      bodyParser = require('body-parser')

      
const publicPath = path.join(__dirname, './build')
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(publicPath))


let db = [
    {"name": "Andy", "score": 123},
    {"name": "Mikko", "score": 1011},
    {"name": "Miro", "score": 570},
    {"name": "Mikke", "score": 812},
    {"name": "Samuel", "score": 400},
    {"name": "Kalle", "score": 581},
    {"name": "Joonas", "score": 42},
    {"name": "Riku", "score": 962},
    {"name": "Tomi", "score": 987},

]

app.get("/api/data", (req, res) => {
    const data = JSON.parse(JSON.stringify(db));
    res.send(data);
})

app.post("/api/newScore", (req, res) => {
    const {name, score} = req.body;
    if(name == undefined || score == undefined){
       return res.status(502).json("Failed to add score")
    }
    const data = {"name": name, "score": parseInt(score.trim())}
    db.push(data);

    const jsonData = JSON.parse(JSON.stringify(db));
    return res.status(200).json(jsonData)
})

app.listen(8080, (req, res) => {
    console.log("piippiip")
})