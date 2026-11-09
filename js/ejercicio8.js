let formulario = document.getElementById("formulario");
let mensaje = document.getElementById("mensaje");
let intentostexto=document.getElementById("intentos");
let puntostexto=document.getElementById("puntos");
let registro=document.getElementById("registro");

formulario.addEventListener("submit" , procesarformulario);

function procesarformulario(evento){
    evento.preventDefault();
    let secreto = 42; // para probar; luego: (Math.floor(Math.random() * 100) + 1
    let intentosentrada = document.getElementById("intentosEntrada").value.split(",");
    let intentos =0;
    let maxintentos=7;
    let puntos =100;
    let adivino = false;
    let posicion =0;
    registro.innerHTML="";

    while (intentos< maxintentos &&posicion <intentosentrada.length && adivino ===false) {
        let textonumero = intentosentrada[posicion].trim();
        let numero= parseInt(textonumero, 10);
        let fila = document.createElement("li");

        if (Number.isNaN(numero) || !Number.isInteger(Number(textonumero)) || numero < 1 || numero >100 ){
            fila.textContent = textonumero + ": invalido; no cuenta como intento";
        }else{
            intentos++;
            if (numero ===secreto){
                adivino = true;
                fila.textContent= numero + ": correcto";
            }else if ( numero< secreto){
                puntos -=10;
                fila.textContent= numero + ": el secreto es mayor";
            }else{
                puntos -=10;
                fila.textContent = numero + ": el secreto es menor";
            }
        }

        registro.appendChild(fila);
        posicion++;
    }

    intentostexto.textContent=intentos;
    puntostexto.textContent=puntos;
    mensaje.textContent= adivino
        ? "TU SABE MUCHO, ADIVINASTE"
        : "TU NO SABE NADA, el numero secreto era " + secreto + ".";
}