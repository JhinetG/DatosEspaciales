class ClienteDTO {
    constructor(cedula, nombres, apellidos, direccion, lat, long) {
        this.cedula = cedula;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.direccion = direccion;
        this.lat = lat;
        this.long = long;
    }
}

module.exports = ClienteDTO;
