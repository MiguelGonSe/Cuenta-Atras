let titulo = document.createElement("h1");
titulo.textContent = "Cuenta Atrás";
document.body.appendChild(titulo);

let div = document.createElement("div");
div.className = "cuentaAtras";

let spanDias = document.createElement("span");
spanDias.id = "dias";
spanDias.textContent = "0";
let pDias = document.createElement("p");
pDias.textContent = "dias";

let spanHoras = document.createElement("span");
spanHoras.id = "horas";
spanHoras.textContent = "0";
let pHoras = document.createElement("p");
pHoras.textContent = "horas";

let spanMinutos = document.createElement("span");
spanMinutos.id = "minutos";
spanMinutos.textContent = "0";
let pMinutos = document.createElement("p");
pMinutos.textContent = "minutos";

let spanSegundos = document.createElement("span");
spanSegundos.id = "segundos";
spanSegundos.textContent = "0";
let pSegundos = document.createElement("p");
pSegundos.textContent = "segundos";

div.appendChild(spanDias);
div.appendChild(pDias);
div.appendChild(spanHoras);
div.appendChild(pHoras);
div.appendChild(spanMinutos);
div.appendChild(pMinutos);
div.appendChild(spanSegundos);
div.appendChild(pSegundos);

let fecha = document.createElement("input");
fecha.type = "date";
fecha.id = "fecha";
let fechaActual = new Date();
fecha.min = fechaActual.getFullYear() + '-' + (fechaActual.getMonth() + 1) + '-' + (fechaActual.getDate() < 10 ? ("0" + fechaActual.getDate()) : fechaActual.getDate()); // VALIDAR LA FECHA MINIMA

let timerId = 0;

fecha.addEventListener("change", () => {
    console.log(fecha.value);

    const fechaSplit = fecha.value.split("-");
    const fechaParse = new Date(Date.UTC(fechaSplit[0], fechaSplit[1] - 1, fechaSplit[2]));

    if (fechaParse < fechaActual) {
        alert("No has introducido una fecha correcta");
        fecha.value = null;
        return;
    }

    if (timerId) {
        clearInterval(timerId);
        timerId = 0;
    }

    const milisegundos = fechaParse - fechaActual;

    const diferenciaFecha = convertirMs(milisegundos);

    spanDias.textContent = diferenciaFecha.dias;
    spanHoras.textContent = diferenciaFecha.horas;
    spanMinutos.textContent = diferenciaFecha.minutos;
    spanSegundos.textContent = diferenciaFecha.segundos;
    activateContador(diferenciaFecha);
})

function convertirMs(milisegundos) {
    const segundosTotales = Math.floor(milisegundos / 1000);
    const dias = Math.floor(segundosTotales / (60 * 60 * 24));
    const horas = Math.floor((segundosTotales % (60 * 60 * 24)) / (60 * 60));
    const minutos = Math.floor((segundosTotales % (60 * 60)) / 60);
    const segundos = segundosTotales % 60;

    return { dias, horas, minutos, segundos };
}

function activateContador(fecha) {

    timerId = setInterval(() => {

        if (fecha.dias === 0 && fecha.horas === 0 && fecha.minutos === 0 && fecha.segundos === 0) {
            clearInterval(timerId);
            let fin = document.createElement("h1");
            fin.textContent = "ENHORABUENA";
            document.body.appendChild(fin);
            return;
        }

        if (fecha.segundos < 1) {
            if (fecha.minutos > 0) {
                fecha.minutos--;
                spanMinutos.textContent = fecha.minutos;
                fecha.segundos = 60;
                if (fecha.horas > 0 && fecha.minutos < 1) {
                    fecha.horas--;
                    spanHoras.textContent = fecha.horas;
                    fecha.minutos = 60;
                    if (fecha.dias > 0 && fecha.horas < 1) {
                        fecha.dias--;
                        spanDias.textContent = fecha.dias;
                        fecha.horas = 24;
                    }
                }
            }
        }
        changeColor(fecha);
        fecha.segundos--;
        spanSegundos.textContent = fecha.segundos;
    }, 1000);
}

function changeColor(diferenciaFecha) {
    if (diferenciaFecha.dias >= 30) {
        spanDias.style.color = "green";
        spanHoras.style.color = "green";
        spanMinutos.style.color = "green";
        spanSegundos.style.color = "green";
    } else if (diferenciaFecha.dias < 30 && diferenciaFecha.dias > 6) {
        spanDias.style.color = "orange";
        spanHoras.style.color = "orange";
        spanMinutos.style.color = "orange";
        spanSegundos.style.color = "orange";
    } else {
        spanDias.style.color = "red";
        spanHoras.style.color = "red";
        spanMinutos.style.color = "red";
        spanSegundos.style.color = "red";
    }
}

document.body.appendChild(fecha);
document.body.appendChild(div);