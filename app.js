const express = require('express');
const app = express();
const clienteRoutes = require('./routes/clienteRoutes'); // Importar las rutas
const path = require('path'); // Asegúrate de incluir esta línea

// Middleware para procesar datos enviados en formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de las vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configurar rutas
app.use('/', clienteRoutes);

// Usar las rutas
app.use('/clientesCercanos', clienteRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

