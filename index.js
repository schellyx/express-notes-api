const express = require('express');
const app = express();
const port = process.env.NOTES_API_PORT || 8080;


app.listen(port, () => {
    console.log(`server running on http://localhost:${port}`);
});

let notes = [
    { id: 1, note: 'My new Note', autor: 'Max Mustermann', date: '2025-01-15' }
];

app.use(express.json());

app.get('/', (request, response) => {
    response.send('Hello World');
});

app.get('/notes', (request, response) => {
    response.json(notes);
});

app.get('/notes/:id', (request, response) => {
    const id = request.params.id;
    const note = notes[id];
    response.json(note);
});

app.put('/notes/:id', (request, response) => {
    const id = request.params.id;
    const note = notes[id];
    note.note = request.body.note;
    response.json(note);
});

app.post('/notes', (request, response) => {
    const newNote = {
        id: notes.length + 1,
        note: request.body.note,
        autor: request.body.autor,
        date: request.body.date,
    };
    notes.push(newNote);
    response.json(notes);
});

app.delete('/notes/:id', (request, response) => {
    const id = request.params.id;
    notes = notes.filter((note) => note.id !== id);

    if (notes === -1) {
        response.status(404).send('Note not found');
    }
    response.send("Note deleted");
});



