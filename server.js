const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'project', 'public')));

const db = new sqlite3.Database(path.join(__dirname, 'project', 'db', 'imdb.db'));

app.get('/api/movies', (req, res) => {
    db.all('select * from movie', [], (err, rows) => {
        if (err) {
            console.err(err);
            res.status(500).json({ error: 'Error en la lectura de la DB' })
        } else {
            res.json(rows);
        }
    })
})

app.get('/api/movies/:id/actors', (req, res) => {
    const movieId = req.params.id;
    const query = `
    SELECT a.ActorId, a.Name
    FROM Casting c
    JOIN Actor a ON a.ActorId = c.ActorId
    WHERE c.MovieID = ?
    ORDER BY c.Ordinal`;

    db.all(query, [movieId], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error en la base de datos' });
        }
        res.json(rows);
    });
});

app.get('/api/actors/:id/movies', (req, res) => {
    const actorId = req.params.id;
    const query = `
    SELECT m.MovieID, m.Title, m.Year, m.Score
    FROM Casting c
    JOIN Movie m ON m.MovieID = c.MovieID
    WHERE c.ActorId = ?
    ORDER BY m.Year DESC`;
    
    db.all(query, [actorId], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error en la base de datos' });
        }
        res.json(rows);
    });
});


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});