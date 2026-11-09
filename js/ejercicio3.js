let formulario =document.getElementById("formulario");
let mensaje = document.getElementById("mensaje");
let presupuestoTexto=document.getElementById("presupuesto");
let totalGastadoTexto=document.getElementById("totalGastado");
let restanteTexto=document.getElementById("restante");
let gastosAltosTexto=document.getElementById("gastosAltos");

formulario.addEventListener("submit" , procesarformulario);

function procesarformulario(evento){
    evento.preventDefault();
    let presupuesto =parseFloat(document.getElementById("presupuestoEntrada").value);
    let gastos = document.getElementById("gastosEntrada").value.split(",");
    let totalGastado=0;
    let gastosAltos=0;
    let posicion=0;
    let gasto= parseFloat(gastos[posicion].trim()); 
    let huboinvalido=false;

    while (posicion< gastos.length && gasto !==0){
        if (Number.isNaN(gasto) || gasto < 0){
            huboinvalido=true;
        }else{
            totalGastado+=gasto;
            if (gasto>50000){
                gastosAltos++;
            }
        }

        posicion++;
        if (posicion < gastos.length){
            gasto=parseFloat (gastos[posicion].trim());
        }
    }

    let restante= presupuesto -totalGastado;
    presupuestoTexto.textContent = "$" + presupuesto.toLocaleString("es-CO");
    totalGastadoTexto.textContent = "$" + totalGastado.toLocaleString("es-CO");
    restanteTexto.textContent = restante < 0
        ? "-$" + Math.abs(restante).toLocaleString("es-CO")
        : "$" + restante.toLocaleString("es-CO");
    gastosAltosTexto.textContent= gastosAltos;

    if (restante< 0){
        mensaje.textContent= "Excediste el presupuesto por $" + Math.abs(restante).toLocaleString("es-CO") + ".";    
    } else{
        mensaje.textContent="Te mantuviste dentro del presupuesto";
    }
    if (huboinvalido){
        mensaje.textContent+="SE OMITIERON DATOS INVALIDOS O NEGATIVOS";
    }
}