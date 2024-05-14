import express from "express";
import { promises as fs } from "fs";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import { pipeline } from "stream";
import { promises } from "dns";

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
// Middleware to parse JSON bodies
app.use(express.json());
// app.use(cors());
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
    const planets = await collection.findOne({ id: id });
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

//GET films based on planets
app.get("/api/planets/:id/films", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collectionFilmPlanets = db.collection(filmPlanetsName);
    const filmPlanets = await collectionFilmPlanets
      .find({ planet_id: id })
      .toArray();

        const collectionFilms = db.collection(filmsName);
        const films = await Promise.all(filmPlanets.map(
            (planet) => collectionFilms.findOne({"id": parseInt(planet.film_id)})

        ))

        res.json(filmPlanets);
      } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, no planets loading");
      }
})


//

app.get("/api/films/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(filmsName);
    const films = await collection.findOne({ id: id });
    res.json(films);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Hmmm, no films for this ID");
  }
});
app.get("/api/characters/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(charactersName);
    const characters = await collection.findOne({ id: id });
    res.json(characters);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Hmmm, no Characters for this ID");
  }
});
app.get("/api/films/:id/characters", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collectionFilms = db.collection(filmsCharacterName);
    const filmsCharacter = await collectionFilms
      .find({ film_id: id })
      .toArray();
    const collectionCharacters = db.collection(charactersName);
    const characters = await Promise.all(
      filmsCharacter.map((film) =>
        collectionCharacters.findOne({ id: parseInt(film.character_id) })
      )
    );
    const characterNames = characters.map((character) => character.name);
    res.json(characterNames);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Hmmm, no films loading");
  }
});
app.get("/api/characters/:id/films", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collectionFilms = db.collection(filmsCharacterName);
    const filmsCharacter = await collectionFilms
      .find({ character_id: id })
      .toArray();
    const collectionfilms = db.collection(filmsName);
    const films = await Promise.all(
      filmsCharacter.map((film) =>
        collectionfilms.findOne({ id: parseInt(film.film_id) })
      )
    );
    const filmsNames = films.map((film) => film.title);
    res.json(filmsNames);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Hmmm, no films loading");
  }
});
app.get("/api/films/:id/planets", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collectionFilmPlanets = db.collection(filmPlanetsName);
    const filmPlanets = await collectionFilmPlanets
      .find({ film_id: id })
      .toArray();
    console.log(filmPlanets);
    const collectionPlanets = db.collection(planetsName);
    const planets = await Promise.all(
      filmPlanets.map((film) =>
        collectionPlanets.findOne({ id: parseInt(film.planet_id) })
      )
    );
    const planetName = planets.map((planet) => planet.name);
    res.json(planetName);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Hmmm, no films loading");
  }
});
app.get("/api/planets/:id/characters", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(charactersName);
    const characters = await collection.find({homeworld:id}).toArray();
    const characterName = characters.map((character) => character.name);
    res.json(characterName);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Hmmm, no planets loading");
  }
});

// Middleware to parse JSON bodies
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
