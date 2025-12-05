let pilotos = [];

window.onload = function () {
    const input = document.getElementById("busqueda");
    const btn = document.getElementById("botonBuscar");

    cargarPilotos();

    // Filtrar mientras escribe
    input.addEventListener("keyup", filtrarPilotos);
    // Y también al pulsar el botón
    btn.addEventListener("click", filtrarPilotos);
};

function cargarPilotos() {
    const estado = document.getElementById("estado");
    const url = "https://api.openf1.org/v1/drivers"; 

    estado.textContent = "Cargando pilotos...";

    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

    xhr.onload = function () {
         if (this.status === 200) {
            pilotos = JSON.parse(this.responseText) || [];

            pilotos = pilotos.filter(
                (p, i, arr) =>
                    arr.findIndex(x => x.driver_number === p.driver_number) === i
            );

            estado.textContent = "Pilotos cargados: " + pilotos.length;
            mostrarPilotos(pilotos);
        } else {
            estado.textContent = "Error al cargar datos.";
        }
    };

    xhr.onerror = function () {
        estado.textContent = "Error de red (o CORS) al llamar a la API.";
    };

    xhr.send();
}

function filtrarPilotos() {
    const texto = document
        .getElementById("busqueda")
        .value.toLowerCase()
        .trim();
    const estado = document.getElementById("estado");

    if (!texto) {
        estado.textContent = "Mostrando todos los pilotos: " + pilotos.length;
        mostrarPilotos(pilotos);
        return;
    }

    const resultado = pilotos.filter(function (p) {
        const nombre = (p.full_name || "").toLowerCase();
        const equipo = (p.team_name || "").toLowerCase();
        const numero = String(p.driver_number || "").toLowerCase();

        return (
            nombre.includes(texto) ||
            equipo.includes(texto) ||
            numero.includes(texto)
        );
    });

    estado.textContent =
        "Resultados: " + resultado.length + ' piloto(s) para "' + texto + '".';

    mostrarPilotos(resultado);
}

function mostrarPilotos(lista) {
    const contenedor = document.getElementById("resultados");
    contenedor.innerHTML = "";

    if (lista.length === 0) {
        contenedor.innerHTML = "<p>No hay pilotos para mostrar.</p>";
        return;
    }

    lista.forEach(function (p) {
        const div = document.createElement("div");
        div.className = "piloto";

        div.innerHTML = `
            <h3>
                <span class="numero">#${p.driver_number || "?"}</span>
                ${p.full_name || "Nombre desconocido"}
            </h3>
            <p class="equipo">${p.team_name || "Equipo desconocido"}</p>
            <p class="extra">
                País: ${p.country_code || "-"}<br>
                Acrónimo: ${(p.name_acronym || "").toUpperCase()}
            </p>
        `;

        contenedor.appendChild(div);
    });
}
