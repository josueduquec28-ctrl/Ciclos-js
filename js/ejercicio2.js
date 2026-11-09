let formulario = document.getElementById("formulario");
let mensaje = document.getElementById("mensaje");
let listaNotas = document.getElementById("listaNotas");
let promedioTexto = document.getElementById("promedio");
let notasAltas = document.getElementById("notasAltas");
let notaMayorTexto = document.getElementById("notaMayor");
let notaMenorTexto = document.getElementById("notaMenor");

formulario.addEventListener ("submit" , procesarformulario);
function procesarformulario (evento){
    evento.preventDefault();
    let suma=0;
    let cantidadValidas=0;
    let notasAltas = 0;
    let mayor = -1;
    let menor =6;
    listaNotas.innerHTML="";

    for (let i =1; i <= 5; i++){
        let nota= parseFloat(document.getElementById("nota" + i).value);
        let fila = document.createElement("li");
        fila.textContent = "Nota " + i + ": " + nota;

        if(Number.isNaN(nota) || nota < 0 || nota>5){
            fila.textContent += "  (NOTA INVALIDA)";
        }else{
            suma+= nota;
            cantidadValidas++;
        }
        if (nota>mayor){
            mayor=nota;
        }
        if(nota<menor){
            menor=nota;
        }
        listaNotas.appendChild(fila);
    }


if (cantidadValidas===0){
    mensaje.textContent="NO SE INGRESARON NOTAS VALIDAS";
    promedioTexto.textContent="-";
    notasAltas.textContent="-"; 
    notaMayorTexto.textContent="-";
    notaMenorTexto.textContent="-";
    return;
}
let promedio = suma/ cantidadValidas;
promedioTexto.textContent= promedio.toFixed(2);
notasAltas.textContent=notasAltas;
notaMayorTexto.textContent=mayor;
notaMenorTexto.textContent=menor;
mensaje.textContent= promedio >=3 ? "APROBO" : "REPROBO";
}