let map;
let marker;

function initMap() {
    const defaultLocation = { lat: 4.6486259, lng: -74.2478967 }; // Ubicación inicial (Bogotá, Colombia)
    map = new google.maps.Map(document.getElementById("map"), {
        center: defaultLocation,
        zoom: 13,
    });

    map.addListener("click", (event) => {
        placeMarker(event.latLng);
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                map.setCenter(pos);
                placeMarker(pos);
            },
            () => {
                console.log("Error: La Geolocalización falló.");
            }
        );
    }
}

function placeMarker(location) {
    if (marker) {
        marker.setPosition(location);
    } else {
        marker = new google.maps.Marker({
            position: location,
            map: map,
        });
    }
    document.getElementById("lat").value = location.lat();
    document.getElementById("long").value = location.lng();
}

