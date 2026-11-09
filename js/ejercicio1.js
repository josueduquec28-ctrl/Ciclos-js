let formulario = document.getElementById("formulario");
let mensaje = document.getElementById("mensaje");
let cantidadtexto= document.getElementById("cantidad");
let subtotaltexto = document.getElementById("subtotal");
let descuentotexto = document.getElementById("descuento");
let totaltexto = document.getElementById("total");

formulario.addEventListener("submit" , procesarformulario);

function procesarformulario(event){
    event.preventDefault();
    let precios= document.getElementById("precios").value.split(",");
    let subtotal=0;
    let cantidad=0;
    let posicion=0;
    let precio = parseFloat(precios[posicion].trim());
    let huboinvalido= false;

    while(posicion < precios.length && precio !==0){
        if (Number.isNaN(precio) || precio<0){
            huboinvalido=true;
        } else{
            subtotal+=precio;
            cantidad++;
        }

    posicion++;
    if (posicion < precios.length){
        precio = parseFloat(precios[posicion].trim());
    }
    }

    let descuento =subtotal >200000 ? subtotal * 0.1 : 0;
    let total = subtotal-descuento;
    cantidadtexto.textContent = cantidad;
    subtotaltexto.textContent = "$" + subtotal.toLocaleString("es-CO");
    descuentotexto.textContent = "$" +descuento.toLocaleString("es-CO");
    totaltexto.textContent = "$" +total.toLocaleString("es-CO");

    if (cantidad ===0){
        mensaje.textContent = "NO SE REGISTRO NADA";
    } else if (subtotal > 200000){
        mensaje.textContent = "Descuento del 10%";
    } else{
        mensaje.textContent = "COMPRA CALCULADA";

    }
    if (huboinvalido) {
        mensaje.textContent += "-SE OMITEN PRECIOS NEGATIVOS O INVALIDOS-";
    }
    let resultado = document.getElementById("resultado").textContent
}