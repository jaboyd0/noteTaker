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
const mainDir = path.join(__dirname, "/public");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));



// Routes
// =============================================================

app.get("/notes", function(req, res) {
  res.sendFile(path.join(mainDir, "notes.html"));
});

app.get("/api/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/db/db.json"));
});

app.get("/api/notes/:id", function(req, res) {
  let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  res.json(savedNotes[Number(req.params.id)]);
});

app.get("*", function(req, res) {
  res.sendFile(path.join(mainDir, "index.html"));
});

app.post("/api/notes", function(req, res) {
  let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let newNote = req.body;
  let uniqueID = (savedNotes.length).toString();
  newNote.id = uniqueID;
  savedNotes.push(newNote);

  fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
  console.log("Note saved to db.json. Content: ", newNote);
  res.json(savedNotes);
})

app.delete("/api/notes/:id", function(req, res) {
  let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let noteID = req.params.id;
  let newID = 0;
  
  savedNotes = savedNotes.filter(currNote => currNote.id != noteID);
  
  for (currNote of savedNotes) {
      currNote.id = newID.toString();
      newID++;
  }

  fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
  res.json(savedNotes);
})


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
