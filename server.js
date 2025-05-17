const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'project', 'public')));

const db = new sqlite3.Database(path.join(__dirname, 'project', 'db', 'imdb.db'));
console.log(__dirname);
app.get('/api/movies', (req, res) => {
    db.all('select * from movie limit 10', [], (err, rows) => {
        if(err) {
            console.err(err);
            res.status(500).json({ error: 'Error en la lectura de la DB'})
        } else {
            res.json(rows);
        }
    })
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});