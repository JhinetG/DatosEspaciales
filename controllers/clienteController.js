const ClienteDAO = require('../models/clienteDAO');
const ClienteDTO = require('../models/clienteDTO');

exports.createCliente = (req, res) => {
    const { cedula, nombres, apellidos, direccion, lat, long } = req.body;
    const cliente = new ClienteDTO(cedula, nombres, apellidos, direccion, lat, long);

    ClienteDAO.create(cliente, (err, result) => {
        if (err) return res.status(500).send(err);
        res.redirect('/');
    });
};

exports.getClientes = (req, res) => {
    ClienteDAO.getClientes()
        .then(clientes => {
            res.render('clientes', { clientes }); // Renderiza la vista 'clientes.ejs'
        })
        .catch(error => {
            res.status(500).send('Error al obtener clientes');
        });
};

// Mostrar el formulario de edición con los datos del cliente
exports.mostrarFormularioEdicion = async (req, res) => {
    const clienteId = req.params.id;
    try {
        const cliente = await ClienteDAO.getClienteById(clienteId);
        if (cliente) {
            res.render('editarCliente', { cliente });
        } else {
            res.status(404).send('Cliente no encontrado');
        }
    } catch (error) {
        res.status(500).send('Error al obtener los datos del cliente');
    }
};

// Manejar la actualización del cliente
exports.actualizarCliente = async (req, res) => {
    const clienteId = req.params.id;
    const cliente = {
        cedula: req.body.cedula,
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        direccion: req.body.direccion,
        lat: parseFloat(req.body.lat),
        long: parseFloat(req.body.long)
    };

    try {
        await ClienteDAO.update(clienteId, cliente);
        res.redirect('/clientes'); // Redirige a la lista de clientes o a la vista deseada
    } catch (error) {
        res.status(500).send('Error al actualizar el cliente');
    }
};


exports.deleteCliente = (req, res) => {
    const { id } = req.params;

    ClienteDAO.delete(id, (err, result) => {
        if (err) return res.status(500).send(err);
        res.redirect('/clientes');
    });
};
// Controlador para buscar clientes cercanos (renderiza vista sin clientes por ahora)
exports.buscarClientesCercanos = (req, res) => {
    const lat = req.query.lat;  
    const lng = req.query.lng;
    // Renderizamos la vista y por ahora no hay clientes seleccionados
    res.render('clientesCercanos', { clientes: [] });
};

// Controlador para buscar clientes por coordenadas
exports.buscarClientesPorCoordenadas = (req, res) => {
    const { latitud, longitud } = req.body;
    console.log(`Latitud en el controlador: ${latitud}, Longitud: ${longitud}`);
    // Lógica para obtener los clientes cercanos usando latitud y longitud
    ClienteDAO.getByDistance(latitud, longitud)
        .then(resultados => {
            console.log("Clientes cercanos:", resultados);
            res.render('clientesCercanos', { clientes: resultados });
        })
        .catch(error => {
            console.error("Error al obtener clientes cercanos:", error);
            res.status(500).send('Error al buscar clientes cercanos');
        });
};



