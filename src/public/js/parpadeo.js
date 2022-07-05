//PARA EL PARPADEO VIRTUAL
function parpadeoToggle() {
    var x = document.getElementById("luz");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

function secuencia() {
    document.getElementById("luz").style.display = "block";
    for (var i = 0; i < destellosAcum.length - 1; i++) {
        setTimeout(parpadeoToggle, destellosAcum[i] * 1000);
    }
}

var apariencia = document.getElementById("aparienciaID");
var ap = apariencia.innerText.charAt(apariencia.innerText.length - 1).toUpperCase();
console.log(ap);

switch (ap) {
    case 'R':
        document.getElementById("luz").style.backgroundColor = "red";
        break;
    case 'G' :
    case 'V' :
        document.getElementById("luz").style.backgroundColor = "green";
        break;
    case 'B':
    case 'W':
        document.getElementById("luz").style.backgroundColor = "rgb(240, 240, 240)";
        break;
    case 'A':
    case 'Y':
        document.getElementById("luz").style.backgroundColor = "yellow";
        break;
}
var destellos;
var destellosAcum;
var caracteristicaMod;
var repeticiones;
var caracteristica = document.getElementById("caracteristicaID").innerText;
if (caracteristica === null)
    caracteristica = "L0.5 oc1.5 L0.5 oc4.5";
console.log(caracteristica);
caracteristica = caracteristica.toLowerCase();
caracteristica = caracteristica.replace(/\ |\(|\[|\[|\)|\]\+/g, '');
caracteristica = caracteristica.replace(/,/g, '.');
caracteristica = caracteristica.replace(/oc/g, "l");
caracteristica = caracteristica.replace(/o/g, "l");
console.log(caracteristica)

//Tratamos las posibles repeticiones
//Si hay X
if (caracteristica.search("x") != -1) {
    repeticiones = caracteristica.charAt(caracteristica.search("x") + 1);
    var trimado = 'x' + repeticiones;
    caract = caracteristica.split(trimado);
    caract[0] = caract[0].repeat(repeticiones);
    caracteristicaMod = caract[0].concat(caract[1]);
} else
    caracteristicaMod = caracteristica;
console.log(caracteristicaMod)


//Doy por hecho que siempre se alternan L y O empezando por L
caracteristicaMod = caracteristicaMod.replace('l', '');
//quito la primera L por no generar un item de array al usar el split
destellos = caracteristicaMod.split('l');
destellosAcum = new Array(destellos.length);
destellosAcum.fill(0, 0, destellos.length);

//Lo parseo a int
for (var i = 0; i < destellos.length; i++) {
    destellos[i] = parseFloat(destellos[i]);
}
console.log(destellos);

for (var i = 0; i < destellosAcum.length; i++) {
    for (var j = 0; j <= i; j++) {
        destellosAcum[i] += parseFloat(destellos[j]);
    }
}

console.log(destellosAcum);

//ejecuto la primera vez
secuencia();
//Y sucesivas
setInterval(() => {
    secuencia()
}, destellosAcum[destellosAcum.length - 1] * 1150)

//FIN PARPADEO VIRTUAL