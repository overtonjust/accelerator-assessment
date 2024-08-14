const express = require("express");
const animes = express.Router();

// Queries
const {
  getAllAnimes,
  getOneAnime,
  createOneAnime,
  updateOneAnime,
  deleteOneAnime,
} = require("../queries/animes");

// Validations
const {
  checkName,
  checkNameLength,
  checkDescription,
  checkDescriptionLength
} = require('../validation/animeValidation');

/* Instructions: Use the following prompts to write the corresponding routes. **Each** route should be able to catch server-side and user input errors(should they apply). Consult the test files to see how the routes and errors should work.*/
//Write a GET route that retrieves all animes from the database and sends them to the client with a 200 status code

animes.get('/', async (req, res) => {
  const animeList = await getAllAnimes();

  if(animeList[0]) {
    res.status(200).json(animeList)
  } else {
    res.status(500).json({error: "Server error"})
  }
});

animes.get('/:id', async (req, res) => {
  const { id } = req.params;
  const animeFound = await getOneAnime(id);

  if(animeFound.id) {
    res.status(201).json(animeFound)
  } else {
    res.status(500).json({error: "Anime not found"})
  }
})

//your response body should look this(ignore the length of the array):
// [
//   {
//       "id": 1,
//       "name": "One Piece",
//       "description": "One Piece is a Japanese manga series written and illustrated by Eiichiro Oda. It has been serialized in Shueishas shōnen manga magazine Weekly Shōnen Jump since July 1997, with its individual chapters compiled into 107 tankōbon volumes as of November 2023."
//   },
//   {
//       "id": 2,
//       "name": "Naruto",
//       "description": "Naruto is a Japanese manga series written and illustrated by Masashi Kishimoto. It tells the story of Naruto Uzumaki, a young ninja who seeks recognition from his peers and dreams of becoming the Hokage, the leader of his village."
//   }
// ]


animes.post('/', checkName, checkNameLength, checkDescription, checkDescriptionLength, async (req, res) => {
  const { name, description } = req.body;
  const newAnime = await createOneAnime(name, description);

  if(newAnime.id) {
    res.status(201).json(newAnime)
  } else {
    res.status(500).json({error: "Server error"})
  }
})

//Write a POST route that takes user provided data from the request body and creates a new anime in the database. The route should respond with a 201 status code and the new anime.
//if the request body does not contain a name and description, or if the body's name or description have no length, respond with an error
//your response body should look this:
// {
//   "id": 20,
//   "name": "test",
//   "description": "this is anime"
// }


animes.put('/:id',checkName, checkNameLength, checkDescription, checkDescriptionLength, async (req, res) => {
  const { id } = req.params;
  const updatedAnime = await updateOneAnime(id, req.body);

  if(updatedAnime.id) {
    res.status(200).json(updatedAnime)
  } else {
    res.status(400).json({error: "Anime not found"})
  }
});


//Write a PUT route that takes user provided data from the request body and updates an existing anime in the database. The route should respond with a 200 and the updated anime. The route should be able to handle a non-existent anime id.
//if the request body does not contain a name and description, or if the body's name or description have no length, respond with an error
//your response body should look this:
// {
//   "id": 20,
//   "name": "test1",
//   "description": "this is anime as well"
// }

animes.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deletedAnime = await deleteOneAnime(id);

  if(deletedAnime.id) {
    res.status(200).json(deletedAnime)
  } else {
    res.status(400).json({error: "Anime not found"})
  }
});

//Write a DELETE route that deletes a single anime by id (provided by the client as a request param) from the database and responds with a 200 and the deleted anime data. The route should be able to handle a non-existent anime id.
//your response body should look this:
// {
//   "id": 20,
//   "name": "test1",
//   "description": "this is anime as well"
// }
module.exports = animes;
