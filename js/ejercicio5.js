let formulario=document.getElementById("formulario");
let mensaje=document.getElementById("mensaje");
let intentosTexto = document.getElementById("intentos");
let registro = document.getElementById("registro");

formulario.addEventListener("submit" , procesarformulario);

function procesarformulario(evento){
    evento.preventDefault();
    let contrasenacorrecta= "Sena2026";
    let intentos=0;
    let maxintentos=3;
    let accesoconcedido=false;
    registro.innerHTML="";

    while (intentos < maxintentos && accesoconcedido=== false){
        let contrasenaingresada = document.getElementById("contrasena" + (intentos + 1)).value;
        intentos++;

        let fila =document.createElement("li");
        if (contrasenaingresada ===contrasenacorrecta){
            accesoconcedido=true;
            fila.textContent= "Intento " + intentos + ": correcta";
        } else{
            fila.textContent= "Intento " + intentos + ": incorrecta";
        }
        registro.appendChild(fila);
    }

    intentosTexto.textContent = intentos;
    mensaje.textContent=accesoconcedido
        ? "BIENVENIDO. ACCESO CONCEDIDO"
        : "ACCESO BLOQUEADO. SE AGOTARON LOS INTENTOS";
}