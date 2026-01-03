const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// Importar rutas
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());

// Ruta de bienvenida
app.get('/', (req, res) => {
    res.json({
        message: 'API ASEFAL funcionando',
        version: '1.0.0',
        description: 'Sistema de Gestión de Torneos de Fútbol',
        endpoints: {
            health: '/api/health',
            auth: '/api/auth (login, register, profile)',
            usuarios: '/api/usuarios',
            roles: '/api/roles',
            torneos: '/api/torneos',
            clubes: '/api/clubes',
            sedes: '/api/sedes',
            partidos: '/api/partidos'
        }
    });
});

// Rutas de la API
app.use('/api', routes);

// Manejador de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Ruta no encontrada'
    });
});

// Manejador de errores global
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    console.log(`Entorno: ${process.env.NODE_ENV || 'development'}`);
});