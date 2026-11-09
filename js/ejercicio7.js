let formulario =document.getElementById("formulario");
let mensaje = document.getElementById("mensaje");
let detalleEmpleados=document.getElementById("detalleEmpleados");
let cantidadempleadostexto=document.getElementById("cantidadEmpleados");
let conextrastexto=document.getElementById("conExtras");
let totalnominatexto=document.getElementById("totalNomina");

formulario.addEventListener("submit" , procesarformulario);

function procesarformulario(evento){
    evento.preventDefault();
    let empleados = document.getElementById("empleadosEntrada").value.trim().split("\n");
    let cantidad = empleados.length;
    let totalnomina = 0;
    let conextras=0;
    detalleEmpleados.innerHTML="";

    for (let e = 1; e <= cantidad; e++){
        let datos = empleados[e - 1].split(",");
        let horas = parseFloat(datos[0]);
        let valorhora= parseFloat(datos[1]);
        let fila =document.createElement("li");

        if (Number.isNaN(horas) || Number.isNaN(valorhora) || horas <=0 || valorhora <=0){
            fila.textContent = "Empleado " + e +": datos invalidos; no se calculo el pago";
        } else{
            let pago =0;
            if (horas>40){
                pago = 40 *valorhora + (horas-40)* valorhora*1.25;
                conextras++;
            }else{
                pago = horas * valorhora;
            }
            totalnomina+=pago;
            fila.textContent="Empleado " + e + ": $" + pago.toLocaleString("es-CO");
        }

        detalleEmpleados.appendChild(fila);
    }

    cantidadempleadostexto.textContent= cantidad;
    conextrastexto.textContent=conextras;
    totalnominatexto.textContent= "$" + totalnomina.toLocaleString("es-CO");
    mensaje.textContent="Nomina calculada. Los registros invalidos no se sumaron";
}