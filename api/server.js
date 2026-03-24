const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;


app.use(express.json());

app.use(cors({
    origin: 'https://davidcruz07.github.io', 
    credentials: true               
}));


let comments = [
    {
        id: 1,
        username: "deividdd0",
        message: "Hola muy buenas a todos guapisimos",
        date: "2026-03-17T10:00:00"
    }
];


let currentId = 2;


// GET – para obtener todos los comentarios
app.get('/comments', (req, res) => {
    res.json(comments);
});

// POST – para crear un nuevo comentario
app.post('/comments', (req, res) => {
    const { username, message, date } = req.body;

    // validación en el servidor para que no estén vacíos
    if (!username || !message || message.length < 5) {
        return res.status(400).json({ error: "Datos inválidos" });
    }

    const newComment = {
        id: currentId++,
        username,
        message,
        date
    };

    comments.push(newComment);
    res.status(201).json(newComment);
});

// DELETE – para eliminar un comentario por ID
app.delete('/comments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    const initialLength = comments.length;
    comments = comments.filter(c => c.id !== id);

    if (comments.length < initialLength) {
        res.json({ message: "Comentario eliminado correctamente" });
    } else {
        res.status(404).json({ error: "Comentario no encontrado" });
    }
});

app.listen(PORT, () => {
    console.log(`API corriendo en http://localhost:${PORT}`);
});