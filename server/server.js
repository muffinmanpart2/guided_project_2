import express from "express";
import { promises as fs } from "fs";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const filmsName = process.env.MONGO_DB_COLLECTION_Films;
const charactersName = process.env.MONGO_DB_COLLECTION_Characters;
const planetsName = process.env.MONGO_DB_COLLECTION_Planets;
const filmsCharacterName = process.env.MONGO_DB_COLLECTION_Films_Characters;
const filmPlanetsName = process.env.MONGO_DB_COLLECTION_Film_Planets;
const app = express();
const PORT = 3000;

// Endpoint to read and send JSON file content
app.get("/api/films", async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(filmsName);
    const films = await collection.find({}).toArray();
    res.json(films);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Hmmm, no films loading");
  }
});
app.get("/api/characters", async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(charactersName);
    const characters = await collection.find({}).toArray();
    res.json(characters);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Hmmm, no characters loading");
  }
});
app.get("/api/planets", async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(planetsName);
    const planets = await collection.find({}).toArray();
    res.json(planets);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Hmmm, no planets loading");
  }
});

//GET planets by id
app.get("/api/planets/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    //console.log(id);
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(planetsName);
    const planets = await collection.findOne({"id": id});
    //console.log(id);
    res.json(planets);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Hmmm, no planets loading");
  }
});

app.get("/api/films_characters", async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(filmsCharacterName);
    const filmsCharacters = await collection.find({}).toArray();
    res.json(filmsCharacters);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Hmmm, no planets loading");
  }
});

app.get("/api/film_planets", async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(filmPlanetsName);
    const filmPlanets = await collection.find({}).toArray();
    res.json(filmPlanets);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Hmmm, no planets loading");
  }
});

//



// app.get("/socks/:color", async (req, res) => {
//   try {
//     const { color } = req.params;

//     const data = await fs.readFile("../data/socks.json", "utf8");
//     const jsonObj = JSON.parse(data);
//     const result = jsonObj.filter(
//       (sock) => sock.color.toUpperCase() === color.toUpperCase()
//     );
//     if (result.length === 0) {
//       return res.status(404).send("No socks found with that color.");
//     }
//     res.json(result);
//   } catch (err) {
//     console.error("Error:", err);
//     res.status(500).send("Hmmm, something smells... No socks for you! ☹");
//   }
// });

// // Middleware to parse JSON bodies
// app.use(express.json());

// app.post("/user", async (req, res) => {
//   try {
//     // Obligatory reference to POST Malone
//     console.log(
//       "If POST Malone were a sock, he'd be the one with the most colorful pattern."
//     );
//     // Simulate creating a user
//     const { username, email } = req.body;
//     if (!username || !email) {
//       // Bad request if username or email is missing
//       return res
//         .status(400)
//         .send({ error: "Username and email are required." });
//     }

//     // Respond with the created user information and a 201 Created status
//     res.status(201).send({
//       status: "success",
//       location: "http://localhost:3000/users/1234", // This URL should point to the newly created user
//       message: "User created successfully.",
//     });
//   } catch (err) {
//     console.error("Error:", err);
//     res.status(500).send("Hmmm, something smells... No socks for you! ☹");
//   }
// });

// app.delete("/socks/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     console.log("Deleting sock with ID:", id);
//     res.status(200).send("Sock deleted successfully");
//   } catch (err) {
//     console.error("Error:", err);
//     res
//       .status(500)
//       .send("Hmm, something doesn't smell right... Error deleting sock");
//   }
// });

// app.put("/user/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { email } = req.body;
//     console.log("Updating email for user with ID:", id);
//     res.status(200).send({
//       status: "success",
//       data: email, // This URL should point to the newly created user
//       message: "User updated successfully.",
//     });
//   } catch (err) {
//     console.error("Error:", err);
//     res
//       .status(500)
//       .send("Hmm, something doesn't smell right... Error deleting sock");
//   }
// });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
