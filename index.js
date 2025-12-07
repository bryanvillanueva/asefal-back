const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API ASEFAL funcionando ⚽');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});