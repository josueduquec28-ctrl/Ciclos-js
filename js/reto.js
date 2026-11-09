// 1. Referencias
let formulario = document.getElementById("formulario");
let mensaje = document.getElementById("mensaje");
let historial = document.getElementById("historial");
let titularTexto = document.getElementById("titular");
let saldoFinalTexto = document.getElementById("saldoFinal");
let totalDepositadoTexto = document.getElementById("totalDepositado");
let totalRetiradoTexto = document.getElementById("totalRetirado");
let operacionesTexto = document.getElementById("operaciones");

// 3. Lógica
formulario.addEventListener("submit", procesarFormulario);

function procesarFormulario(evento) {
    evento.preventDefault();

    // Leer entradas (ajusta estos id a los de tu HTML)
    let titular = document.getElementById("titularEntrada").value.trim();
    let saldo = parseFloat(document.getElementById("saldoEntrada").value);
    let operacionesPendientes = document.getElementById("operacionesEntrada").value.trim();

    historial.innerHTML = "";

    // Validaciones
    if (titular === "" || isNaN(saldo) || saldo < 0) {
        mensaje.textContent = "Escribe el titular y un saldo inicial válido";
        return;
    }
    if (operacionesPendientes === "") {
        mensaje.textContent = "Escribe al menos una operación";
        return;
    }

    // Contadores y acumuladores
    let totalDepositado = 0;
    let totalRetirado = 0;
    let operacionesExitosas = 0;
    let retirosExitosos = 0;
    let opcion = 0;

    do {
        // Extraer la siguiente operación con indexOf() y slice()
        let posPuntoComa = operacionesPendientes.indexOf(";");
        let textoOperacion;

        if (posPuntoComa === -1) {
            textoOperacion = operacionesPendientes;
            operacionesPendientes = "";
        } else {
            textoOperacion = operacionesPendientes.slice(0, posPuntoComa);
            operacionesPendientes = operacionesPendientes.slice(posPuntoComa + 1).trim();
        }
        textoOperacion = textoOperacion.trim();

        // Opción y monto
        opcion = parseInt(textoOperacion, 10);
        let monto = NaN;
        let posDosPuntos = textoOperacion.indexOf(":");
        if (posDosPuntos !== -1) {
            monto = parseFloat(textoOperacion.slice(posDosPuntos + 1));
        }

        let fila = document.createElement("li");

        switch (opcion) {
            case 1: // Consultar
                fila.textContent = "Consulta: saldo actual $" + saldo.toLocaleString("es-CO");
                operacionesExitosas++;
                break;

            case 2: // Depositar
                if (isNaN(monto) || monto <= 0) {
                    fila.textContent = "Depósito rechazado: el valor debe ser mayor que 0";
                } else if (monto > 2000000) {
                    fila.textContent = "Depósito rechazado: el máximo por depósito es $2.000.000";
                } else {
                    saldo += monto;
                    totalDepositado += monto;
                    operacionesExitosas++;
                    fila.textContent = "Depósito exitoso: $" + monto.toLocaleString("es-CO");
                }
                break;

            case 3: // Retirar
                if (retirosExitosos >= 3) {
                    fila.textContent = "Retiro rechazado: máximo 3 retiros por sesión";
                } else if (isNaN(monto) || monto <= 0) {
                    fila.textContent = "Retiro rechazado: el valor debe ser mayor que 0";
                } else if (monto % 10000 !== 0) {
                    fila.textContent = "Retiro rechazado: debe ser múltiplo de $10.000";
                } else if (monto > saldo) {
                    fila.textContent = "Retiro rechazado: saldo insuficiente";
                } else {
                    saldo -= monto;
                    totalRetirado += monto;
                    retirosExitosos++;
                    operacionesExitosas++;
                    fila.textContent = "Retiro exitoso: $" + monto.toLocaleString("es-CO");
                }
                break;

            case 4: // Salir
                fila.textContent = "Salir: sesión finalizada";
                break;

            default: // Opción inválida
                fila.textContent = "Opción inválida: \"" + textoOperacion + "\"";
                break;
        }

        historial.appendChild(fila);

    } while (opcion !== 4 && operacionesPendientes !== "");

    // Resumen final
    titularTexto.textContent = titular;
    saldoFinalTexto.textContent = "$" + saldo.toLocaleString("es-CO");
    totalDepositadoTexto.textContent = "$" + totalDepositado.toLocaleString("es-CO");
    totalRetiradoTexto.textContent = "$" + totalRetirado.toLocaleString("es-CO");
    operacionesTexto.textContent = operacionesExitosas;
    mensaje.textContent = "Sesión procesada correctamente";
}