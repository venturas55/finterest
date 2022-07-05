var botonSearch = document.getElementById("botonBuscar");
botonSearch.addEventListener("click", aBuscar);

function aBuscar(e) {
    e.preventDefault();
    var valor=document.getElementById("inputBuscar").value;
    var filtro =document.getElementById('opcionBuscar').value;
    window.location.href = '/balizas/list/'+filtro+'/'+valor;
  }