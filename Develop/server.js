// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");
var db = require("./db/db.json")

var count = 0

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));



// Routes
// =============================================================

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname,"public/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname,"public/notes.html"));
});

app.get("/api/notes", function(req, res) {
  res.json(db);
});

app.post("/api/notes", function(req, res) {
  console.log(req.body);

  count++
  req.body.id = count

  db.push(req.body);

  
  fs.writeFile("./db/db.json", JSON.stringify(db), function(){
    res.json(req.body)
  });
});

app.delete("/api/notes/:id", function(req, res) {
// {
//   headers: {...},
//   url: "/api/notes/2",
//   ...console,
//   params: {
//     id: "2"
//   },
//   body:{},
//   query:{}
// }
//   console.log(req.params.id)

// var newdb = db.filter(!note.id)

delete 

})



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
