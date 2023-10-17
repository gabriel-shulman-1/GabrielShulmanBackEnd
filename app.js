const express = require('express');
const productManager  = require('./Products.json');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/',(req,res) => {
    res.send('home')
});

app.get('/products',async (req,res) => {
    res.json(productManager)
});

app.get('/products/:pid',async (req,res) => {
    const { pid } = req.params;
    const FindForId = productManager.find((currentId) => {
    return currentId.id === parseInt(pid);
    });
    if (!FindForId) {
    res.json({ error: 'El ID no corresponde a un producto existente.'})
    } else {
    res.json(FindForId);
    }
});

app.get('/products/', (req, res) => {
    let limit = req.query.limit
    let productsLimited = productManager.splice(0,limit)
    res.json(productsLimited)
  });

app.listen(8080,()=>{console.log('servidor en linea')})