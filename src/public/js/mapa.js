window.onload = function main() {
    $("#mover").click(mover);
}
var marker;
var map;

function initMap() {
    var myLatLng = { lat: 39.447891, lng: -0.314376 };

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: myLatLng
    });

    marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Tu Baliza!'
    });
    mover();
}



function mover() {
    var lat = document.getElementById("lat").value;
    var lng = document.getElementById("lng").value;

    var utmarray = lat.split(" ");    //separo grados y minutos
    var uno = parseFloat(utmarray[0].split("º")[0]);    //de los grados quito el simbolo del grado
    utmarray[1].replace(",", ".");  //sustituyo comas por PUNTOS
    var dosv = utmarray[1].split(".");  //separo en las PUNTOS
    var dos = parseFloat(dosv[0]);      //convierto a decimal (la separacion ha de ser un PUNTO)
    var tres = parseFloat(dosv[1].split("´")[0]);
    var lat2 = uno + (dos + tres / 1000) / 60;
    if (utmarray[2] == 'N')
        lat2 = lat2.toFixed(5);
    else if (utmarray[2] == 'S')
        lat2 = -lat2.toFixed(5);

    utmarray = lng.split(" ");
    uno = parseFloat(utmarray[0].split("º")[0]);
    utmarray[1].replace(",", ".");
    dosv = utmarray[1].split(".");
    dos = parseFloat(dosv[0]);
    tres = parseFloat(dosv[1].split("´")[0]);
    var lng2 = uno + (dos + tres / 1000) / 60;

    if (utmarray[2] == 'E')
        lng2 = lng2.toFixed(5);
    else if (utmarray[2] == 'W')
        lng2 = -lng2.toFixed(5);

    //alert("lat:" + lat2 + " y long:" + lng2);

    marker.setPosition(new google.maps.LatLng(lat2, lng2));
    map.panTo(new google.maps.LatLng(lat2, lng2));
}