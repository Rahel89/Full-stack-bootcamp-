const express = require('express');
const app = express();
const port = 3000;

const movies = [
    "The Shawshank Redemption",
    "The Godfather",
    "The Dark Knight",
    "Pulp Fiction",
    "Forrest Gump",
    "Inception",
    "The Matrix",
    "Fight Club",
    "The Lord of the Rings: The Return of the King",
    "The Empire Strikes Back"
];

// Movie endpoint
app.get("/movie", async (req, res) => {
    try {
        const { movieName } = req.query; 
    
        if (!movieName) {
            return res.status(400).json({ message: 'Movie name is required' });
        }
    
        const foundMovies = []; 
    
        movies.forEach(movie => {  
            if (movie.includes(movieName)) {
                foundMovies.push(movie);
            }
        });
    
        if (foundMovies.length === 0) { 
            return res.status(404).json({ message: 'No movies found' });
        } else {
            // Respond with the found movies
            return res.status(200).json({ message: `Movies found: ${foundMovies}` }); 
        }
        
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// POST to add a movie
app.post("/movie", (req, res) => {
    const { movieName } = req.body;

    if (!movieName) {
        return res.status(400).json({ message: 'Movie name is required' });
    }

    // Check if the movie already exists
    if (movies.includes(movieName)) {
        return res.status(409).json({ message: 'Movie already exists' });
    }

    // Add the movie
    movies.push(movieName);
    return res.status(201).json({ message: 'Movie added successfully' });
});
// PUT to edit a movie
app.put("/movie", (req, res) => {
    const { oldMovieName, newMovieName } = req.body;

    if (!oldMovieName || !newMovieName) {
        return res.status(400).json({ message: 'Both old and new movie names are required' });
    }

    // Check if the movie to be edited exists
    const movieIndex = movies.indexOf(oldMovieName);
    if (movieIndex === -1) {
        return res.status(404).json({ message: 'Movie does not exist' });
    }

    // Update the movie name
    movies[movieIndex] = newMovieName;
    return res.status(200).json({ message: 'Movie updated successfully' });
});







app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
