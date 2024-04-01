// importar express bodyparser
const express = require('express');
const bodyParser = require('body-parser');

//inicializa
const app = express();

app.use(bodyParser.json());


let items = ['manzana', 'papaya', 'limon', 'piña'];
app.get('/', (req, res) => {
    res.send("hola con nodejs")
});

//endpoint 1 / rutas GET
app.get('/items', (req, res) => {
    res.status(200).json(items);
});

//endpoint 2 / rutas POST
app.post('/items', (req, res) => {
    
    const fruta = req.body;
    
    if (fruta)
    {
        items.push(fruta.item);
        
        res.status(200).send(`Se creo la fruta: ${fruta.item} \n Lista: ${JSON.stringify(items)}`);
        
    }
    else
    {
        res.status(400).send("Este item es ivalido");
    }
});

//endpoint 3 / rutas PUT modificar
app.put('/items/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    const nuevoNombre = req.body.nombre;

    const index = items.findIndex(item => item === nombre);

    if (index !== -1) {
        items[index] = nuevoNombre;
        res.status(200).send(`Se actualizó la fruta: ${nombre} \n Lista: ${JSON.stringify(items)}`);
    } else {
        res.status(404).send(`No se encontró la fruta ${nombre}`);
    }
});


//endpoint 4 / rutas DELETE eliminar
app.delete('/items/:nombre', (req, res) => {
    const nombre = req.params.nombre;

    const index = items.findIndex(item => item === nombre);

    if (index !== -1) {
        items.splice(index, 1);
        res.status(200).send(`Se eliminó la fruta: ${nombre} \n Lista: ${JSON.stringify(items)}`);
    } 
    else 
    {
        res.status(400).send("Este item es ivalido");
    }
});


//escuchar en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`Servidor en funcionamiento en puerto: ${PORT}`) });