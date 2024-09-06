
const db = require('../utils/SingletonDB');

class ClienteDAO {
    static async getClientes() {
        try {
            const sql = 'SELECT * FROM Cliente';
            const clientes = await db.query(sql);
            return clientes;
        } catch (error) {
            throw new Error('Error al obtener los clientes: ' + error.message);
        }
    }
    
    
     

    static async create(cliente, callback) {
        try {
            const sql = 'INSERT INTO Cliente (cedula, nombres, apellidos, direccion, ubicacion) VALUES (?, ?, ?, ?, POINT(?, ?))';
            const params = [cliente.cedula, cliente.nombres, cliente.apellidos, cliente.direccion, cliente.lat, cliente.long];
            const result = await db.query(sql, params);
            callback(null, result);
        } catch (error) {
            callback(error, null);
        }
    }
    static async getClienteById(id) {
        return new Promise((resolve, reject) => {
            const sql = "SELECT id, cedula, nombres, apellidos, direccion, ST_X(ubicacion) as lat, ST_Y(ubicacion) as lng FROM Cliente WHERE id = ?";
        
            db.query(sql, [id], (error, results) => {
                if (error) {
                    console.error("Error en la consulta SQL:", error);
                    return reject(error);
                }
    
                console.log("Resultados de la consulta SQL:", results); // Verifica los resultados obtenidos
    
                if (results.length > 0) {
                    const cliente = {
                        id: results[0].id,
                        cedula: results[0].cedula,
                        nombres: results[0].nombres,
                        apellidos: results[0].apellidos,
                        direccion: results[0].direccion,
                        lat: results[0].lat,
                        lng: results[0].lng
                    };
                    console.log("Cliente mapeado correctamente:", cliente); // Log para verificar el cliente mapeado
                    resolve(cliente);
                } else {
                    console.log("No se encontró el cliente con ID:", id); // Si no hay resultados
                    resolve(null);
                }
            });
        });
    }
    
    static async update(id, cliente) {
        try {
            const sql = 'UPDATE Cliente SET cedula = ?, nombres = ?, apellidos = ?, direccion = ?, ubicacion = POINT(?, ?) WHERE id = ?';
            const params = [cliente.cedula, cliente.nombres, cliente.apellidos, cliente.direccion, cliente.lat, cliente.long, id];
            await db.query(sql, params);
        } catch (error) {
            throw new Error('Error al actualizar el cliente: ' + error.message);
        }
    }

    static async delete(id) {
        try {
            const sql = 'DELETE FROM Cliente WHERE id = ?';
            await db.query(sql, [id]);
        } catch (error) {
            throw new Error('Error al eliminar el cliente: ' + error.message);
        }
    }

    static async getByDistance(lat, lng) {
        console.log(`Latitud en el DAO: ${lat}, Longitud: ${lng}`);
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT
                    id, cedula, nombres, apellidos, direccion,
                    ST_X(ubicacion) AS lng, ST_Y(ubicacion) AS lat,
                    ST_Distance_Sphere(ubicacion, POINT(-74.10353422164917, 4.704941356720857)) AS distancia
                FROM Cliente
                ORDER BY distancia ASC
                LIMIT 10;
            `;
    
            // Mostrar la consulta SQL con parámetros interpolados para depuración
            const interpolatedSql = sql.replace(/\?/, lng).replace(/\?/, lat);
            console.log(`Consulta SQL interpolada: ${interpolatedSql}`);
    
            db.query(sql, (error, results) => {
                if (error) {
                    console.error("Error en la consulta SQL de distancia:", error);
                    reject(error);
                    return;
                }
    
                console.log("Resultados de la consulta de distancia:", results);
                resolve(results);
            });
        });
    }
    
    
};

     

module.exports = ClienteDAO;
