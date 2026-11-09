let formulario=document.getElementById("formulario");
let mensaje=document.getElementById("mensaje");
let detalledias = document.getElementById("detalleDias");
let totalvendidotexto=document.getElementById("totalVendido");
let promediotexto=document.getElementById("promedio");
let mejordiatexto=document.getElementById("mejorDia");
let diasaltostexto = document.getElementById("diasAltos");

formulario.addEventListener("submit" , procesarformulario);

function procesarformulario(evento){
    evento.preventDefault();
    let total=0;
    let diasaltos=0;
    let ventamayor= -1;
    let mejordia=0;
    let huboinvalido=false;
    detalledias.innerHTML="";

    for (let dia =1; dia <= 7; dia++){
        let venta = parseFloat(document.getElementById("venta" + dia).value);
        if (Number.isNaN(venta) || venta <0){
            venta =0;
            huboinvalido=true;
        }

        total += venta;
        if (venta>300000){
            diasaltos++;
        }
        if (venta > ventamayor){
            ventamayor = venta;
            mejordia = dia;
        }


        let fila = document.createElement("li");
        fila.textContent = "Dia " + dia + ": $" + venta.toLocaleString("es-CO");
        detalledias.appendChild(fila);
    }

    let promedio = total / 7;
    totalvendidotexto.textContent ="$" + total.toLocaleString("es-CO");
    promediotexto.textContent="$" + promedio.toLocaleString("es-CO", { maximumFractionDigits: 0});
    mejordiatexto.textContent = "Dia " + mejordia;
    diasaltostexto.textContent = diasaltos;

    if (promedio > 400000) {
        mensaje.textContent="RENDIMIENTO EXCELENTE";
    }else if (promedio >= 200000){
        mensaje.textContent="Rendimiento aceptable";
    }else{
        mensaje.textContent="RENDIMIENTO BAJO, TRABAJE MAS";
    }
    if (huboinvalido){
        mensaje.textContent+=" Las ventas negativas o invalidas se contaron como 0";
    }
}