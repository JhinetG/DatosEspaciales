const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');


router.post('/cliente', clienteController.createCliente);
router.get('/', (req, res) => {
    res.sendFile('index.html', { root: 'views' });
});

// Ruta para ver el formulario de edición de cliente
router.get('/cliente/editar/:id', clienteController.mostrarFormularioEdicion);

// Ruta para actualizar un cliente
router.post('/cliente/editar/:id', clienteController.actualizarCliente);

// Ruta para ver todos los clientes
router.get('/clientes', clienteController.getClientes);

// Ruta buscar clientes cercanos (GET para mostrar el formulario)
router.get('/clientesCercanos', clienteController.buscarClientesCercanos);

// Ruta buscar clientes cercanos (POST para enviar las coordenadas)
router.post('/clientesCercanos', clienteController.buscarClientesPorCoordenadas);

// Ruta para eliminar
router.get('/cliente/eliminar/:id', clienteController.deleteCliente);


module.exports = router;